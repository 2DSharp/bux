package me.twodee.bux.Model.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@NoArgsConstructor
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

    @NotNull
    private Role role;

    public OrganizationMember(Organization organization, User user, @NotNull Role role) {
        this.organization = organization;
        this.user = user;
        this.role = role;
    }
}
