package com.dariomarkovski.finki.prowork.model;

import javax.persistence.*;

@Entity
@Table(name = "comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long commentId;

    @JoinColumn(nullable = false)
    @ManyToOne
    private Issue issue;

    @JoinColumn(nullable = false)
    @ManyToOne
    private User commentedBy;

    @Column(length = 1000, nullable = false)
    private String commentText;

    public long getCommentId() {
        return commentId;
    }

    public Issue getIssue() {
        return issue;
    }

    public void setIssue(Issue issue) {
        this.issue = issue;
    }

    public User getCommentedBy() {
        return commentedBy;
    }

    public void setCommentedBy(User commentedBy) {
        this.commentedBy = commentedBy;
    }

    public String getCommentText() {
        return commentText;
    }

    public void setCommentText(String commentText) {
        this.commentText = commentText;
    }
}
