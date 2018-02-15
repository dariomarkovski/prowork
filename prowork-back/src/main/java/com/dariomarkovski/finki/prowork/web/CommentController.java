package com.dariomarkovski.finki.prowork.web;

import com.dariomarkovski.finki.prowork.model.Comment;
import com.dariomarkovski.finki.prowork.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(value = "/api/comment", produces = MediaType.ALL_VALUE)
@CrossOrigin
public class CommentController {

    CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping(value = "/allByIssueId")
    public Iterable<Comment> getAllCommentsByIssue(@RequestParam long issueId) {
        return commentService.getAllCommentsForIssue(issueId);
    }

    @PostMapping(value = "/new", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Comment addComment(@ModelAttribute Comment newComment, HttpServletRequest httpServletRequest) {
        String jwtToken = httpServletRequest.getHeader("Authorization");
        jwtToken = jwtToken.substring(7);
        return commentService.addComment(newComment, jwtToken);
    }

    @PostMapping(value = "/delete")
    public long deleteComment(@RequestParam long commentId) {
        return this.commentService.deleteComment(commentId);
    }
}
