package com.dariomarkovski.finki.prowork.service;

import com.dariomarkovski.finki.prowork.model.User;
import org.springframework.stereotype.Service;

import javax.servlet.ServletException;
import java.io.UnsupportedEncodingException;

@Service
public interface AccessService {
    public User registerUser(User user) throws ServletException;

    public String loginUser(User login) throws ServletException, UnsupportedEncodingException;

    public String getUsernameFromJwtToken(String jwtToken);
}
