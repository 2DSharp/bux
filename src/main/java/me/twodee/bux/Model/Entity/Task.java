package me.twodee.bux.Model.Entity;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;

@ToString
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Task {

    public enum Priority {
        LOW,
        MEDIUM,
        HIGH
    }
    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TaskId implements Serializable {
        public String taskKey;
        public Project.ProjectId projectId;

        public TaskId(Project.ProjectId id, TaskSequence nextSequence) {
            taskKey = id.getProjectKey() + "-" + nextSequence.getLastTaskId();
            projectId = id;
        }
    }
    @EmbeddedId
    @Column(length = 255)
    private TaskId id;

    public Task(TaskId id) {
        this.id = id;
    }

    @NotNull
    private String title;

    private LocalDate deadline;

    @Builder.Default
    private LocalDate createdAt = LocalDate.now();

    private String description;

    @Builder.Default
    private Priority priority = Priority.MEDIUM;

    @ManyToOne
    private User assignee;

    @NotNull
    @ManyToOne
    private User createdBy;

    @NotNull
    private String status;
}
