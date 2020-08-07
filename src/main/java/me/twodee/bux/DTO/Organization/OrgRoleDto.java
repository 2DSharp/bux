package me.twodee.bux.DTO.Organization;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import me.twodee.bux.DTO.DataTransferObject;
import me.twodee.bux.DTO.User.PublicUserDTO;
import me.twodee.bux.Model.Entity.OrganizationMember;

@Builder
@JsonInclude(JsonInclude.Include.NON_EMPTY)
@Getter
public class OrgRoleDto extends DataTransferObject {
    private String orgName;
    private OrganizationMember.Role role;
    private PublicUserDTO target;
}
