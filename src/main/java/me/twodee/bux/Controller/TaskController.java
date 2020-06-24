package me.twodee.bux.Controller;

import me.twodee.bux.DTO.Task.TaskCreationDTO;
import me.twodee.bux.DTO.Task.TaskDTO;
import me.twodee.bux.Model.Service.AccountService;
import me.twodee.bux.Model.Service.GoalService;
import me.twodee.bux.Model.Service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
public class TaskController extends RestAPI {
    private final AccountService accountService;
    private final GoalService goalService;
    private final TaskService taskService;

    @Autowired
    public TaskController(AccountService accountService, GoalService goalService, TaskService taskService) {
        this.accountService = accountService;
        this.goalService = goalService;
        this.taskService = taskService;
    }

    @PostMapping("/tasks/create")
    public ResponseEntity<TaskDTO> addNewTask(HttpSession session, @RequestBody TaskCreationDTO dto) {
        if (!accountService.currentUserCanCreateProject(session)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        TaskDTO result = taskService.createTask(dto, accountService.getUser(session));
        goalService.addTaskToGoal(result, dto.getGoalId());
        return ResponseEntity.ok(result);
    }
}
