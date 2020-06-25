package me.twodee.bux.Controller;

import me.twodee.bux.DTO.HelperValueObject.Notification;
import me.twodee.bux.DTO.Project.GoalCreationDTO;
import me.twodee.bux.DTO.Project.GoalDTO;
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

    @PostMapping("/projects/goals/create")
    public ResponseEntity<Notification> createNewGoal(HttpSession session, @RequestBody GoalCreationDTO dto) {
        if (!accountService.currentUserCanCreateProject(session)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        goalService.createGoal(dto, accountService.getUser(session));
        return new ResponseEntity<>(dto.getNotification(), HttpStatus.OK);
    }

    @GetMapping("/projects/{key}/goals")
    public ResponseEntity<GoalsList> findGoalsForProject(HttpSession session, @PathVariable String key) {
        if (!accountService.isLoggedIn(session)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        return ResponseEntity.ok(goalService.getAllGoalsListForProject(key));
    }

    @GetMapping("/projects/{projectKey}/goals/{goal}")
    public ResponseEntity<GoalDTO> fetchGoalForProject(HttpSession session, @PathVariable String projectKey, @PathVariable int goal) {
        if (!accountService.isLoggedIn(session)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        return ResponseEntity.ok(goalService.fetchGoal(projectKey, goal));
    }

    @PostMapping("/updateTaskList")
    public ResponseEntity<List<String>> reorderTaskList(HttpSession session, @RequestBody TaskOrderingDTO dto) {
        if (!accountService.isLoggedIn(session)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return ResponseEntity.ok(goalService.reorderTasks(dto));
    }

    @GetMapping("/projects/{key}/milestones")
    public ResponseEntity<List<String>> findMilestonesForProject(HttpSession session, @PathVariable String key) {
        if (!accountService.isLoggedIn(session)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return ResponseEntity.ok(goalService.getAllMilestonesForProject(key));
    }
}
