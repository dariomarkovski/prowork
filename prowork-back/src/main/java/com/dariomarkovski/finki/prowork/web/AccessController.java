package com.dariomarkovski.finki.prowork.web;

import com.dariomarkovski.finki.prowork.model.User;
import com.dariomarkovski.finki.prowork.service.AccessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import java.io.UnsupportedEncodingException;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/access", produces = MediaType.ALL_VALUE)
@CrossOrigin
public class AccessController {

    AccessService accessService;

    @Autowired
    public AccessController(AccessService accessService) {
        this.accessService = accessService;
    }

    @PostMapping(value = "/register")
    public User registerUser(@ModelAttribute User user) throws ServletException {
        return accessService.registerUser(user);
    }

    @PostMapping(value = "/login")
    public String loginUser(@ModelAttribute User login) throws ServletException, UnsupportedEncodingException {
        return accessService.loginUser(login);
    }

    @PostMapping(value = "/verify_jwt")
    public Boolean verifyJwtToken(@RequestBody String jwtToken) {
        return true;
    }
}
