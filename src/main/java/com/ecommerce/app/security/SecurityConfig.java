package com.ecommerce.app.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth

                // Auth APIs
                .requestMatchers("/api/auth/**").permitAll()

                // Static frontend files
                .requestMatchers(
                    "/",
                    "/**/*.html",
                    "/**/*.css",
                    "/**/*.js"
                ).permitAll()

                // Products (open for now)
                .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/products/**").permitAll()
                .requestMatchers(HttpMethod.PUT, "/api/products/**").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/api/products/**").permitAll()

                // Everything else (open for now)
                .anyRequest().permitAll()
            );

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }
}
