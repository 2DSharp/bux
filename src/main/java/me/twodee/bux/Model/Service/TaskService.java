package me.twodee.bux.Model.Service;

import me.twodee.bux.DTO.HelperValueObject.Notification;
import me.twodee.bux.DTO.Project.GoalDTO;
import me.twodee.bux.DTO.Task.TaskCreationDTO;
import me.twodee.bux.DTO.Task.TaskDTO;
import me.twodee.bux.DTO.Task.TaskOrderingDTO;
import me.twodee.bux.Factory.NotificationFactory;
import me.twodee.bux.Model.Entity.*;
import me.twodee.bux.Model.Repository.TaskRepository;
import me.twodee.bux.Model.Repository.TaskSequenceRepository;
import me.twodee.bux.Provider.SpringHelperDependencyProvider;
import me.twodee.bux.Util.DomainToDTOConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

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
    private final TaskSequenceRepository taskSequenceRepo;

    @Autowired
    public TaskService(TaskRepository repository,
                       TaskSequenceRepository taskSequenceRepository,
                       SpringHelperDependencyProvider provider,
                       ProjectManagement projectManagement,
                       AccountService accountService
    ) {
        this.repository = repository;
        this.taskSequenceRepo = taskSequenceRepository;
        this.provider = provider;
        this.projectManagement = projectManagement;
        this.accountService = accountService;
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
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
        TaskSequence nextSequence = getSequence(project.getId());
        Task task = Task.builder()
                .id(new Task.TaskId(project.getId(), nextSequence))
                .title(dto.getTitle())
                .deadline(dto.getDeadline())
                .priority(dto.getPriority())
                .createdBy(user)
                .status(dto.getStatus())
                .description(dto.getDescription())
                .assignee(getAssignee(dto.getAssignee()))
                .status("TODO") // TODO: Remove this debug string with statuses.get(0)
                .build();
        taskSequenceRepo.save(nextSequence);
        task = repository.save(task);
        return TaskDTO.build(task);
    }

    private TaskSequence getSequence(Project.ProjectId projectId) {

        TaskSequence sequence = new TaskSequence(projectId);
        var lastSeq = taskSequenceRepo.findById(sequence.getSequenceId());
        if (lastSeq.isPresent()) {
            sequence = lastSeq.get();
        }
        sequence.setLastTaskId(sequence.getLastTaskId() + 1);
        return sequence;
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
