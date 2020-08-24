package me.twodee.bux.Model.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
public class TaskSequence {

    @Id
    String sequenceId;

    int lastTaskId;


    public TaskSequence(Project.ProjectId projectId) {
        sequenceId = projectId.getOrganizationId() + "_" + projectId.getProjectKey();
    }
}
