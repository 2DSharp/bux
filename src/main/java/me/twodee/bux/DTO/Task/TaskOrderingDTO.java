package me.twodee.bux.DTO.Task;

import lombok.Getter;
import lombok.Setter;
import me.twodee.bux.DTO.DataTransferObject;

@Setter
@Getter
public class TaskOrderingDTO extends DataTransferObject {
    private int source;
    private int destination;
    private String goalId;
    private String status;
    private String sourceStatus;
    private String destinationStatus;
    private String taskId;
}
