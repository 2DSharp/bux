package me.twodee.bux.Factory;

import me.twodee.bux.DTO.Project.ProjectDTO;
import me.twodee.bux.Model.Entity.Project;

public class ProjectDTOFactory
{
    public static ProjectDTO buildProjectDTO(Project project)
    {
        return ProjectDTO.builder()
                .name(project.getName())
                .projectKey(project.getId().getProjectKey())
                .creationTime(project.getCreationTime())
                .leader(UserDTOFactory.buildPublicUser(project.getLeader()))
                .build();

    }
}
