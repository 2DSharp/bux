package me.twodee.bux.DTO.Project;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import me.twodee.bux.Model.Entity.StatusTaskList;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StatusTaskListDTO {
    List<String> taskIds = new ArrayList<>();

    public StatusTaskListDTO(StatusTaskList domainList) {
        this.taskIds = domainList.getTasks();
    }
}
