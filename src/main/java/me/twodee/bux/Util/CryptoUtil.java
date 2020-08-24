package me.twodee.bux.Util;

import org.springframework.security.crypto.bcrypt.BCrypt;

import java.util.Base64;
import java.util.UUID;

import static me.twodee.bux.Util.BaseUtil.getBytesFromUUID;

public class CryptoUtil
{
    public static String hashPassword(String password)
    {
        return BCrypt.hashpw(password, BCrypt.gensalt(12));
    }

    public static boolean verifyPassword(String password, String hash)
    {
        return BCrypt.checkpw(password, hash);
    }

    public static String generateId() {
        return Base64.getEncoder().withoutPadding().encodeToString(getBytesFromUUID(UUID.randomUUID()));
    }
}
