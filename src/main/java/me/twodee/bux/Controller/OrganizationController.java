package me.twodee.bux.Controller;

import me.twodee.bux.Component.Authorization.RequireLogin;
import me.twodee.bux.DTO.HelperValueObject.Notification;
import me.twodee.bux.DTO.Organization.OrganizationCreation;
import me.twodee.bux.Model.Entity.User;
import me.twodee.bux.Model.Service.AccountService;
import me.twodee.bux.Model.Service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
public class OrganizationController extends RestAPI {

    private final OrganizationService service;
    private final AccountService accounts;

    @Autowired
    public OrganizationController(OrganizationService service, AccountService accounts) {
        this.service = service;
        this.accounts = accounts;
    }

    @RequireLogin
    @PostMapping("/teams/create")
    public ResponseEntity<Notification> createOrg(HttpSession session, @RequestBody OrganizationCreation dto) {
        User user = accounts.getUser(session);
        service.createOrg(dto, user);
        if (dto.getNotification().hasErrors()) {
            return new ResponseEntity<>(dto.getNotification(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
