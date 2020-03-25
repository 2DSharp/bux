package me.twodee.bux.DTO;

import me.twodee.bux.DTO.User.UserLoginDTO;
import org.junit.jupiter.api.Test;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import java.util.Set;

import static org.hamcrest.CoreMatchers.anyOf;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;


class UserLoginDTOTest
{
    @Test
    void checkValidationFailure()
    {
        UserLoginDTO dto = new UserLoginDTO("", "");
        Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
        Set<ConstraintViolation<UserLoginDTO>> violations = validator.validate(dto);

        assertFalse(violations.isEmpty());

        violations.forEach(violation -> {
            System.out.println(violation.getMessage());
            assertThat(violation.getMessage(), anyOf(equalTo("{validation.login.identifier.invalid}"), equalTo("{validation.login.password.invalid}")));
        });
    }

    @Test
    void checkCorrectCredentials()
    {
        UserLoginDTO dto = new UserLoginDTO("donald", "qwertyuiop123");
        Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
        Set<ConstraintViolation<UserLoginDTO>> violations = validator.validate(dto);

        assertTrue(violations.isEmpty());
    }
}