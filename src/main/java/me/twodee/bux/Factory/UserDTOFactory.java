package me.twodee.bux.Factory;

import me.twodee.bux.DTO.User.PublicUserDTO;
import me.twodee.bux.Model.Entity.User;

public class UserDTOFactory
{
    public static PublicUserDTO buildPublicUser(User user)
    {
        if (user == null) {
            return null;
        }
        return new PublicUserDTO(user.getId(), user.getName(), user.getUsername());
    }
}
