package me.twodee.bux.Provider;

import me.twodee.bux.Util.MessageByLocaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.validation.Validator;

@Component
public class LocaleMessagingValidationProvider
{
    private final Validator validator;
    private final MessageByLocaleService messageByLocaleService;

    @Autowired
    public LocaleMessagingValidationProvider(Validator validator, MessageByLocaleService messageByLocaleService)
    {
        this.validator = validator;
        this.messageByLocaleService = messageByLocaleService;
    }

    public Validator getValidator()
    {
        return validator;
    }

    public MessageByLocaleService getMessageByLocaleService()
    {
        return messageByLocaleService;
    }
}
