package me.twodee.bux.Model.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Goal {
    public enum Priority {
        LOW,
        MEDIUM,
        HIGH
    }

    public enum Status {
        PLANNING,
        ACTIVE,
        COMPLETED,
        ABANDONED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String title;

    private LocalDate deadline;

    private final LocalDate createdAt = LocalDate.now();

    private String milestone;

    private String description;

    @Builder.Default
    private Status status = Status.PLANNING;

    @Builder.Default
    private int progress = 0;

    @Builder.Default
    private Priority priority = Priority.MEDIUM;

    @ManyToOne
    private Project project;

    @ManyToOne
    private User createdBy;

    @OneToMany
    private List<Task> tasks;

}
