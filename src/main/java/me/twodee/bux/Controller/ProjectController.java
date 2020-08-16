package me.twodee.bux.Controller;

import me.twodee.bux.Component.Authorization.RequireLogin;
import me.twodee.bux.DTO.HelperValueObject.Error;
import me.twodee.bux.DTO.HelperValueObject.Notification;
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

    @RequireLogin
    @GetMapping("/projects")
    public ResponseEntity<List<ProjectDTO>> projects(HttpSession session)
    {
        return new ResponseEntity<>(projectManagement.getProjects(), HttpStatus.OK);
    }

    @RequireLogin
    @PostMapping("/projects/create")
    public ResponseEntity<Notification> createNewProject(HttpSession session, @RequestBody ProjectDTO dto) {

        projectManagement.createProject(dto, accountService.getUser(session));
        if (dto.getNotification().hasErrors()) {
            return new ResponseEntity<>(dto.getNotification(), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
