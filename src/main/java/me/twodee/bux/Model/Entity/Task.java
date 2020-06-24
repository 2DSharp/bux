package me.twodee.bux.Model.Entity;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@ToString
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Task {

    public enum Priority {
        LOW,
        MEDIUM,
        HIGH
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "task_seq")
    @GenericGenerator(
            name = "task_seq",
            strategy = "me.twodee.bux.Util.TaskIdGenerator")
    private String id;

    @NotNull
    private String title;

    private LocalDate deadline;

    @Builder.Default
    private final LocalDate createdAt = LocalDate.now();

    private String description;

    @Builder.Default
    private Priority priority = Priority.MEDIUM;

    @ManyToOne
    private Project project;

    @ManyToOne
    private User assignee;

    @NotNull
    @ManyToOne
    private User createdBy;

    @NotNull
    private String status;
}
