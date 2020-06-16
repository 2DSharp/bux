package me.twodee.bux.Model.Repository;

import me.twodee.bux.Model.Entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Integer>
{
    boolean existsProjectByProjectKey(String key);
    boolean existsProjectByName(String name);

    Project findProjectByProjectKey(String key);

    @Override
    <S extends Project> S save(S s);
}
