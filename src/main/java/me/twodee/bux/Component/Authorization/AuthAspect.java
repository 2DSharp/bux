package me.twodee.bux.Component.Authorization;

import me.twodee.bux.Model.Service.AccountService;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpSession;

@Aspect
@Configuration
public class AuthAspect {

    AccountService auth;

    @Autowired
    public AuthAspect(AccountService auth) {
        this.auth = auth;
    }

    @Around("@annotation(me.twodee.bux.Component.Authorization.RequireLogin)")
    public Object checkRequireLogin(ProceedingJoinPoint joinPoint) throws Throwable {
        if (!auth.isLoggedIn((HttpSession) joinPoint.getArgs()[0])) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return joinPoint.proceed();
    }
}