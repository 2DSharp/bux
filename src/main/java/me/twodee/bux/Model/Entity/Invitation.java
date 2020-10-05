package me.twodee.bux.Model.Entity;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Invitation {
    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class InvitationId implements Serializable {
        public String email;
        public String organization;
    }
    @EmbeddedId
    @Column(length = 255)
    private InvitationId id;

    @ManyToOne
    private User invitedBy;


    @Setter
    private String token;

    private final LocalDateTime createdAt = LocalDateTime.now();

}
