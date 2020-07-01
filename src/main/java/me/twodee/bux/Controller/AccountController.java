package me.twodee.bux.Controller;

import me.twodee.bux.DTO.User.PublicUserDTO;
import me.twodee.bux.DTO.User.UserDTO;
import me.twodee.bux.DTO.User.UserLoginDTO;
import me.twodee.bux.Model.Entity.User;
import me.twodee.bux.Model.Service.AccountService;
import me.twodee.bux.ResponseObject.LoginResponse;
import me.twodee.bux.ResponseObject.RegistrationResponse;
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
public class AccountController extends RestAPI
{
    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService)
    {
        this.accountService = accountService;
    }

    @PostMapping("/accounts/create")
    public ResponseEntity<RegistrationResponse> createNewAccount(@RequestBody UserDTO dto, HttpSession session)
    {
        if (!accountService.usersExist()) {
            accountService.register(dto, User.Role.ADMIN);
        }
        else {
            accountService.register(dto, User.Role.STANDARD);
        }

        if (dto.getNotification().hasErrors()) {
            return new ResponseEntity<>(new RegistrationResponse(dto.getNotification().getErrors()),
                                        HttpStatus.OK);
        }
        return new ResponseEntity<>(new RegistrationResponse(!dto.getNotification().hasErrors()), HttpStatus.CREATED);
    }

    @PostMapping("/accounts/login")
    public ResponseEntity<LoginResponse> login(@RequestBody UserLoginDTO dto, HttpSession session) {
        accountService.login(dto, session);
        LoginResponse response;
        if (dto.getNotification().hasErrors()) {
            response = new LoginResponse(dto.getNotification().getErrors());
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        response = new LoginResponse(true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity<List<PublicUserDTO>> getAllUsers(HttpSession session) {
        if (accountService.isLoggedIn(session)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        return new ResponseEntity<>(accountService.findAllUsers(), HttpStatus.OK);
    }
}
