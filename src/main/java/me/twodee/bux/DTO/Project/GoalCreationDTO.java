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
    private String projectKey;

    @NotBlank(message = "{validation.goal.title.empty}")
    @Size(max = 80, message = "{validation.goal.title.too_long}")
    private String title;

    @Size(max = 200, message = "{validation.goal.description.too_long}")
    private String description;

    @FutureOrPresent(message = "{validation.goal.deadline.past}")
    private LocalDate deadline;

    @Size(max = 15, message = "{validation.goal.milestone.too_long}")
    private String milestone;

    private Goal.Priority priority;
}
