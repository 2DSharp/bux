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
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Pattern(regexp = "^[a-zA-Z].*", message = "{validation.project.name.pattern}")
    @Size(min = 2, max = 50, message = "{validation.project.name.size}")
    @NotBlank(message = "{validation.project.name.empty}")
    @Column(unique = true)
    private String name;

    @Pattern(regexp = "^[A-Z][A-Z0-9]+$", message = "{validation.project.key.pattern}")
    @Size(min = 2, max = 8, message = "{validation.project.name.size}")
    @NotBlank(message = "{validation.project.name.empty}")
    @Column(unique = true)
    private String projectKey;

    @GeneratedValue
    private LocalDateTime creationTime = LocalDateTime.now();

    public Project(String name, String key)
    {
        this.name = name;
        this.projectKey = key;
    }

    public Project()
    {
    }
}
