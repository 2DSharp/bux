package me.twodee.bux.Model.Repository;

import me.twodee.bux.Model.Entity.Task;
import me.twodee.bux.Model.Entity.TaskSequence;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskSequenceRepository extends JpaRepository<TaskSequence, String> {

}
