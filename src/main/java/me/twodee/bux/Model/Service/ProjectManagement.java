package me.twodee.bux.Model.Service;

import me.twodee.bux.Component.DtoFilter;
import me.twodee.bux.DTO.HelperValueObject.Error;
import me.twodee.bux.DTO.HelperValueObject.Notification;
import me.twodee.bux.DTO.Project.ProjectDTO;
import me.twodee.bux.Factory.NotificationFactory;
import me.twodee.bux.Factory.ProjectDTOFactory;
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

    private Notification checkForErrors(ProjectDTO dto, User user) {
        return DtoFilter.start(dto)
                .addFilter(e -> org.hasAdminAccess(e.getOrg(), user), new Error("permission", "You don't have permission to do this"))
                .validate(provider.getValidator())
                .appendFilter(this::isNameUnique, new Error("name", provider.getMessageByLocaleService().getMessage(
                        "validation.project.name.exists")))
                .appendFilter(this::isKeyUnique, new Error("projectKey", provider.getMessageByLocaleService().getMessage(
                        "validation.project.key.exists"))).getNotification();
    }

    public void createProject(ProjectDTO dto, User user) {

        var note = checkForErrors(dto, user);
        if (note.hasErrors()) {
            dto.setNotification(note);
            return;
        }

        Project project = new Project(dto.getName(), dto.getProjectKey(), user);

        ServiceHelper.safeSaveToRepository(repository, project, () -> dto.setNotification(
                NotificationFactory.createAmbiguousErrorNotification(provider.getMessageByLocaleService())));
    }

    private boolean isNameUnique(ProjectDTO dto) {
        return !repository.existsProjectByName(dto.getName());
    }

    private boolean isKeyUnique(ProjectDTO dto) {
        return !repository.existsById(dto.getProjectKey());
    }


    public List<ProjectDTO> getProjects() {
        return repository.findAll()
                .stream()
                .map(throwingFunctionWrapper(ProjectDTOFactory::buildProjectDTO))
                .collect(Collectors.toList());
    }

    public boolean projectExists(String projectKey) {
        return repository.existsById(projectKey);
    }

    public Project getProjectReferenceFromKey(String projectKey) {
        Optional<Project> project = repository.findById(projectKey);
        return project.orElse(null);
    }
}
