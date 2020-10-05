package me.twodee.bux.Model.Service;

import lombok.Getter;
import lombok.Setter;
import me.twodee.bux.Component.Mailer.TeamInvitation;
import me.twodee.bux.Interface.Mailer;
import me.twodee.bux.Model.Entity.Invitation;
import me.twodee.bux.Model.Repository.InvitationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static me.twodee.bux.Util.CryptoUtil.generateId;

@Service
public class InvitationService {
    private InvitationRepository repository;
    Mailer mailer;

    @Setter
    @Getter
    static class Notifier {
        boolean hasActiveInvitation = false;
    }

    @Autowired
    public InvitationService(InvitationRepository repository, Mailer mailer) {
        this.repository = repository;
        this.mailer = mailer;
    }

    public void sendInvitation(List<Invitation> invitations) {
        List<Invitation> activeInvitations = repository.findByIdOrganizationAndCreatedAtGreaterThan(
                invitations.get(0).getId().getOrganization(), LocalDateTime.now().minusHours(48));
        Notifier notifier = new Notifier();
        invitations = invitations.stream()
                .filter(e -> invitationIsNotOld(e, activeInvitations, notifier))
                .map(this::addToken)
                .collect(Collectors.toList());

        mailer.sendInvitationMail(invitations.stream().map(this::createDto).collect(Collectors.toList()), "");

        repository.saveAll(invitations);

        if (notifier.hasActiveInvitation) {
            // redundant -> notify up
        }
    }

    private Invitation addToken(Invitation invitation) {
        invitation.setToken(generateId());
        return invitation;
    }

    private boolean invitationIsNotOld(Invitation invitation, List<Invitation> activeInvitations, Notifier notifier) {
        boolean result = activeInvitations.stream().anyMatch(e -> e.getId().getEmail().equals(invitation.getId().getEmail()));
        if (result) {
            notifier.setHasActiveInvitation(true);
        }

        return !result;
    }

    private TeamInvitation createDto(Invitation invitation) {
        return TeamInvitation.builder()
                .email(invitation.getId().getEmail())
                .team(invitation.getId().getOrganization())
                .token(invitation.getToken())
                .build();
    }
}
