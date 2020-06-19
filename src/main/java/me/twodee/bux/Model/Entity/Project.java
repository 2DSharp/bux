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

    @Pattern(regexp = "^[a-zA-Z].*", message = "{validation.project.name.pattern}")
    @Size(min = 2, max = 50, message = "{validation.project.name.size}")
    @NotBlank(message = "{validation.project.name.empty}")
    @Column(unique = true)
    private String name;

    @Id
    @Pattern(regexp = "^[A-Z][A-Z0-9]+$", message = "{validation.project.key.pattern}")
    @Size(min = 2, max = 8, message = "{validation.project.key.size}")
    @NotBlank(message = "{validation.project.key.empty}")
    @Column(unique = true)
    private String projectKey;

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
