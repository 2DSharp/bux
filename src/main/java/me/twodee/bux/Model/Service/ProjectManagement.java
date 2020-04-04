package me.twodee.bux.Model.Service;

import me.twodee.bux.DTO.HelperValueObject.Notification;
import me.twodee.bux.DTO.Project.ProjectDTO;
import me.twodee.bux.Model.Entity.Project;
import me.twodee.bux.Model.Repository.ProjectRepository;
import me.twodee.bux.Provider.NotificationBuilder;
import me.twodee.bux.Provider.SpringHelperDependencyProvider;
import me.twodee.bux.Util.DomainToDTOConverter;
import org.springframework.dao.DataIntegrityViolationException;

import javax.validation.ConstraintViolation;
import java.util.Set;

public class ProjectManagement
{
    private final ProjectRepository repository;
    private final SpringHelperDependencyProvider provider;

    public ProjectManagement(ProjectRepository repository, SpringHelperDependencyProvider provider)
    {
        this.repository = repository;
        this.provider = provider;
    }

    public void createProject(ProjectDTO dto)
    {
            Project project = new Project(dto.getName(), dto.getKey());
            Set<ConstraintViolation<Project>> violations = provider.getValidator().validate(project);
            if (!violations.isEmpty()) {
                dto.setNotification(DomainToDTOConverter.convert(violations));
                return;
            }
            checkForRedundancy(dto);
            if (dto.getNotification().hasErrors())
                return;
            ServiceHelper.safeSaveToRepository(repository, project, () -> dto.setNotification(
                    NotificationBuilder.createAmbiguousErrorNotification(provider.getMessageByLocaleService())));
    }

    private void checkForRedundancy(ProjectDTO dto)
    {
        if (repository.existsProjectByName(dto.getName())) {
            dto.appendNotification(NotificationBuilder.createErrorNotification("name",
                                                                               provider.getMessageByLocaleService().getMessage(
                                                                                       "validation.project.key.exists")));
        }
        if (repository.existsProjectByKey(dto.getKey())) {
            dto.appendNotification(NotificationBuilder.createErrorNotification("key",
                                                                               provider.getMessageByLocaleService().getMessage(
                                                                                       "validation.project.key.exists")));
        }
    }
}
