package me.twodee.bux.DTO.Project;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import me.twodee.bux.DTO.DataTransferObject;
import me.twodee.bux.DTO.User.PublicUserDTO;
import me.twodee.bux.Exception.BuilderException;

import java.time.LocalDateTime;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
@Getter
public class ProjectDTO extends DataTransferObject
{
    private LocalDateTime creationTime;
    private String name;
    private String projectKey;
    private PublicUserDTO leader;

    private ProjectDTO(ProjectDTOBuilder builder)
    {
        this.name = builder.name;
        this.projectKey = builder.projectKey;
        this.creationTime = builder.creationTime;
        this.leader = builder.leader;
    }

    public ProjectDTO(String name, String projectKey)
    {
        this.name = name;
        this.projectKey = projectKey;
    }


    public static ProjectDTOBuilder getBuilder()
    {
        return new ProjectDTOBuilder();
    }

    public static class ProjectDTOBuilder
    {
        private LocalDateTime creationTime;
        private String name;
        private String projectKey;
        private PublicUserDTO leader;

        public ProjectDTOBuilder setName(String name)
        {
            this.name = name;
            return this;
        }

        public ProjectDTOBuilder setProjectKey(String key)
        {
            this.projectKey = key;
            return this;
        }

        public ProjectDTOBuilder setLeader(PublicUserDTO leader)
        {
            this.leader = leader;
            return this;
        }

        public ProjectDTOBuilder setCreationTime(LocalDateTime creationTime)
        {
            this.creationTime = creationTime;
            return this;
        }

        public ProjectDTO build() throws BuilderException
        {
            if (this.projectKey == null || this.creationTime == null || this.leader == null || this.name == null) {
                throw new BuilderException();
            }

            return new ProjectDTO(this);
        }
    }
}
