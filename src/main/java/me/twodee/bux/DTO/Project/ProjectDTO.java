package me.twodee.bux.DTO.Project;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import me.twodee.bux.DTO.DataTransferObject;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
public class ProjectDTO extends DataTransferObject
{
    private String name;
    private String projectKey;

    public ProjectDTO(String name, String projectKey)
    {
        this.name = name;
        this.projectKey = projectKey;
    }

    public ProjectDTO() {}
}
