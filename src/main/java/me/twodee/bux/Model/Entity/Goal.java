package me.twodee.bux.Model.Entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Entity
@Getter
@Setter
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
    private String id;

    private String title;

    private LocalDate deadline;

    private final LocalDate createdAt = LocalDate.now();

    private String milestone;

    private String description;

    @Builder.Default
    @ElementCollection
    private List<String> statuses = List.of("To Do", "In Progress", "Completed");

    @Builder.Default
    private Status status = Status.PLANNING;

    @Builder.Default
    private Priority priority = Priority.MEDIUM;

    @ManyToOne
    private Project project;

    @ManyToOne
    private User createdBy;

    @OneToMany
    @OrderColumn(name = "tasks_order")
    private List<Task> tasks = new ArrayList<>();

    @Builder.Default
    @OneToMany(cascade = CascadeType.ALL)
    Map<String, StatusTaskList> taskStatusMap = Map.of("To Do", new StatusTaskList(),
                                                       "In Progress", new StatusTaskList(),
                                                       "Completed", new StatusTaskList());

    private LocalDateTime startedAt;

    @OneToOne
    private User startedBy;

    private LocalDateTime endedAt;

    @OneToOne
    private User endedBy;
}
