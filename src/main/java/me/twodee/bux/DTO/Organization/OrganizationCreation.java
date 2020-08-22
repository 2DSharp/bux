package me.twodee.bux.DTO.Organization;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import me.twodee.bux.DTO.DataTransferObject;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Builder
@JsonInclude(JsonInclude.Include.NON_EMPTY)
@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrganizationCreation extends DataTransferObject {

    @Size(min = 3, max = 16, message = "{validation.team.name.size}")
    @Pattern(regexp = "^[A-Za-z0-9][a-zA-Z0-9_.-]*$", message = "{validation.team.name.pattern}")
    @NotBlank(message = "{validation.team.name.empty}")
    private String name;

    @Size( max = 140, message = "{validation.team.name.size}")
    private String description;
}
