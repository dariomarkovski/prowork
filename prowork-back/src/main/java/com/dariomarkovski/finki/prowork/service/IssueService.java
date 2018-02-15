package com.dariomarkovski.finki.prowork.service;

import com.dariomarkovski.finki.prowork.model.Issue;
import org.springframework.stereotype.Service;

import javax.servlet.ServletException;

@Service
public interface IssueService {
    public Issue createIssue(Issue issue, String jwtToken);

    public Issue changeStatus(long issueId, int statusCode) throws ServletException;

    public Issue changeAssignee(long issueId, String username) throws ServletException;

    public Iterable<Issue> getAllIssuesForUser(String jwtToken);

    public Iterable<Issue> getAssignedToIssuesForUser(String jwtToken);

    public Iterable<Issue> getCreatedByIssuesForUser(String jwtToken);

    public Iterable<Issue> getReviewedByIssuesForUser(String jwtToken);
}
