package me.twodee.bux.Model.Repository;

import me.twodee.bux.Model.Entity.Project;
import me.twodee.bux.Model.Entity.Task;
import me.twodee.bux.Model.Entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import javax.annotation.Resource;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

@DataJpaTest
public class TaskRepositoryTest {
    @Resource
    TaskRepository repository;

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
        Task task = Task.builder().title("Do something").project(project).build();
        Task savedTask = repository.save(task);
        assertThat(savedTask.getId(), equalTo("PROJ-1"));

        project = new Project("Name2", "TEST", usr);
        projectRepository.save(project);
        task = Task.builder().title("Do something").project(project).build();
        savedTask = repository.save(task);

        assertThat(savedTask.getId(), equalTo("TEST-1"));

        task = Task.builder().title("Do something 2").project(project).build();
        savedTask = repository.save(task);

        assertThat(savedTask.getId(), equalTo("TEST-2"));
    }
}
