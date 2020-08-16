package me.twodee.bux.Model.Entity;

import lombok.Getter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Getter
public class Project
{

    @Column(unique = true)
    private String name;

    @Id
    @Column(unique = true)
    private String projectKey;

    @ManyToOne
    private Organization organization;

    @ManyToOne
    private User leader;

    @GeneratedValue
    private final LocalDateTime creationTime = LocalDateTime.now();

    public Project(String name, String key, User leader) {
        this.name = name;
        this.projectKey = key.toUpperCase();
        this.leader = leader;
    }

    public Project(String key) {
        this.projectKey = key.toUpperCase();
    }

    public Project() {
    }
}
