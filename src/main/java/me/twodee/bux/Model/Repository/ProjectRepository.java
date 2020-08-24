package me.twodee.bux.Model.Repository;

import me.twodee.bux.Model.Entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Project.ProjectId> {
    boolean existsProjectByNameAndIdOrganizationId(String name, String id_organizationId);

    @Override
    <S extends Project> S save(S s);

    List<Project> findByIdOrganizationId(String teamId);
}
