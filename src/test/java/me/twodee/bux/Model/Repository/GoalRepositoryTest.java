package me.twodee.bux.Model.Repository;

import me.twodee.bux.Model.Entity.Goal;
import me.twodee.bux.Model.Entity.Project;
import me.twodee.bux.Model.Entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import javax.annotation.Resource;
import java.time.LocalDate;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

@DataJpaTest
class GoalRepositoryTest {
    @Resource
    GoalRepository repository;

    @Resource
    ProjectRepository projectRepository;

    @Resource
    UserRepository userRepository;

    @BeforeEach
    void cleanUp() {
        repository.deleteAll();
    }

}