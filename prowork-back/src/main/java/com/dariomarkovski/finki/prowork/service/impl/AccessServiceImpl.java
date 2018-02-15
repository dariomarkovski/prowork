package com.dariomarkovski.finki.prowork.service.impl;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.dariomarkovski.finki.prowork.model.User;
import com.dariomarkovski.finki.prowork.repository.UserDao;
import com.dariomarkovski.finki.prowork.service.AccessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import javax.servlet.ServletException;
import java.io.UnsupportedEncodingException;
import java.util.Date;

@Service
public class AccessServiceImpl implements AccessService {

    UserDao userDao;

    @Autowired
    public AccessServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public User registerUser(User user) throws ServletException {
        user.setDateCreated(new Date());
        User userByUsername = userDao.findByUsername(user.getUsername());
        User userByEmail = userDao.findByEmail(user.getEmail());
        if (userByUsername != null) {
            throw new ServletException("Username is already taken");
        } else if (userByEmail != null) {
            throw new ServletException("Email is already taken");
        } else {
            String plain = user.getPassword();
            String hashed = BCrypt.hashpw(plain, BCrypt.gensalt());
            user.setPassword(hashed);
            return userDao.save(user);
        }
    }

    @Override
    public String loginUser(User login) throws ServletException, UnsupportedEncodingException {
        String jwtToken = "";
        String username = login.getUsername();
        String plainPassword = login.getPassword();
        if (username == null || username.trim().equals("") || plainPassword  == null) {
            throw new ServletException("Please fill in username and password");
        }
        User user = userDao.findByUsername(username);
        if (user == null) {
            throw new ServletException("No such user");
        } else {
            String hashed = user.getPassword();
            if (!BCrypt.checkpw(plainPassword, hashed)) {
                throw new ServletException("Wrong password");
            } else {
                Algorithm algorithm = Algorithm.HMAC256("secret");
                jwtToken = JWT.create()
                        .withIssuer("prowork")
                        .withIssuedAt(new Date())
                        .withClaim("username", username)
                        .sign(algorithm);
            }

        }
        return jwtToken;
    }

    @Override
    public String getUsernameFromJwtToken(String jwtToken) {
        DecodedJWT jwt = JWT.decode(jwtToken);
        Claim username = jwt.getClaim("username");
        return username.asString();
    }
}
