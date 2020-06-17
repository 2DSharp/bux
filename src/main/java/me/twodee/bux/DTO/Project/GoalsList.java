package me.twodee.bux.DTO.Project;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
@Getter
@AllArgsConstructor
public class GoalsList {

    private final String projectKey;
    List<GoalDTO> goals;
}
