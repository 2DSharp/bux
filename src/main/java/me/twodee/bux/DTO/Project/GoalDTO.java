package me.twodee.bux.DTO.Project;

import lombok.Builder;
import lombok.Getter;
import me.twodee.bux.DTO.User.PublicUserDTO;
import me.twodee.bux.Model.Entity.Goal;

import java.time.LocalDate;

@Builder
@Getter
public class GoalDTO {
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
}
