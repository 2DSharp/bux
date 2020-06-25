package me.twodee.bux.DTO.Task;

import lombok.Getter;
import lombok.Setter;
import me.twodee.bux.DTO.DataTransferObject;

@Setter
@Getter
public class TaskOrderingDTO extends DataTransferObject {
    private int source;
    private int destination;
    private int goalId;
}
