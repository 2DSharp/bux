package me.twodee.bux.DTO.User;

import lombok.Getter;
import me.twodee.bux.DTO.DataTransferObject;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
public class UserLoginDTO extends DataTransferObject
{
    @NotBlank(message = "{validation.login.identifier.invalid}")
    @Size(min = 3, max = 255, message = "{validation.login.identifier.invalid}")
    private String identifier;

    @NotBlank(message = "{validation.login.password.invalid}")
    private String password;

    public UserLoginDTO(@NotBlank @Size(min = 3) String identifier, @NotBlank @Size(min = 8) String password)
    {
        this.identifier = identifier;
        this.password = password;
    }
}
