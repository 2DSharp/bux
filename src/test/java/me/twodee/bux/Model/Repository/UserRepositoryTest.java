package me.twodee.bux.Model.Repository;

import me.twodee.bux.Model.Entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

import java.util.Optional;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
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
    void testUsernameFetchFail()
    {
        repository.save(new User("Donald", "donald", "d2@2d.co", "helloworld"));
        assertThat(repository.findAll().get(0).getName(), equalTo("Donald"));

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
}