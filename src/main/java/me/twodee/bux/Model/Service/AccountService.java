package me.twodee.bux.Model.Service;

import me.twodee.bux.DTO.HelperValueObject.Error;
import me.twodee.bux.DTO.HelperValueObject.Notification;
import me.twodee.bux.DTO.User.UserDTO;
import me.twodee.bux.DTO.User.UserLoginDTO;
import me.twodee.bux.Model.Entity.User;
import me.twodee.bux.Model.Repository.UserRepository;
import me.twodee.bux.Provider.SpringHelperDependencyProvider;
import me.twodee.bux.Util.CryptoUtil;
import me.twodee.bux.Util.DomainToDTOConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import javax.validation.ConstraintViolation;
import java.util.*;
import java.util.function.Consumer;


@Service
public class AccountService
{
    private final UserRepository repository;
    private final SpringHelperDependencyProvider provider;

    private final String SESS_USER_ID = "user_id";

    @Autowired
    public AccountService(UserRepository repository,
                          SpringHelperDependencyProvider provider)
    {
        this.repository = repository;
        this.provider = provider;
    }

    public void register(UserDTO dto, User.Role role)
    {
        try {
            User user = new User(dto.getName(), dto.getUsername(), dto.getEmail(), dto.getPassword());
            user.setRole(role);

            Set<ConstraintViolation<User>> violations = provider.getValidator().validate(user);
            dto.setNotification(DomainToDTOConverter.convert(violations));
            if (!dto.getNotification().hasErrors()) {
                dto.appendNotification(checkForDuplicates(dto.getUsername(), dto.getEmail()));
            }

            if (!dto.getNotification().hasErrors()) {
                repository.save(user);
            }

        } catch (DataIntegrityViolationException e) {
            // This is mainly for race conditions, uniqueness should be checked above beforehand.
            // If we have to get the offending field and the cause, we need to parse the error string
            // Can't do it while being DB-agnostic, let it fail with a generic message, let the user try again
            // Can show the proper error then
            Notification notification = new Notification();
            notification.addError(
                    new Error("global", provider.getMessageByLocaleService().getMessage("validation.exception")));
            dto.setNotification(notification);
        }
    }

    public void login(UserLoginDTO dto, HttpSession session)
    {
        Set<ConstraintViolation<UserLoginDTO>> violations = provider.getValidator().validate(dto);
        if (!violations.isEmpty()) {
            dto.setNotification(DomainToDTOConverter.convert(violations));
            return;
        }
        Optional<User> user = repository.findUserByEmailOrUsername(dto.getIdentifier(), dto.getIdentifier());
        user.ifPresentOrElse(u -> persistSession(u, dto, session),
                             () -> dto.setNotification(createNotificationForInvalidLogin("identifier")));
    }

    private void persistSession(User user, UserLoginDTO dto, HttpSession session)
    {
        if (CryptoUtil.verifyPassword(dto.getPassword(), user.getHashedPassword())) {
            session.setAttribute(SESS_USER_ID, user);
            return;
        }
        dto.setNotification(createNotificationForInvalidLogin("password"));
    }

    private Notification createNotificationForInvalidLogin(String cause)
    {
        Notification notification = new Notification();

        Map<String, String> causeMap = new HashMap<>();
        causeMap.put("identifier",
                     provider.getMessageByLocaleService().getMessage("validation.login.identifier.invalid"));
        causeMap.put("password",
                     provider.getMessageByLocaleService().getMessage("validation.login.password.invalid"));

        notification.addError(new Error(cause, causeMap.get(cause)));
        return notification;
    }

    private Notification checkForDuplicates(String username, String email)
    {
        Notification notification = new Notification();
        if (repository.findUserByUsername(username).isPresent()) {
            notification.addError(new Error("username", provider.getMessageByLocaleService().getMessage(
                    "validation.username.taken")));
        }
        if (repository.findUserByEmail(email).isPresent()) {
            notification.addError(
                    new Error("email", provider.getMessageByLocaleService().getMessage("validation.email.taken")));
        }

        return notification;
    }

    public boolean usersExist()
    {
        return repository.count() > 0;
    }
}
