package me.twodee.bux.DTO.Project;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import me.twodee.bux.DTO.DataTransferObject;
import me.twodee.bux.DTO.User.PublicUserDTO;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Builder
@JsonInclude(JsonInclude.Include.NON_EMPTY)
@Getter
public class ProjectDTO extends DataTransferObject {

    private final LocalDateTime creationTime;

    @Pattern(regexp = "^[a-zA-Z].*", message = "{validation.project.name.pattern}")
    @Size(min = 2, max = 50, message = "{validation.project.name.size}")
    @NotBlank(message = "{validation.project.name.empty}")
    private final String name;

    @Pattern(regexp = "^[A-Z][A-Z0-9]+$", message = "{validation.project.key.pattern}")
    @Size(min = 2, max = 8, message = "{validation.project.key.size}")
    @NotBlank(message = "{validation.project.key.empty}")
    private final String projectKey;

    private final PublicUserDTO leader;

    private final String org;
}
