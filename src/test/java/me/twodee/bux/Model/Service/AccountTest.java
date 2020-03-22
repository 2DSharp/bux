package me.twodee.bux.Model.Service;

import me.twodee.bux.DTO.UserDTO;
import me.twodee.bux.Model.Entity.User;
import me.twodee.bux.Model.Repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataIntegrityViolationException;

import javax.annotation.Resource;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class AccountTest
{
    @Resource
    UserRepository repository;

    @Test
    void registerFailure() throws Exception
    {
        Account account = new Account(repository);
        UserDTO dto = new UserDTO("", "", "", "");
        account.register(dto, User.Role.ADMIN);

        assertTrue(dto.getNotification().hasErrors());
    }

    @Test
    void registerSuccess() throws Exception
    {
        Account account = new Account(repository);
        UserDTO dto = new UserDTO("John Doe", "jdoe", "jd@jd.co", "helloworld1234");
        account.register(dto, User.Role.ADMIN);
        assertThat(repository.count(), equalTo(1));
        assertTrue(repository.findById(0).isPresent());
        assertThat(repository.findById(0).get().getName(), equalTo("John Doe"));
    }

    @Test
    void registerDuplicate() throws Exception
    {
        Account account = new Account(repository);
        UserDTO dto = new UserDTO("John Doe", "jdoe", "jd@jd.co", "helloworld1234");
        account.register(dto, User.Role.ADMIN);
        assertThat(repository.findAll().get(0).getName(), equalTo("John Doe"));
        System.out.println(repository.count());

        assertThrows(DataIntegrityViolationException.class, () -> account.register(dto, User.Role.ADMIN));
    }
}