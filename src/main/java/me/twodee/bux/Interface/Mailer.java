package me.twodee.bux.Interface;

import me.twodee.bux.Component.Mailer.TeamInvitation;

import java.util.List;

public interface Mailer {
    public void sendInvitationMail(List<TeamInvitation> invitations, Object data);
}
