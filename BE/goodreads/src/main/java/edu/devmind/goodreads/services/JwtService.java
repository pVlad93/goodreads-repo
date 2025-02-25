package edu.devmind.goodreads.services;

import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.impl.DefaultClaims;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.accessTokenValidityMS}")
    private int jwtExpirationMs;

    public String createToken(String username, Integer userId) {
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());

        return Jwts.builder()
                .header().and()
                .subject(username)
                .claim("userId", userId)
                .issuedAt(new Date())
                .expiration(new Date(new Date().getTime() + jwtExpirationMs))
                .signWith(key)
                .compact();
    }

    public String validateToken(String token) {
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());

        JwtParser parser = Jwts.parser()
                .verifyWith(key)
                .build();

        try {
            Jwt<?, ?> jwt = parser.parse(token.substring(token.indexOf(" ") + 1));
            return ((DefaultClaims) jwt.getPayload()).getSubject();
        } catch (Exception e) {
            throw new UsernameNotFoundException("Invalid token");
        }
    }
}
