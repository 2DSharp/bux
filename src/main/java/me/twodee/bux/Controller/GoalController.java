package me.twodee.bux.Controller;

import me.twodee.bux.DTO.Project.GoalCreationDTO;
import me.twodee.bux.Model.Service.AccountService;
import me.twodee.bux.Model.Service.GoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpSession;
import java.util.Map;

public class GoalController extends RestAPI {
    private AccountService accountService;
    private GoalService goalService;

    @Autowired
    public GoalController(AccountService accountService, GoalService goalService) {
        this.accountService = accountService;
        this.goalService = goalService;
    }

    @PostMapping("/projects/{id}/goals/create")
    public ResponseEntity<Map<String, String>> createNewGoal(HttpSession session, @PathVariable("id") String id,
                                                             @RequestBody GoalCreationDTO dto) {
        if (!accountService.currentUserCanCreateProject(session)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        goalService.createGoal(dto, accountService.getUser(session));

        if (dto.getNotification().hasErrors()) {
            return new ResponseEntity<>(dto.getNotification().getErrors(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
