package me.twodee.bux.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import me.twodee.bux.DTO.HelperValueObject.Notification;

@JsonInclude(JsonInclude.Include.NON_NULL)
public abstract class DataTransferObject
{
    protected Notification notification = new Notification();

    public Notification getNotification()
    {
        return notification;
    }

    public void setNotification(Notification notification)
    {
        this.notification = notification;
    }

    public void appendNotification(Notification notification)
    {
        this.notification.getErrors().putAll(notification.getErrors());
    }
}
