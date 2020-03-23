package me.twodee.bux.DTO;

import me.twodee.bux.DTO.HelperValueObject.Notification;

public abstract class DataTransferObject
{
    protected Notification notification;

    public Notification getNotification()
    {
        if (notification == null) {
            return new Notification();
        }
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
