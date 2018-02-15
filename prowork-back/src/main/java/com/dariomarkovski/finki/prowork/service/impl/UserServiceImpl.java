package com.dariomarkovski.finki.prowork.service.impl;

import com.dariomarkovski.finki.prowork.model.User;
import com.dariomarkovski.finki.prowork.repository.UserDao;
import com.dariomarkovski.finki.prowork.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private UserDao userDao;

    @Autowired
    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public Iterable<User> getAllUsers() {
        return userDao.findAll();
    }
}
