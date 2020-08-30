package me.twodee.bux.Component.Mailer;

import me.twodee.bux.Interface.Mailer;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DummyMailer implements Mailer {

    @Override
    public void sendInvitationMail(List<TeamInvitation> invitations, Object template) {
        invitations.forEach(invitation -> System.out.println(invitation.email + " " + invitation.token));
    }
}
