package me.twodee.bux.Model.Entity;

import me.twodee.bux.BuxApplication;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.Set;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;

@SpringBootTest(classes = {BuxApplication.class})
class UserTest
{
    @Autowired
    Validator validator;

    @Test
    void testEmailEmpty()
    {
        Set<ConstraintViolation<User>> violations = validator.validate(new User("John", "john", "", "ajdskjkasj123wkls"));
        violations.forEach(e -> assertThat(e.getMessage(), equalTo("Email cannot be blank")));
    }
}