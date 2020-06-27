package me.twodee.bux.Model.Service;

import me.twodee.bux.DTO.HelperValueObject.Notification;
import me.twodee.bux.DTO.Project.GoalCreationDTO;
import me.twodee.bux.DTO.Project.GoalDTO;
import me.twodee.bux.DTO.Project.GoalsList;
import me.twodee.bux.DTO.Project.StatusTaskListDTO;
import me.twodee.bux.DTO.Task.TaskDTO;
import me.twodee.bux.DTO.Task.TaskOrderingDTO;
import me.twodee.bux.Factory.NotificationFactory;
import me.twodee.bux.Factory.UserDTOFactory;
import me.twodee.bux.Model.Entity.*;
import me.twodee.bux.Model.Repository.GoalRepository;
import me.twodee.bux.Provider.SpringHelperDependencyProvider;
import me.twodee.bux.Util.DomainToDTOConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import static java.time.temporal.ChronoUnit.DAYS;
import static me.twodee.bux.Util.BaseUtil.dragAndDrop;

@Service
public class GoalService {

    private final ProjectManagement projectManagement;
    private final GoalRepository repository;
    private final SpringHelperDependencyProvider provider;

    @Autowired
    public GoalService(ProjectManagement projectManagement,
                       GoalRepository repository, SpringHelperDependencyProvider provider) {
        this.projectManagement = projectManagement;
        this.repository = repository;
        this.provider = provider;
    }

    public void createGoal(GoalCreationDTO dto, User user) {
        Set<ConstraintViolation<GoalCreationDTO>> violations = provider.getValidator().validate(dto);
        if (!violations.isEmpty()) {
            dto.setNotification(DomainToDTOConverter.convert(violations));
            return;
        }

        if (!projectManagement.projectExists(dto.getProjectKey())) {
            dto.appendNotification(NotificationFactory.createErrorNotification("global",
                                                                               provider.getMessageByLocaleService().getMessage(
                                                                                       "validation.project.key.nonexistent")));
            return;
        }

        Project project = projectManagement.getProjectReferenceFromKey(dto.getProjectKey());
        Goal goal = Goal.builder()
                .title(dto.getTitle())
                .priority(dto.getPriority())
                .description(dto.getDescription())
                .deadline(dto.getDeadline())
                .createdBy(user)
                .project(project)
                .milestone(dto.getMilestone())
                .build();

        Goal result = (Goal) ServiceHelper.safeSaveToRepository(repository, goal, () -> dto.setNotification(
                NotificationFactory.createAmbiguousErrorNotification(provider.getMessageByLocaleService())));
        if (!dto.getNotification().hasErrors() && result != null) {
            dto.setNotification(new Notification(goal.getId()));
        }
    }

    public GoalsList getAllGoalsListForProject(String projectKey) {
        List<Goal> goals = repository.findByProject(projectManagement.getProjectReferenceFromKey(projectKey));
        List<GoalDTO> dtoList = goals.stream().map(this::buildGoalDto)
                .collect(Collectors.toList());

        return new GoalsList(projectKey, dtoList);
    }

    public GoalDTO fetchGoal(String projectKey, int goalId) {
        Goal goal = repository.findByProjectAndId(new Project(projectKey), goalId);
        GoalDTO dto = buildGoalDto(goal);

        return buildGoalForTaskDataWithColumns(dto, goal);
    }

    public GoalDTO fetchGoalDetails(int goalId) {
        Optional<Goal> goal = repository.findById(goalId);
        return goal.map(this::buildGoalDto).orElse(null);
    }

    private GoalDTO buildGoalForTaskData(GoalDTO dto, List<Task> tasks) {
        dto.setTaskIds(tasks.stream().map(Task::getId).collect(Collectors.toList()));
        dto.setTasks(tasks.stream().collect(Collectors.toMap(Task::getId, TaskDTO::build)));
        return dto;
    }

    private GoalDTO buildGoalForTaskDataWithColumns(GoalDTO dto, Goal goal) {
        dto.setStatusList(goal.getStatuses());
        dto.setColumnData(goal.getTaskStatusMap().entrySet().stream().collect(Collectors.toMap(Map.Entry::getKey,
                                                                                               e -> new StatusTaskListDTO(
                                                                                                       e.getValue()))));
        return buildGoalForTaskData(dto, goal.getTasks());
    }

    public GoalDTO getTasksWithColumnData(int id) {
        GoalDTO dto = GoalDTO.builder().id(id).build();
        return repository.findById(id)
                .map(value -> buildGoalForTaskDataWithColumns(dto, value)).orElse(null);
    }

    public GoalDTO getTasks(int id) {
        GoalDTO dto = GoalDTO.builder().id(id).build();
        return repository.findById(id).map(value -> buildGoalForTaskData(dto, value.getTasks())).orElse(null);
    }

    public List<String> getAllMilestonesForProject(String projectKey) {
        return repository.findAllMilestones(projectKey)
                .stream()
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    public List<String> getTaskStatusesForGoal(int goalId) {
        Optional<Goal> goal = repository.findById(goalId);
        return goal.map(Goal::getStatuses).orElse(null);
    }

    public GoalDTO addTaskToGoal(TaskDTO taskDTO, int goalId) {
        Optional<Goal> goal = repository.findById(goalId);
        if (goal.isPresent()) {
            Goal entity = goal.get();
            entity.getTasks().add(new Task(taskDTO.getId()));
            entity.getTaskStatusMap().get(entity.getStatuses().get(0)).getTasks().add(taskDTO.getId());
            GoalDTO dto = GoalDTO.builder().id(goalId).build();
            return buildGoalForTaskData(dto, repository.save(entity).getTasks());
        }
        else {
            // else add to backlog
            return null;
        }
    }

    public GoalDTO reorderTasks(TaskOrderingDTO dto) {
        Optional<Goal> goal = repository.findById(dto.getGoalId());
        return goal.map(g -> reorderAndPersistTasks(g, dto.getSource(), dto.getDestination()))
                .orElse(null);
    }

    public GoalDTO reorderTasksWithinStatus(TaskOrderingDTO dto) {
        Optional<Goal> goal = repository.findById(dto.getGoalId());
        if (goal.isPresent()) {
            Goal entity = goal.get();
            List<String> taskOrder = dragAndDrop(entity.getTaskStatusMap().get(dto.getStatus()).getTasks(),
                                                 dto.getSource(),
                                                 dto.getDestination());

            entity.getTaskStatusMap().put(dto.getStatus(), new StatusTaskList(taskOrder));
            GoalDTO result = GoalDTO.builder().id(entity.getId()).build();
            return buildGoalForTaskDataWithColumns(result, repository.save(entity));
        }
        return null;
    }

    public GoalDTO reorderTasksBetweenStatuses(TaskOrderingDTO dto) {
        Optional<Goal> goal = repository.findById(dto.getGoalId());
        if (goal.isPresent()) {
            Goal entity = goal.get();
            // Pull from source and keep the candidate taskId, persist it
            List<String> startTaskIds = entity.getTaskStatusMap().get(dto.getSourceStatus()).getTasks();
            String taskId = startTaskIds.remove(dto.getSource());
            entity.getTaskStatusMap().get(dto.getSourceStatus()).setTasks(startTaskIds);

            // Push the candidate to the destination list
            List<String> endTaskIds = entity.getTaskStatusMap().get(dto.getDestinationStatus()).getTasks();
            endTaskIds.add(dto.getDestination(), taskId);
            entity.getTaskStatusMap().get(dto.getDestinationStatus()).setTasks(endTaskIds);

            GoalDTO result = GoalDTO.builder().id(entity.getId()).build();
            return buildGoalForTaskDataWithColumns(result, repository.save(entity));
        }
        return null;
    }

    private GoalDTO reorderAndPersistTasks(Goal goal, int source, int destination) {
        List<Task> tasks = dragAndDrop(goal.getTasks(), source, destination);
        goal.setTasks(tasks);
        GoalDTO dto = GoalDTO.builder().id(goal.getId()).build();
        return buildGoalForTaskData(dto, repository.save(goal).getTasks());
    }

    private GoalDTO buildGoalDto(Goal goal) {
        int progress = calculateProgress(goal);
        return GoalDTO.builder()
                .id(goal.getId())
                .title(goal.getTitle())
                .description(goal.getDescription())
                .milestone(goal.getMilestone())
                .priority(goal.getPriority())
                .createdBy(UserDTOFactory.buildPublicUser(goal.getCreatedBy()))
                .deadline(goal.getDeadline())
                .progress(progress)
                .status(goal.getStatus())
                .statusList(goal.getStatuses())
                .pressure(calculatePressure(goal, progress))
                .build();
    }

    private int calculateProgress(Goal goal) {
        List<String> statuses = goal.getStatuses();
        long completedTasks = goal.getTasks()
                .stream()
                .filter(task -> task.getStatus().equals(statuses.get(statuses.size() - 1)))
                .count();
        int totalTasks = goal.getTasks().size();

        return (int) Math.round(completedTasks * 100.0 / totalTasks);
    }

    private GoalDTO.Pressure calculatePressure(Goal goal, int currentProgress) {
        long elapsed = DAYS.between(goal.getCreatedAt(), LocalDate.now());
        long totalDays = DAYS.between(goal.getCreatedAt(), goal.getDeadline());
        double ratio = (double) elapsed / totalDays;

        double expectedProgress = ratio * 100 - slackPeriodPercentage(goal.getPriority());

        if (currentProgress < expectedProgress) {
            return GoalDTO.Pressure.HIGH;
        }
        if (currentProgress - expectedProgress <= slackPeriodPercentage(goal.getPriority())) {
            return GoalDTO.Pressure.MEDIUM;
        }
        return GoalDTO.Pressure.LOW;
    }

    private int slackPeriodPercentage(Goal.Priority priority) {
        switch (priority) {
            case LOW:
                return 15;
            case MEDIUM:
                return 10;
            default:
                return 5;
        }
    }
}
