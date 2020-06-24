package me.twodee.bux.Model.Repository;

import me.twodee.bux.Model.Entity.Project;
import me.twodee.bux.Model.Entity.Task;
import me.twodee.bux.Model.Entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import javax.annotation.Resource;

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
        System.out.println(savedTask);

        project = new Project("Name2", "TEST", usr);
        projectRepository.save(project);
        task = Task.builder().title("Do something").project(project).build();
        savedTask = repository.save(task);

        System.out.println(savedTask);
    }
}
