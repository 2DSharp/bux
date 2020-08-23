package me.twodee.bux.DTO.Task;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import me.twodee.bux.DTO.DataTransferObject;
import me.twodee.bux.DTO.User.PublicUserDTO;
import me.twodee.bux.Factory.UserDTOFactory;
import me.twodee.bux.Model.Entity.Task;

import java.time.LocalDate;

@Setter
@Getter
@Builder
public class TaskDTO extends DataTransferObject {

    String id;
    String projectKey;
    String team;
    String title;
    String description;
    LocalDate createdAt;
    LocalDate deadline;
    Task.Priority priority;
    PublicUserDTO assignee;
    PublicUserDTO createdBy;
    String status;

    public static TaskDTO build(Task task) {
        return TaskDTO.builder()
                .id(task.getId())
                .projectKey(task.getProject().getId().getProjectKey())
                .team(task.getProject().getId().getOrganizationId())
                .title(task.getTitle())
                .description(task.getDescription())
                .createdAt(task.getCreatedAt())
                .deadline(task.getDeadline())
                .priority(task.getPriority())
                .assignee(UserDTOFactory.buildPublicUser(task.getAssignee()))
                .createdBy(UserDTOFactory.buildPublicUser(task.getCreatedBy()))
                .status(task.getStatus())
                .build();
    }
}
