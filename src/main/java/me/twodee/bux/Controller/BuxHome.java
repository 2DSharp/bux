package me.twodee.bux.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BuxHome
{

    @GetMapping("/api/{*id}")
    public String msg(@PathVariable("*id") String id)
    {
        return id;
    }
}
