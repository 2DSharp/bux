package me.twodee.bux.Model.Repository;

import me.twodee.bux.Model.Entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.DataIntegrityViolationException;

import javax.annotation.Resource;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class UserRepositoryTest
{
    @Resource
    UserRepository repository;

    @BeforeEach
    void cleanUp()
    {
        repository.deleteAll();
    }

    @Test
    void testSuccessfulSave()
    {
        repository.save(new User("Donald", "donald", "d2@2d.co", "helloworld"));
        assertThat(repository.findAll().get(0).getName(), equalTo("Donald"));
    }
    @Test
    void testUsernameFetchFail()
    {
        Optional<User> user = repository.findUserByUsername("donalds");
        assertFalse(user.isPresent());
    }

    @Test
    void testUsernameFetchPass()
    {
        repository.save(new User("Donald", "donald", "d2@2d.co", "helloworld"));
        assertThat(repository.findAll().get(0).getName(), equalTo("Donald"));

        Optional<User> user = repository.findUserByUsername("donald");
        assertTrue(user.isPresent());
        assertThat(user.get().getEmail(), equalTo("d2@2d.co"));
    }

    @Test
    void testDuplicateEntry()
    {
        repository.saveAndFlush(new User("Donald", "donald", "d2@2d.co", "helloworld"));
        assertThat(repository.findAll().get(0).getName(), equalTo("Donald"));
        assertThat(repository.count(), equalTo(1L));

        assertThrows(DataIntegrityViolationException.class,
                     () -> repository.saveAndFlush(new User("Donalds", "donald", "d2@2d.co", "helloworsld")));
    }

    @Test
    void findUserByEmailOrUsername()
    {
        repository.saveAndFlush(new User("Donald", "donald", "d2@2d.co", "helloworld"));

        Optional<User> user = repository.findUserByEmailOrUsername("", "donald");
        assertTrue(user.isPresent());
        assertThat(user.get().getName(), equalTo("Donald"));

        user = repository.findUserByEmailOrUsername("d2@2d.co", "");
        assertTrue(user.isPresent());
        assertThat(user.get().getName(), equalTo("Donald"));

        user = repository.findUserByEmailOrUsername("d2@2d.co", "donald");
        assertTrue(user.isPresent());
        assertThat(user.get().getName(), equalTo("Donald"));
    }
}