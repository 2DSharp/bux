package me.twodee.bux.Model.Entity;

import javax.persistence.*;

@Entity
public class ProjectMember {

    public enum Role {
        CONTRIBUTOR, // Can add, modify and delete tasks on assigned goals
        MODERATOR, // Can manage users, create and end goals
        MANAGER // Can change project details, manage moderators
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    User member;

    @ManyToOne
    Project project;
}
