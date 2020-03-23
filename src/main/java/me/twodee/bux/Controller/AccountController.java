package me.twodee.bux.Controller;

import me.twodee.bux.DTO.HelperValueObject.Notification;
import me.twodee.bux.DTO.UserDTO;
import me.twodee.bux.Model.Entity.User;
import me.twodee.bux.Model.Service.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(maxAge = 3600)
@RestController
public class AccountController
{
    private final Account account;

    @Autowired
    public AccountController(Account account)
    {
        this.account = account;
    }

    @PostMapping("/accounts/create")
    public ResponseEntity<Notification> createNewAccount(@RequestBody UserDTO dto)
    {
        if (!account.usersExist())
            account.register(dto, User.Role.ADMIN);
        else
            account.register(dto, User.Role.STANDARD);

        if (dto.getNotification().hasErrors())
            return new ResponseEntity<>(dto.getNotification(), HttpStatus.BAD_REQUEST);

        return ResponseEntity.ok(dto.getNotification());
    }
}
