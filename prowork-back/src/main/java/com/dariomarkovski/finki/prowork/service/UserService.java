package com.dariomarkovski.finki.prowork.service;

import com.dariomarkovski.finki.prowork.model.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    public Iterable<User> getAllUsers();
}
