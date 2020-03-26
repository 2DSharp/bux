package me.twodee.bux.Provider;

import me.twodee.bux.Util.MessageByLocaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import javax.validation.Validator;

@Component
public class SpringHelperDependencyProvider
{
    private final Validator validator;
    private final MessageByLocaleService messageByLocaleService;
    private final Environment environment;

    @Autowired
    public SpringHelperDependencyProvider(Validator validator, MessageByLocaleService messageByLocaleService, Environment environment)
    {
        this.validator = validator;
        this.messageByLocaleService = messageByLocaleService;
        this.environment = environment;
    }

    public Validator getValidator()
    {
        return validator;
    }

    public MessageByLocaleService getMessageByLocaleService()
    {
        return messageByLocaleService;
    }

    public Environment getEnvironment()
    {
        return environment;
    }
}
