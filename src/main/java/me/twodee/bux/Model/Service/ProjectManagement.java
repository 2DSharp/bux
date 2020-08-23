package me.twodee.bux.Model.Service;

import me.twodee.bux.Component.DtoFilter;
import me.twodee.bux.DTO.HelperValueObject.Error;
import me.twodee.bux.DTO.HelperValueObject.Notification;
import me.twodee.bux.DTO.Project.ProjectDTO;
import me.twodee.bux.Factory.NotificationFactory;
import me.twodee.bux.Factory.ProjectDTOFactory;
import me.twodee.bux.Model.Entity.Organization;
import me.twodee.bux.Model.Entity.Project;
import me.twodee.bux.Model.Entity.User;
import me.twodee.bux.Model.Repository.ProjectRepository;
import me.twodee.bux.Provider.SpringHelperDependencyProvider;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static me.twodee.bux.Util.BaseUtil.throwingFunctionWrapper;

@Service
public class ProjectManagement {
    private final ProjectRepository repository;
    private final SpringHelperDependencyProvider provider;
    private final OrganizationService org;

    public ProjectManagement(ProjectRepository repository, OrganizationService org, SpringHelperDependencyProvider provider) {
        this.repository = repository;
        this.org = org;
        this.provider = provider;
    }

    private Notification checkForErrors(ProjectDTO dto, Organization team, User user) {
        return DtoFilter.start(dto)
                .addFilter(e -> org.hasAdminAccess(team, user), new Error("permission", provider.getMessageByLocaleService().getMessage(
                        "validation.project.permission")))
                .validate(provider.getValidator())
                .appendFilter(this::isNameUnique, new Error("name", provider.getMessageByLocaleService().getMessage(
                        "validation.project.name.exists")))
                .appendFilter(e -> isKeyUnique(dto, team), new Error("projectKey", provider.getMessageByLocaleService().getMessage(
                        "validation.project.key.exists"))).getNotification();
    }

    public void createProject(ProjectDTO dto, String teamId, User user) {
        var optionalTeam = org.getOrg(teamId);

        Organization team = null;
        if (optionalTeam.isPresent())
            team = optionalTeam.get();
        System.out.println(dto.getProjectKey());
        var note = checkForErrors(dto, team, user);
        if (note.hasErrors()) {
            dto.setNotification(note);
            return;
        }
        Project project = Project.builder()
                .name(dto.getName())
                .id(new Project.ProjectId(dto.getProjectKey(), team))
                .leader(user)
                .build();

        ServiceHelper.safeSaveToRepository(repository, project, () -> dto.setNotification(
                NotificationFactory.createAmbiguousErrorNotification(provider.getMessageByLocaleService())));
    }

    private boolean isNameUnique(ProjectDTO dto) {
        return !repository.existsProjectByName(dto.getName());
    }

    private boolean isKeyUnique(ProjectDTO dto, Organization team) {
        return !repository.existsById(new Project.ProjectId(dto.getProjectKey(), team));
    }


    public List<ProjectDTO> getProjects() {
        return repository.findAll()
                .stream()
                .map(throwingFunctionWrapper(ProjectDTOFactory::buildProjectDTO))
                .collect(Collectors.toList());
    }

    public boolean projectExists(Project.ProjectId projectKey) {
        return repository.existsById(projectKey);
    }

    public Project getProjectReferenceFromKey(Project.ProjectId projectId) {
        Optional<Project> project = repository.findById(projectId);
        return project.orElse(null);
    }
}
