package com.ecommerce.app.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;
import java.util.Map;

@Component
public class JWTUtil {

    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String generateToken(String username, String role) {
        return Jwts.builder()
                .setClaims(Map.of("role", role))
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + (24 * 60 * 60 * 1000))) // 1 day
                .signWith(key)
                .compact();
    }

    public String extractUsername(String token){
        return parseClaims(token).getBody().getSubject();
    }

    public String extractRole(String token){
        return (String) parseClaims(token).getBody().get("role");
    }

    public boolean isExpired(String token){
        return parseClaims(token).getBody().getExpiration().before(new Date());
    }

    public Jws<Claims> parseClaims(String token){
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
    }
}
