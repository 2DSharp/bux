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

    @Test
    void testSuccessfulSave() {
        User usr = new User("User", "u1", "d@d.co", "pass");
        Project project = new Project("Name", "PROJ", usr);
        userRepository.save(usr);
        projectRepository.save(project);
        Goal goal = Goal.builder()
                .title("Goal 1")
                .createdBy(usr)
                .deadline(LocalDate.now())
                .project(project)
                .build();
        repository.save(goal);

        assertThat(repository.findAll().get(0).getTitle(), equalTo("Goal 1"));
        assertThat(repository.findAll().get(0).getId(), notNullValue());
    }

    @Test
    void testSaveWithMinimumValues() {
        User usr = new User("User", "u1", "d@d.co", "pass");
        Project project = new Project("Name", "PROJ", usr);
        userRepository.save(usr);
        projectRepository.save(project);
        Goal goal = Goal.builder()
                .title("Goal 1")
                .createdBy(usr)
                .deadline(LocalDate.now())
                .project(project)
                .build();
        Goal result = repository.save(goal);
        assertThat(result.getMilestone(), nullValue());
        assertThat(result.getPriority(), equalTo(Goal.Priority.MEDIUM));
    }
}