package me.twodee.bux.DTO.Project;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import me.twodee.bux.DTO.DataTransferObject;
import me.twodee.bux.Model.Entity.Goal;

import java.time.LocalDate;

@Builder
@JsonInclude(JsonInclude.Include.NON_EMPTY)
@Getter
public class GoalCreationDTO extends DataTransferObject {
    private String projectKey;
    private String title;

    private LocalDate deadline;
    private String milestone;
    private Goal.Priority priority;
}
