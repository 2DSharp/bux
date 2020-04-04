package me.twodee.bux.DTO.Project;

import lombok.Getter;
import me.twodee.bux.DTO.DataTransferObject;

@Getter
public class ProjectDTO extends DataTransferObject
{
    private String name;
    private String key;

    public ProjectDTO(String name, String key)
    {
        this.name = name;
        this.key = key;
    }

    public ProjectDTO() {}

}
