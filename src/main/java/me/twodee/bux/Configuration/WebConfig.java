package me.twodee.bux.Configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * This will be excluded from the production build
 * This is only for enabling CORS to work with react for development
 */
@Configuration
public class WebConfig implements WebMvcConfigurer
{
    /**
     * Add cors for development with react server on 3000
     * @param registry Cors registry mappings
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowCredentials(true)
                .maxAge(3600)
                .allowedOrigins("http://localhost:3000");
    }
}

