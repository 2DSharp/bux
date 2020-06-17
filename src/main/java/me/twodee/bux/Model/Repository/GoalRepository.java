package me.twodee.bux.Model.Repository;

import me.twodee.bux.Model.Entity.Goal;
import me.twodee.bux.Model.Entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Integer> {
    List<Goal> findByProject(Project project);
}
