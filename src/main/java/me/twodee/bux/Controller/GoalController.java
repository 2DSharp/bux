package me.twodee.bux.Controller;

import me.twodee.bux.Component.Authorization.RequireLogin;
import me.twodee.bux.DTO.HelperValueObject.Notification;
import me.twodee.bux.DTO.Project.GoalCreationDTO;
import me.twodee.bux.DTO.Project.GoalDTO;
import me.twodee.bux.DTO.Project.GoalUpdaterDTO;
import me.twodee.bux.DTO.Project.GoalsList;
import me.twodee.bux.DTO.Task.TaskOrderingDTO;
import me.twodee.bux.Model.Entity.Goal;
import me.twodee.bux.Model.Service.AccountService;
import me.twodee.bux.Model.Service.GoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
public class GoalController extends RestAPI {
    private final AccountService accountService;
    private final GoalService goalService;

    public static class StringToEnumConverter implements Converter<String, Goal.Priority> {
        @Override
        public Goal.Priority convert(String source) {
            try {
                return Goal.Priority.valueOf(source.toUpperCase());
            } catch (IllegalArgumentException e) {
                return null;
            }
        }
    }

    @Autowired
    public GoalController(AccountService accountService, GoalService goalService) {
        this.accountService = accountService;
        this.goalService = goalService;
    }

    @RequireLogin
    @PostMapping("/projects/goals/create")
    public ResponseEntity<Notification> createNewGoal(HttpSession session, @RequestBody GoalCreationDTO dto) {
        if (!accountService.currentUserCanCreateProject(session)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        goalService.createGoal(dto, accountService.getUser(session));
        return new ResponseEntity<>(dto.getNotification(), HttpStatus.OK);
    }

    @RequireLogin
    @GetMapping("/team/{teamId}/projects/{key}/goals")
    public ResponseEntity<GoalsList> findGoalsForProject(@PathVariable String key, @PathVariable String teamId) {
        return ResponseEntity.ok(goalService.getAllGoalsListForProject(key, teamId));
    }

    @RequireLogin
    @GetMapping("/team/{teamId}/projects/{projectKey}/goals/{goal}")
    public ResponseEntity<GoalDTO> fetchGoalForProject(@PathVariable String projectKey, @PathVariable String goal, @PathVariable String teamId) {
        return ResponseEntity.ok(goalService.fetchGoal(projectKey, teamId, goal));
    }

    @RequireLogin
    @PostMapping("/goals/tasks/reorder")
    public ResponseEntity<GoalDTO> reorderTaskList(@RequestBody TaskOrderingDTO dto) {
        return ResponseEntity.ok(goalService.reorderTasks(dto));
    }

    @RequireLogin
    @PostMapping("/goals/tasks/reorder/status")
    public ResponseEntity<GoalDTO> reorderStatusList(@RequestBody TaskOrderingDTO dto) {
        return ResponseEntity.ok(goalService.reorderTasksWithinStatus(dto));
    }

    @RequireLogin
    @GetMapping("/projects/{key}/milestones")
    public ResponseEntity<List<String>> findMilestonesForProject(@PathVariable String key) {
        return ResponseEntity.ok(goalService.getAllMilestonesForProject(key));
    }

    @RequireLogin
    @GetMapping("/goals/{id}/tasks/all")
    public ResponseEntity<GoalDTO> getTasksFromGivenType(@PathVariable("id") String id) {
        return ResponseEntity.ok(goalService.getTasksWithColumnData(id));
    }

    @RequireLogin
    @GetMapping("/goals/{id}/tasks")
    public ResponseEntity<GoalDTO> getTasksForGoal(@PathVariable("id") String id) {
        return ResponseEntity.ok(goalService.getTasks(id));
    }

    @PostMapping("/goals/status/update")
    public ResponseEntity<GoalDTO> updateStatus(HttpSession session, @RequestBody GoalUpdaterDTO dto) {
        if (!accountService.currentUserCanCreateProject(session)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return ResponseEntity.ok(goalService.forwardStatus(dto, accountService.getUser(session)));
    }
}
