package me.twodee.bux.Controller;

import me.twodee.bux.DTO.HelperValueObject.Notification;
import me.twodee.bux.DTO.User.UserDTO;
import me.twodee.bux.Model.Entity.User;
import me.twodee.bux.Model.Service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(maxAge = 3600)
@RestController
public class AccountController
{
    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService)
    {
        this.accountService = accountService;
    }

    @PostMapping("/accounts/create")
    public ResponseEntity<Notification> createNewAccount(@RequestBody UserDTO dto)
    {
        if (!accountService.usersExist())
            accountService.register(dto, User.Role.ADMIN);
        else
            accountService.register(dto, User.Role.STANDARD);

        if (dto.getNotification().hasErrors())
            return new ResponseEntity<>(dto.getNotification(), HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(dto.getNotification(), HttpStatus.CREATED);
    }
}
