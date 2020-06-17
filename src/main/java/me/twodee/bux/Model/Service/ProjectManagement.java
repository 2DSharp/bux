package me.twodee.bux.Model.Service;

import me.twodee.bux.DTO.Project.ProjectDTO;
import me.twodee.bux.Factory.NotificationFactory;
import me.twodee.bux.Factory.ProjectDTOFactory;
import me.twodee.bux.Model.Entity.Project;
import me.twodee.bux.Model.Entity.User;
import me.twodee.bux.Model.Repository.ProjectRepository;
import me.twodee.bux.Provider.SpringHelperDependencyProvider;
import me.twodee.bux.Util.DomainToDTOConverter;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static me.twodee.bux.Util.BaseUtil.throwingFunctionWrapper;

@Service
public class ProjectManagement {
    private final ProjectRepository repository;
    private final SpringHelperDependencyProvider provider;

    public ProjectManagement(ProjectRepository repository, SpringHelperDependencyProvider provider) {
        this.repository = repository;
        this.provider = provider;
    }

    public void createProject(ProjectDTO dto, User user) {
        Project project = new Project(dto.getName(), dto.getProjectKey(), user);
        Set<ConstraintViolation<Project>> violations = provider.getValidator().validate(project);
        if (!violations.isEmpty()) {
            dto.setNotification(DomainToDTOConverter.convert(violations));
            return;
        }
        checkForRedundancy(dto);
        if (dto.getNotification().hasErrors()) {
            return;
        }
        ServiceHelper.safeSaveToRepository(repository, project, () -> dto.setNotification(
                NotificationFactory.createAmbiguousErrorNotification(provider.getMessageByLocaleService())));
    }

    private void checkForRedundancy(ProjectDTO dto) {
        if (repository.existsProjectByName(dto.getName())) {
            dto.appendNotification(NotificationFactory.createErrorNotification("name",
                                                                               provider.getMessageByLocaleService().getMessage(
                                                                                       "validation.project.name.exists")));
        }
        if (repository.existsById(dto.getProjectKey())) {
            dto.appendNotification(NotificationFactory.createErrorNotification("projectKey",
                                                                               provider.getMessageByLocaleService().getMessage(
                                                                                       "validation.project.key.exists")));
        }
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
