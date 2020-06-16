package me.twodee.bux.Util;

import me.twodee.bux.Interface.ThrowingFunction;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.function.Function;

public class BaseUtil
{
    public static <T, R> Function<T, R> throwingFunctionWrapper(
            ThrowingFunction<T, R, Throwable> throwingFunction) {
        return i -> {
            try {
                return throwingFunction.apply(i);
            } catch (Throwable ex) {
                throw new RuntimeException(ex);
            }
        };
    }

    public static LocalDateTime strToLocalDateTime(String dateString) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        return LocalDateTime.parse(dateString, formatter);
    }

    public static String localDateTimeToStr(LocalDateTime dateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        return dateTime.format(formatter);
    }
}
