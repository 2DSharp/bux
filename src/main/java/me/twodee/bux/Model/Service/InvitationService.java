package me.twodee.bux.Model.Service;

import me.twodee.bux.Component.Mailer.TeamInvitation;
import me.twodee.bux.Interface.Mailer;
import me.twodee.bux.Model.Entity.Invitation;
import me.twodee.bux.Model.Repository.InvitationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class InvitationService {
    private InvitationRepository repository;
    Mailer mailer;

    @Autowired
    public InvitationService(InvitationRepository repository, Mailer mailer) {
        this.repository = repository;
        this.mailer = mailer;
    }

    public void sendInvitation(List<Invitation> invitations) {
        mailer.sendInvitationMail(invitations.stream().map(this::createDto).collect(Collectors.toList()), "");
        repository.saveAll(invitations);
    }

    private TeamInvitation createDto(Invitation invitation) {
        return TeamInvitation.builder()
                .email(invitation.getEmail())
                .team(invitation.getOrganization().getName())
                .token(invitation.getToken())
                .build();
    }
}
