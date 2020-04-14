package me.twodee.bux.Util;

import me.twodee.bux.Interface.ThrowingFunction;

import java.util.function.Function;

public class BaseUtil
{
    public static <T, R> Function<T, R> throwingFunctionWrapper(
            ThrowingFunction<T, R, Throwable> throwingFunction)
    {
        return i -> {
            try {
                return throwingFunction.apply(i);
            } catch (Throwable ex) {
                throw new RuntimeException(ex);
            }
        };
    }
}
