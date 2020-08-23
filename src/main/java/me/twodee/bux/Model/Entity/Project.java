package me.twodee.bux.Model.Entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
public class Project
{
    @Embeddable
    @NoArgsConstructor
    @Data
    public static class ProjectId implements Serializable {
        private String projectKey;

        private String organizationId;

        public ProjectId(String projectKey, Organization organization) {
            this.projectKey = projectKey.toUpperCase();
            this.organizationId = organization.getName();
        }

        public ProjectId(String projectKey, String orgId) {
            this.projectKey = projectKey.toUpperCase();
            this.organizationId = orgId;
        }
    }

    @Column(unique = true)
    private String name;

    @EmbeddedId
    @Column(length = 100)
    private ProjectId id;

    @ManyToOne
    private User leader;

    @GeneratedValue
    private final LocalDateTime creationTime = LocalDateTime.now();

    public Project(ProjectId id) {
        this.id = id;
    }
    public Project() {
    }
}
