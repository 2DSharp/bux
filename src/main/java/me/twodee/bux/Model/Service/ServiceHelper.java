package me.twodee.bux.Model.Service;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.jpa.repository.JpaRepository;


public abstract class ServiceHelper
{
    // TODO: Find a more elegant implementation
    public static <T> Object safeSaveToRepository(JpaRepository repository, T entity, Runnable handler)
    {
        // This is mainly for race conditions, uniqueness should be checked above beforehand.
        // If we have to get the offending field and the cause, we need to parse the error string
        // Can't do it while being DB-agnostic, let it fail with a generic message, let the user try again
        // Can show the proper error then
        try {
            return repository.save(entity);
        } catch (DataIntegrityViolationException e) {
            handler.run();
        }

        return null;
    }
}
