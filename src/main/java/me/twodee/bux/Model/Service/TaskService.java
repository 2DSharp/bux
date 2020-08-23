package me.twodee.bux.Model.Service;

import me.twodee.bux.DTO.HelperValueObject.Notification;
import me.twodee.bux.DTO.Project.GoalDTO;
import me.twodee.bux.DTO.Task.TaskCreationDTO;
import me.twodee.bux.DTO.Task.TaskDTO;
import me.twodee.bux.DTO.Task.TaskOrderingDTO;
import me.twodee.bux.Factory.NotificationFactory;
import me.twodee.bux.Model.Entity.*;
import me.twodee.bux.Model.Repository.TaskRepository;
import me.twodee.bux.Provider.SpringHelperDependencyProvider;
import me.twodee.bux.Util.DomainToDTOConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Service
public class TaskService {
    private final TaskRepository repository;
    private final AccountService accountService;
    private final SpringHelperDependencyProvider provider;
    private final ProjectManagement projectManagement;

    @Autowired
    public TaskService(TaskRepository repository,
                       SpringHelperDependencyProvider provider,
                       ProjectManagement projectManagement,
                       AccountService accountService
    ) {
        this.repository = repository;
        this.provider = provider;
        this.projectManagement = projectManagement;
        this.accountService = accountService;
    }

    public TaskDTO createTask(TaskCreationDTO dto, User user, List<String> statuses) {
        Set<ConstraintViolation<TaskCreationDTO>> violations = provider.getValidator().validate(dto);
        if (!violations.isEmpty()) {
            dto.setNotification(DomainToDTOConverter.convert(violations));
            return null;
        }

        if (!projectManagement.projectExists(new Project.ProjectId(dto.getProjectKey(), dto.getTeam()))) {
            dto.appendNotification(NotificationFactory.createErrorNotification("global",
                                                                               provider.getMessageByLocaleService().getMessage(
                                                                                       "validation.project.key.nonexistent")));
            return null;
        }

        Project project = new Project(new Project.ProjectId(dto.getProjectKey(), new Organization(dto.getTeam())));
        Task task = Task.builder()
                .project(project)
                .title(dto.getTitle())
                .deadline(dto.getDeadline())
                .priority(dto.getPriority())
                .createdBy(user)
                .status(dto.getStatus())
                .description(dto.getDescription())
                .assignee(getAssignee(dto.getAssignee()))
                .status(statuses.get(0))
                .build();

        task = repository.save(task);
        return TaskDTO.build(task);
    }

    private User getAssignee(String username) {
        if (username != null) {
            return accountService.getUser(username);
        }
        return null;
    }

    public void changeStatus(TaskOrderingDTO dto, GoalDTO goalDTO) {
        if (goalDTO.getStatus().equals(Goal.Status.ACTIVE)) {
            Optional<Task> task = repository.findById(dto.getTaskId());
            task.ifPresent(entity -> entity.setStatus(dto.getDestinationStatus()));
            return;
        }
        Notification note = new Notification();
        note.setErrors(Map.of("global", provider.getMessageByLocaleService().getMessage("validation.goal.inactive")));
        dto.setNotification(note);
    }
}
