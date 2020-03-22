package me.twodee.bux.Model.Entity;

import org.hibernate.validator.constraints.Length;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
public class Project
{
    @Id
    private int id;

    @NotNull(message = "Project name can't be empty")
    @Length(max = 255, message = "Project name has to be between 0 to 255 characters")
    private String name;

    @GeneratedValue
    private LocalDateTime creationTime;

    @Transient
    private User projectLead;
}
