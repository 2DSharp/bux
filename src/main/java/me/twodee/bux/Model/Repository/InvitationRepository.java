package me.twodee.bux.Model.Repository;

import me.twodee.bux.Model.Entity.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface InvitationRepository extends JpaRepository<Invitation, String> {
    List<Invitation> findByIdOrganizationAndCreatedAtGreaterThan(String org, LocalDateTime timeDifference);
}
