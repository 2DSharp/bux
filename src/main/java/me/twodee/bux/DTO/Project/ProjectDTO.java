package me.twodee.bux.DTO.Project;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import me.twodee.bux.DTO.DataTransferObject;
import me.twodee.bux.DTO.User.PublicUserDTO;

import java.time.LocalDateTime;

@Builder
@JsonInclude(JsonInclude.Include.NON_EMPTY)
@Getter
public class ProjectDTO extends DataTransferObject
{
    private final LocalDateTime creationTime;
    private final String name;
    private final String projectKey;
    private final PublicUserDTO leader;
}
