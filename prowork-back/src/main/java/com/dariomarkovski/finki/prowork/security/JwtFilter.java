package com.dariomarkovski.finki.prowork.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.logging.Logger;

public class JwtFilter extends GenericFilterBean {

    private static final Logger LOGGER = Logger.getLogger(JwtFilter.class.getName());

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        final HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        final String authHeader = httpServletRequest.getHeader("Authorization");
        LOGGER.info("FILTER INVOKED");
        LOGGER.info(authHeader);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new ServletException("Invalid or Missing Authorization Header");
        } else {
            String jwtToken = authHeader.substring(7);
            try {

                Algorithm algorithm = Algorithm.HMAC256("secret");
                JWTVerifier jwtVerifier = JWT.require(algorithm)
                        .withIssuer("prowork")
                        .build();
                DecodedJWT decodedJWT = jwtVerifier.verify(jwtToken);
            } catch (UnsupportedEncodingException enEx) {
                throw new ServletException("Encoding not supported");
            } catch (JWTVerificationException jwtEx) {
                throw new ServletException("JWTVerificationException");
            }
        }
        chain.doFilter(request, response);
    }
}
