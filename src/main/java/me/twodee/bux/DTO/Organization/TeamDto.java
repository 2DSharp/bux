package me.twodee.bux.DTO.Organization;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class TeamDto {
    private String name;
    private String image;
    private String description;
}
