package me.twodee.bux.Factory;

import me.twodee.bux.DTO.HelperValueObject.Error;
import me.twodee.bux.DTO.HelperValueObject.Notification;
import me.twodee.bux.Util.MessageByLocaleService;

public class NotificationFactory
{
    public static Notification createErrorNotification(String key, String errorMsg)
    {
        Notification notification = new Notification();
        notification.addError(new Error(key, errorMsg));
        return notification;
    }

    public static Notification createAmbiguousErrorNotification(MessageByLocaleService localeService)
    {

        Notification notification = new Notification();
        notification.addError(
                new Error("global", localeService.getMessage("validation.exception")));
        return notification;
    }
}
