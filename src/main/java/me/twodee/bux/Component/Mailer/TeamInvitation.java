package me.twodee.bux.Component.Mailer;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class TeamInvitation {
    String email;
    String token;
    String team;
}
