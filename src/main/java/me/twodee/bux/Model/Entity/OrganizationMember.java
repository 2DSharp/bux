package me.twodee.bux.Model.Entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrganizationMember {
    public enum Role {
        READ(1), // Can view and track the organization
        WRITE(2), // Can contribute to projects
        ADMIN(3), // Can add, remove users, create projects
        OWNER(4); // Can assign admins, modify organization
        public final int level;
        private Role(int level) {
            this.level = level;
        }
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

    @ManyToOne
    private User assignedBy;
}
