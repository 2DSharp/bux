package me.twodee.bux.DTO.Project;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import me.twodee.bux.DTO.Task.TaskDTO;
import me.twodee.bux.DTO.User.PublicUserDTO;
import me.twodee.bux.Model.Entity.Goal;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Builder
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GoalDTO {
    @Getter
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @AllArgsConstructor
    public static class Milestone {
        String milestone;
    }

    public enum Pressure {
        HIGH,
        MEDIUM,
        LOW
    }

    private int id;

    private String title;

    private LocalDate deadline;

    private String milestone;

    private String description;

    private Goal.Priority priority;

    private int progress;

    private Goal.Status status;

    private PublicUserDTO createdBy;

    private Pressure pressure;

    private Map<String, TaskDTO> tasks;

    private List<String> taskIds;

    private List<String> statusList;
}
