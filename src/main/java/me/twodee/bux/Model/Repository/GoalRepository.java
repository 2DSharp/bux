package me.twodee.bux.Model.Repository;

import me.twodee.bux.Model.Entity.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Integer> {
}
