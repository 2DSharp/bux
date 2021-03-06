package me.twodee.bux.Model.Repository;

import me.twodee.bux.Model.Entity.Goal;
import me.twodee.bux.Model.Entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalRepository extends JpaRepository<Goal, String> {
    List<Goal> findByProject(Project project);

    Goal findByProjectAndId(Project project, String id);

    @Query("SELECT DISTINCT g.milestone FROM Goal g WHERE g.project.id.projectKey = ?1")
    List<String> findAllMilestones(String project);
}
