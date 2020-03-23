package me.twodee.bux.Model.Service;

import me.twodee.bux.BuxApplication;
import me.twodee.bux.DTO.UserDTO;
import me.twodee.bux.Util.MessageByLocaleService;
import me.twodee.bux.Model.Entity.User;
import me.twodee.bux.Model.Repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import javax.validation.Validator;

import java.util.Map;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = {BuxApplication.class})
class AccountTest
{
    @Resource
    UserRepository repository;

    @Resource
    MessageByLocaleService messageByLocaleService;

    @Resource
    Validator validator;

    @BeforeEach
    void setUp()
    {
        repository.deleteAll();
    }
    @Test
    void registerFailure() throws Exception
    {
        Account account = new Account(repository, messageByLocaleService, validator);
        UserDTO dto = new UserDTO("", "", "", "");
        account.register(dto, User.Role.ADMIN);

        assertTrue(dto.getNotification().hasErrors());
    }

    @Test
    void testReturnedErrors() throws Exception
    {
        Account account = new Account(repository, messageByLocaleService, validator);
        UserDTO dto = new UserDTO("d", "jdoe123", "2d@", "helloworld1234");
        account.register(dto, User.Role.ADMIN);

        Map<String, String> errors = dto.getNotification().getErrors();

        assertTrue(errors.containsKey("name"));
        assertThat(errors.get("name"), equalTo("Please keep your name in 2-255 characters"));

        assertTrue(errors.containsKey("email"));
        assertThat(errors.get("email"), equalTo(messageByLocaleService.getMessage("validation.email.pattern")));

    }

    @Test
    void registerSuccess() throws Exception
    {
        Account account = new Account(repository, messageByLocaleService, validator);
        UserDTO dto = new UserDTO("John Doe", "jdoe", "jd@jd.co", "helloworld1234");
        account.register(dto, User.Role.ADMIN);

        assertThat(repository.count(), equalTo(1L));
        assertThat(repository.findAll().get(0).getName(), equalTo("John Doe"));
    }

    @Test
    void registerDuplicate()
    {
        Account account = new Account(repository, messageByLocaleService, validator);
        UserDTO dto = new UserDTO("John Doe", "jdoe", "jd@jd.co", "helloworld1234");
        account.register(dto, User.Role.ADMIN);
        assertThat(repository.findAll().get(0).getName(), equalTo("John Doe"));

        account.register(dto, User.Role.ADMIN);
        assertTrue(dto.getNotification().hasErrors());
        assertThat(dto.getNotification().getErrors().get("username"),
                   equalTo("The username has already been taken"));
        assertThat(dto.getNotification().getErrors().get("email"), equalTo("The email has already been taken"));
    }
}