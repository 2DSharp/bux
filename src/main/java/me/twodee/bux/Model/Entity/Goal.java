package me.twodee.bux.Model.Entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
public class Goal {
    public enum Priority {
        LOW,
        MEDIUM,
        HIGH
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String title;

    private LocalDateTime deadline;
    private String milestone;
    private Priority priority = Priority.MEDIUM;

    @ManyToOne
    private Project project;

    @ManyToOne
    private User createdBy;
}
