package com.dariomarkovski.finki.prowork.service;

import com.dariomarkovski.finki.prowork.model.Comment;
import org.springframework.stereotype.Service;

@Service
public interface CommentService {
    public Iterable<Comment> getAllCommentsForIssue(long issueId);

    public Comment addComment(Comment comment, String jwtToken);

    public long deleteComment(long commendId);
}
