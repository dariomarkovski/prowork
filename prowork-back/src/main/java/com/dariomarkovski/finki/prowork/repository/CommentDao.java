package com.dariomarkovski.finki.prowork.repository;

import com.dariomarkovski.finki.prowork.model.Comment;
import com.dariomarkovski.finki.prowork.model.Issue;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface CommentDao extends CrudRepository<Comment, Long> {
    Iterable<Comment> findAllByIssue(Issue issue);

    @Transactional
    long deleteByCommentId(long commentId);
}
