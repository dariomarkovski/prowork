package com.dariomarkovski.finki.prowork.repository;

import com.dariomarkovski.finki.prowork.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends CrudRepository<User, String> {
    User findByUsername(String username);

    User findByEmail(String email);
}
