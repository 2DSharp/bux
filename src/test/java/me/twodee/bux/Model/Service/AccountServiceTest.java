package me.twodee.bux.Model.Service;

import me.twodee.bux.DTO.User.UserDTO;
import me.twodee.bux.DTO.User.UserLoginDTO;
import me.twodee.bux.Model.Entity.User;
import me.twodee.bux.Model.Repository.UserRepository;
import me.twodee.bux.Provider.SpringHelperDependencyProvider;
import me.twodee.bux.Util.MessageByLocaleService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.dao.DataIntegrityViolationException;

import javax.servlet.http.HttpSession;
import javax.validation.Validation;
import javax.validation.Validator;
import java.util.Map;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AccountServiceTest
{
    @Mock
    UserRepository repository;

    @Mock
    SpringHelperDependencyProvider provider;

    @Mock
    MessageByLocaleService messageByLocaleService;

    @Mock
    HttpSession session;

    Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    @BeforeEach
    void setUp()
    {
        MockitoAnnotations.initMocks(this);
        when(provider.getValidator()).thenReturn(validator);
        when(provider.getMessageByLocaleService()).thenReturn(messageByLocaleService);
    }

    @Test
    void registerFailure()
    {
        AccountService accountService = new AccountService(repository, provider);
        UserDTO dto = new UserDTO("", "", "", "");

        accountService.register(dto, User.Role.ADMIN);

        assertTrue(dto.getNotification().hasErrors());
    }

    @Test
    void testReturnedErrors()
    {
        AccountService accountService = new AccountService(repository, provider);
        UserDTO dto = new UserDTO("d", "jdoe123", "2d@", "helloworld1234");
        accountService.register(dto, User.Role.ADMIN);

        Map<String, String> errors = dto.getNotification().getErrors();

        assertTrue(errors.containsKey("name"));
        assertThat(errors.get("name"), equalTo("{validation.name.size}"));

        assertTrue(errors.containsKey("email"));
        assertThat(errors.get("email"), equalTo("{validation.email.pattern}"));
    }

    @Test
    void registerSuccess()
    {
        AccountService accountService = new AccountService(repository, provider);
        UserDTO dto = new UserDTO("John Doe", "jdoe", "jd@jd.co", "helloworld1234");

        when(repository.save(any(User.class))).thenReturn(new User());

        accountService.register(dto, User.Role.ADMIN);
        verify(repository, times(1)).save(any(User.class));
        assertFalse(dto.getNotification().hasErrors());
    }

    @Test
    void testDuplicateRegistration()
    {
        AccountService accountService = new AccountService(repository, provider);
        UserDTO dto = new UserDTO("John Doe", "jdoe", "jd@jd.co", "helloworld1234");

        when(repository.findUserByUsername(anyString())).thenReturn(Optional.of(new User()));
        when(repository.findUserByEmail(anyString())).thenReturn(Optional.of(new User()));
        when(messageByLocaleService.getMessage("validation.username.taken")).thenReturn("validation.username.taken");
        when(messageByLocaleService.getMessage("validation.email.taken")).thenReturn("validation.email.taken");

        accountService.register(dto, User.Role.STANDARD);
        Map<String, String> errors = dto.getNotification().getErrors();

        assertThat(errors.size(), equalTo(2));
        assertThat(errors.get("username"), equalTo("validation.username.taken"));
        assertThat(errors.get("email"), equalTo("validation.email.taken"));
    }

    @Test
    void testDuplicateRaceCondition()
    {
        AccountService accountService = new AccountService(repository, provider);
        UserDTO dto = new UserDTO("John Doe", "jdoe", "jd@jd.co", "helloworld1234");

        when(repository.save(any(User.class))).thenThrow(new DataIntegrityViolationException("error"));
        when(messageByLocaleService.getMessage("validation.exception")).thenReturn(
                "Something went wrong, please try again");
        accountService.register(dto, User.Role.ADMIN);

        assertTrue(dto.getNotification().hasErrors());
        assertThat(dto.getNotification().getErrors().get("global"),
                   equalTo("Something went wrong, please try again"));
    }

    @Test
    void loginSuccess()
    {
        AccountService accountService = new AccountService(repository, provider);
        UserLoginDTO dto = new UserLoginDTO("dedipyaman", "qwerty1234");
        Optional<User> user = Optional.of(new User("John", "dedipyaman", "2d@twodee.me", "qwerty1234"));

        when(repository.findUserByEmailOrUsername(anyString(), anyString())).thenReturn(user);

        accountService.login(dto, session);
        assertFalse(dto.getNotification().hasErrors());
    }

    @Test
    void loginWithEmptyPassword()
    {
        AccountService accountService = new AccountService(repository, provider);
        UserLoginDTO dto = new UserLoginDTO("dedipyaman", "");

        accountService.login(dto, session);
        assertTrue(dto.getNotification().hasErrors());
        assertThat(dto.getNotification().getErrors().size(), equalTo(1));
        assertThat(dto.getNotification().getErrors().get("password"), equalTo("{validation.login.password.invalid}"));
    }

    @Test
    void loginWithInvalidPassword()
    {
        AccountService accountService = new AccountService(repository, provider);
        UserLoginDTO dto = new UserLoginDTO("dedipyaman", "helloworld");

        Optional<User> user = Optional.of(new User("John", "dedipyaman", "2d@twodee.me", "qwerty1234"));
        when(repository.findUserByEmailOrUsername(anyString(), anyString())).thenReturn(user);
        when(messageByLocaleService.getMessage("validation.login.password.invalid")).thenReturn(
                "{validation.login.password.invalid}");

        accountService.login(dto, session);
        assertTrue(dto.getNotification().hasErrors());
        assertThat(dto.getNotification().getErrors().size(), equalTo(1));
        assertThat(dto.getNotification().getErrors().get("password"), equalTo("{validation.login.password.invalid}"));
    }

    @Test
    void loginWithNonexistent()
    {
        AccountService accountService = new AccountService(repository, provider);
        UserLoginDTO dto = new UserLoginDTO("dedipyaman", "helloworld");

        when(repository.findUserByEmailOrUsername(anyString(), anyString())).thenReturn(Optional.empty());
        when(messageByLocaleService.getMessage("validation.login.identifier.invalid")).thenReturn(
                "{validation.login.identifier.invalid}");

        accountService.login(dto, session);
        assertTrue(dto.getNotification().hasErrors());
        assertThat(dto.getNotification().getErrors().size(), equalTo(1));
        assertThat(dto.getNotification().getErrors().get("identifier"),
                   equalTo("{validation.login.identifier.invalid}"));
    }
}