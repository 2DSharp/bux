package me.twodee.bux.DTO.Project;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class GoalsList {

    private final String projectKey;
    List<GoalDTO> goals;
}
