package me.twodee.bux.DTO.Project;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import me.twodee.bux.DTO.DataTransferObject;

import java.time.LocalDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
public class ProjectDTO extends DataTransferObject
{
    private final LocalDateTime creationTime;
    private final String name;
    private final String projectKey;

    public ProjectDTO(String name, String projectKey, LocalDateTime creationTime)
    {
        this.name = name;
        this.projectKey = projectKey;
        this.creationTime = creationTime;
    }

}
