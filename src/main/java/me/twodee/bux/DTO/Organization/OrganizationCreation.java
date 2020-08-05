package me.twodee.bux.DTO.Organization;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import me.twodee.bux.DTO.DataTransferObject;

@Builder
@JsonInclude(JsonInclude.Include.NON_EMPTY)
@Getter
public class OrganizationCreation extends DataTransferObject {
    private String name;
}
