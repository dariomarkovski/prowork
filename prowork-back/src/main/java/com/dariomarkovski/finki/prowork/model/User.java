package com.dariomarkovski.finki.prowork.model;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "user")
public class User {

    @Id
    @Column
    private String username;

    @Column
    private String password;

    @Column(unique = true)
    private String email;

    @Column
    private Date dateCreated;

    @Column
    private String resetToken;

    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.REMOVE)
    private Set<Issue> createdIssues;

    @OneToMany(mappedBy = "reviewedBy", cascade = CascadeType.REMOVE)
    private Set<Issue> reviewingIssues;

    @OneToMany(mappedBy = "assignedTo", cascade = CascadeType.REMOVE)
    private Set<Issue> assignedIssues;

    @OneToMany(mappedBy = "commentedBy", cascade = CascadeType.REMOVE)
    private Set<Comment> comments;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public String getResetToken() {
        return resetToken;
    }

    public void setResetToken(String resetToken) {
        this.resetToken = resetToken;
    }
}
