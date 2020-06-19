package me.twodee.bux.Controller;

import me.twodee.bux.DTO.Project.GoalCreationDTO;
import me.twodee.bux.DTO.Project.GoalDTO;
import me.twodee.bux.DTO.Project.GoalsList;
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
import java.util.Map;

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
    public ResponseEntity<Map<String, String>> createNewGoal(HttpSession session, @RequestBody GoalCreationDTO dto) {
        if (!accountService.currentUserCanCreateProject(session)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        goalService.createGoal(dto, accountService.getUser(session));

        if (dto.getNotification().hasErrors()) {
            return new ResponseEntity<>(dto.getNotification().getErrors(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/projects/{key}/goals")
    public ResponseEntity<GoalsList> findGoalsForProject(HttpSession session, @PathVariable String key) {
        if (!accountService.isLoggedIn(session)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        return ResponseEntity.ok(goalService.getAllGoalsListForProject(key));
    }

    @GetMapping("/projects/{key}/milestones")
    public ResponseEntity<List<GoalDTO.Milestone>> findMilestonesForProject(HttpSession session, @PathVariable String key) {
        if (!accountService.isLoggedIn(session)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return ResponseEntity.ok(goalService.getAllMilestonesForProject(key));
    }
}
