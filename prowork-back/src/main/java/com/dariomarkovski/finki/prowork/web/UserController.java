package com.dariomarkovski.finki.prowork.web;

import com.dariomarkovski.finki.prowork.model.User;
import com.dariomarkovski.finki.prowork.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/user", produces = MediaType.ALL_VALUE)
@CrossOrigin
public class UserController {

    UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/getAll")
    public Iterable<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
