package me.twodee.bux.Model.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Entity
public class StatusTaskList {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;

    @ElementCollection
    @OrderColumn(name = "column_task_order")
    List<String> tasks = new ArrayList<>();

    public StatusTaskList(List<String> tasks) {
        this.tasks = tasks;
    }
}
