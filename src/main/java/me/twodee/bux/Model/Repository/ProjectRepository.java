package me.twodee.bux.Model.Repository;

import me.twodee.bux.Model.Entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, String> {
    boolean existsProjectByName(String name);

    @Override
    <S extends Project> S save(S s);
}
