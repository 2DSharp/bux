package me.twodee.bux.DTO.Project;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import me.twodee.bux.DTO.DataTransferObject;
import me.twodee.bux.Model.Entity.Goal;

import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Builder
@JsonInclude(JsonInclude.Include.NON_EMPTY)
@Getter
public class GoalCreationDTO extends DataTransferObject {

    @NotBlank(message = "{validation.goal.project.empty}")
    private final String projectKey;

    @NotBlank(message = "{validation.goal.team.empty}")
    public String team;

    @NotBlank(message = "{validation.goal.title.empty}")
    @Size(max = 80, message = "{validation.goal.title.too_long}")
    private final String title;

    @Size(max = 200, message = "{validation.goal.description.too_long}")
    private final String description;

    @FutureOrPresent(message = "{validation.goal.deadline.past}")
    private final LocalDate deadline;

    @Size(max = 15, message = "{validation.goal.milestone.too_long}")
    private final String milestone;

    private final Goal.Priority priority;
}
