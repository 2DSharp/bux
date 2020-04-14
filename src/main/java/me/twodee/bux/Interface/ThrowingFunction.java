package me.twodee.bux.Interface;

@FunctionalInterface
public interface ThrowingFunction<T, R, E extends Throwable>
{
    R apply(T var1) throws E;
}