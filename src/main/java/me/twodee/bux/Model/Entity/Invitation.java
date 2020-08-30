package me.twodee.bux.Model.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Invitation {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "invitation_id")
    @GenericGenerator(
            name = "invitation_id",
            strategy = "me.twodee.bux.Util.UniqueIdGenerator")
    String id;

    @ManyToOne
    private Organization organization;

    @ManyToOne
    private User invitedBy;

    private String email;

    private String token;

}
