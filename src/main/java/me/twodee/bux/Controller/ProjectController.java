package me.twodee.bux.Controller;

import me.twodee.bux.DTO.Project.ProjectDTO;
import me.twodee.bux.Model.Service.AccountService;
import me.twodee.bux.Model.Service.ProjectManagement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@RestController
public class ProjectController extends RestAPI
{
    private AccountService accountService;
    private ProjectManagement projectManagement;

    @Autowired
    public ProjectController(AccountService accountService, ProjectManagement projectManagement)
    {
        this.accountService = accountService;
        this.projectManagement = projectManagement;
    }

    @GetMapping("/projects")
    public ResponseEntity<List<ProjectDTO>> projects(HttpSession session)
    {
        if (!accountService.isLoggedIn(session)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(projectManagement.getProjects(), HttpStatus.OK);
    }

    @PostMapping("/projects/create")
    public ResponseEntity<Map<String, String>> createNewProject(HttpSession session, @RequestBody ProjectDTO dto)
    {
        if (!accountService.currentUserCanCreateProject(session)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        projectManagement.createProject(dto, accountService.getUser(session));
        if (dto.getNotification().hasErrors()) {
            return new ResponseEntity<>(dto.getNotification().getErrors(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
