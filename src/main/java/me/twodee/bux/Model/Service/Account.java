package me.twodee.bux.Model.Service;

import me.twodee.bux.DTO.HelperValueObject.Error;
import me.twodee.bux.DTO.HelperValueObject.Notification;
import me.twodee.bux.Util.MessageByLocaleService;
import me.twodee.bux.Util.DomainToDTOConverter;
import me.twodee.bux.DTO.UserDTO;
import me.twodee.bux.Model.Entity.User;
import me.twodee.bux.Model.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.Set;

@Service
public class Account
{
    private final UserRepository repository;
    private final MessageByLocaleService messageByLocaleService;
    private final Validator validator;

    @Autowired
    public Account(UserRepository repository, MessageByLocaleService messageByLocaleService, Validator validator)
    {
        this.repository = repository;
        this.messageByLocaleService = messageByLocaleService;
        this.validator = validator;
    }

    public void register(UserDTO dto, User.Role role)
    {
        try {
            User user = new User(dto.getName(), dto.getUsername(), dto.getEmail(), dto.getPassword());
            user.setRole(role);

            Set<ConstraintViolation<User>> violations = validator.validate(user);

            dto.setNotification(DomainToDTOConverter.convert(violations));
            dto.appendNotification(checkForDuplicates(dto.getUsername(), dto.getEmail()));

            if (!dto.getNotification().hasErrors())
                repository.save(user);

        } catch (DataIntegrityViolationException e) {
            // This is mainly for race conditions, uniqueness should be checked above beforehand.
            // If we have to get the offending field and the cause, we need to parse the error string
            // Can't do it while being DB-agnostic, let it fail with a generic message, let the user try again
            // Can show the proper error then
            Notification notification = new Notification();
            notification.addError(new Error("global", messageByLocaleService.getMessage("validation.exception")));
            dto.setNotification(notification);
        }
    }

    private Notification checkForDuplicates(String username, String email)
    {
        Notification notification = new Notification();
        if (repository.findUserByUsername(username).isPresent()) {
            notification.addError(new Error("username", messageByLocaleService.getMessage("validation.username.taken")));
        }
        if (repository.findUserByEmail(email).isPresent()) {
            notification.addError(new Error("email", messageByLocaleService.getMessage("validation.email.taken")));
        }

        return notification;
    }
    public boolean usersExist()
    {
        return repository.count() > 0;
    }
}
