package me.twodee.bux.Model.Service;

import me.twodee.bux.Util.DomainToDTOConverter;
import me.twodee.bux.DTO.UserDTO;
import me.twodee.bux.Model.Entity.User;
import me.twodee.bux.Model.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import java.util.Set;

@Service
public class Account
{
    private final UserRepository repository;

    @Autowired
    public Account(UserRepository repository)
    {
        this.repository = repository;
    }
    public void register(UserDTO dto, User.Role role) throws Exception
    {
        User user = new User(dto.getName(), dto.getUsername(), dto.getEmail(), dto.getPassword());
        user.setRole(role);
        Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
        Set<ConstraintViolation<User>> violations = validator.validate(user);

        if (violations.isEmpty()) {
           repository.save(user);
        }
        else {
            dto.setNotification(DomainToDTOConverter.convert(violations));
        }
    }

    public boolean usersExist()
    {
        return repository.count() > 0;
    }
}
