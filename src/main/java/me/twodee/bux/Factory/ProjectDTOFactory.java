package me.twodee.bux.Factory;

import me.twodee.bux.DTO.Project.ProjectDTO;
import me.twodee.bux.Exception.BuilderException;
import me.twodee.bux.Model.Entity.Project;

public class ProjectDTOFactory
{
    public static ProjectDTO buildProjectDTO(Project project) throws BuilderException
    {
        return ProjectDTO.getBuilder()
                .setName(project.getName())
                .setProjectKey(project.getProjectKey())
                .setCreationTime(project.getCreationTime())
                .setLeader(UserDTOFactory.buildPublicUser(project.getLeader()))
                .build();

    }
}
