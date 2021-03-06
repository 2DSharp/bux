package me.twodee.bux.Util;

import me.twodee.bux.Interface.ThrowingFunction;

import java.nio.ByteBuffer;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
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

    public static <T> List<T> dragAndDrop(List<T> list, int source, int destination) {
        List<T> updated = new ArrayList<>(list);
        T value = updated.remove(source);
        updated.add(destination, value);
        return updated;
    }
    public static byte[] getBytesFromUUID(UUID uuid) {
        ByteBuffer bb = ByteBuffer.wrap(new byte[16]);
        bb.putLong(uuid.getMostSignificantBits());
        bb.putLong(uuid.getLeastSignificantBits());

        return bb.array();
    }
}
