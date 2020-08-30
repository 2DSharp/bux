package me.twodee.bux.Model.Repository;

import me.twodee.bux.Model.Entity.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvitationRepository extends JpaRepository<Invitation, String> {
}
