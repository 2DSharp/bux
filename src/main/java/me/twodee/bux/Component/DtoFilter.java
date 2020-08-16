package me.twodee.bux.Component;

import me.twodee.bux.DTO.DataTransferObject;
import me.twodee.bux.DTO.HelperValueObject.Error;
import me.twodee.bux.DTO.HelperValueObject.Notification;
import me.twodee.bux.Util.DomainToDTOConverter;

import javax.validation.Validator;
import java.util.function.Predicate;

public class DtoFilter<T extends DataTransferObject> {
    private final T dto;
    private boolean chainBlocked = false;
    private Notification notification;
    private DtoFilter(T dto) {
        notification = new Notification();
        this.dto = dto;
    }

    public static <T extends DataTransferObject> DtoFilter<T> start(T object) {
        return new DtoFilter<>(object);
    }

    public DtoFilter<T> validate(Validator validator) {
        if (!chainBlocked) {
            var violations = validator.validate(dto);
            if (!violations.isEmpty()) {
                notification = (DomainToDTOConverter.convert(violations));
                chainBlocked = true;
            }
        }
        return this;
    }

    private void filter(Predicate<? super T> predicate, Error error, boolean block) {
        if (!predicate.test(dto)) {
            notification.addError(error);
            chainBlocked = block;
        }
    }

    public DtoFilter<T> addFilter(Predicate<? super T> predicate, Error error) {
        if (!chainBlocked) {
            filter(predicate, error, true);
        }
        return this;
    }

    public DtoFilter<T> appendFilter(Predicate<? super T> predicate, Error error) {
        if (!chainBlocked) {
            filter(predicate, error, false);
        }
        return this;
    }

    public T getDtoWithErrors() {
        T copy = dto;
        copy.setNotification(notification);
        return copy;
    }

    public Notification getNotification() {
        return notification;
    }
}
