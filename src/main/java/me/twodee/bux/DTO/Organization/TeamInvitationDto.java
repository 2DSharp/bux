package me.twodee.bux.DTO.Organization;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import me.twodee.bux.DTO.DataTransferObject;

import javax.validation.constraints.Email;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TeamInvitationDto extends DataTransferObject {
    List<@Email String> emails;
}
