package me.twodee.bux.DTO.Task;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.ToString;
import me.twodee.bux.DTO.DataTransferObject;
import me.twodee.bux.Model.Entity.Task;

import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Getter
@JsonInclude(JsonInclude.Include.NON_EMPTY)
@JsonIgnoreProperties(ignoreUnknown = true)
@ToString
public class TaskCreationDTO extends DataTransferObject {

    @NotBlank(message = "{validation.task.title.empty}")
    @Size(max = 100, message = "{validation.task.title.too_long}")
    private String title;

    @Size(max = 200, message = "{validation.task.description.too_long}")
    private String description;

    @FutureOrPresent(message = "{validation.task.deadline.past}")
    private LocalDate deadline;

    private String assignee;

    private Task.Priority priority;

    private String goalId;

    @NotBlank(message = "{validation.general.project.empty}")
    private String projectKey;

    @NotBlank(message = "{validation.general.team.empty}")
    private String team;

    private String status;
}
