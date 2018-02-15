package com.dariomarkovski.finki.prowork.service.impl;

import com.dariomarkovski.finki.prowork.model.Comment;
import com.dariomarkovski.finki.prowork.model.Issue;
import com.dariomarkovski.finki.prowork.model.User;
import com.dariomarkovski.finki.prowork.repository.CommentDao;
import com.dariomarkovski.finki.prowork.repository.IssueDao;
import com.dariomarkovski.finki.prowork.repository.UserDao;
import com.dariomarkovski.finki.prowork.service.AccessService;
import com.dariomarkovski.finki.prowork.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {

    AccessService accessService;
    CommentDao commentDao;
    IssueDao issueDao;
    UserDao userDao;

    @Autowired
    public CommentServiceImpl(AccessService accessService, CommentDao commentDao, IssueDao issueDao, UserDao userDao) {
        this.accessService = accessService;
        this.commentDao = commentDao;
        this.issueDao = issueDao;
        this.userDao = userDao;
    }

    @Override
    public Iterable<Comment> getAllCommentsForIssue(long issueId) {
        Issue issue = issueDao.findOne(issueId);
        return commentDao.findAllByIssue(issue);
    }

    @Override
    public Comment addComment(Comment comment, String jwtToken) {
        String username = this.accessService.getUsernameFromJwtToken(jwtToken);
        User user = userDao.findByUsername(username);
        comment.setCommentedBy(user);
        return commentDao.save(comment);
    }

    @Override
    public long deleteComment(long commendId) {
        return commentDao.deleteByCommentId(commendId);
    }

}
