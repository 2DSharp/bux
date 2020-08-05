package me.twodee.bux.Model.Entity;

import javax.persistence.*;

@Entity
public class OrganizationMember {
    public enum Role {
        READ, // Can view and track the organization
        WRITE, // Can contribute to projects
        ADMIN, // Can add, remove users
        OWNER, // Can assign admins, modify organization
    }
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int id;

    @ManyToOne
    private Organization organization;

    @ManyToOne
    private User user;


}
