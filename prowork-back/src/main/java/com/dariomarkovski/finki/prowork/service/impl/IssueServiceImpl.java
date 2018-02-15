package com.dariomarkovski.finki.prowork.service.impl;

import com.dariomarkovski.finki.prowork.model.Issue;
import com.dariomarkovski.finki.prowork.model.User;
import com.dariomarkovski.finki.prowork.repository.IssueDao;
import com.dariomarkovski.finki.prowork.repository.UserDao;
import com.dariomarkovski.finki.prowork.service.AccessService;
import com.dariomarkovski.finki.prowork.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.ServletException;
import java.util.Date;
import java.util.UUID;

@Service
public class IssueServiceImpl implements IssueService {

    private AccessService accessService;
    private IssueDao issueDao;
    private UserDao userDao;

    @Autowired
    public IssueServiceImpl(AccessService accessService, IssueDao issueDao, UserDao userDao) {
        this.accessService = accessService;
        this.issueDao = issueDao;
        this.userDao = userDao;
    }

    @Override
    public Issue createIssue(Issue issue, String jwtToken) {
        issue.setStatus(Issue.issueStatus.NONE);
        String username = accessService.getUsernameFromJwtToken(jwtToken);
        User createBy = userDao.findByUsername(username);
        issue.setCreatedBy(createBy);
        issue.setDateCreated(new Date());
        return issueDao.save(issue);
    }

    @Override
    public Issue changeStatus(long issueId, int statusCode) throws ServletException {
        Issue issue = issueDao.findOne(issueId);
        switch (statusCode) {
            case 0: {
                issue.setStatus(Issue.issueStatus.NONE);
                break;
            }
            case 1: {
                issue.setStatus(Issue.issueStatus.WORKING);
                break;
            }
            case 2: {
                issue.setStatus(Issue.issueStatus.DONE);
                break;
            }
            default: {
                throw new ServletException("Invalid Status Code");
            }
        }
        return issueDao.save(issue);
    }

    @Override
    public Issue changeAssignee(long issueId, String username) throws ServletException {
        Issue issue = issueDao.findOne(issueId);
        User user = userDao.findByUsername(username);
        issue.setAssignedTo(user);
        return issueDao.save(issue);
    }

    @Override
    public Iterable<Issue> getAllIssuesForUser(String jwtToken) {
        String username = accessService.getUsernameFromJwtToken(jwtToken);
        User user = userDao.findByUsername(username);
        return issueDao.findDistinctByAssignedToOrCreatedByOrReviewedBy(user, user, user);
    }

    @Override
    public Iterable<Issue> getAssignedToIssuesForUser(String jwtToken) {
        String username = accessService.getUsernameFromJwtToken(jwtToken);
        User user = userDao.findByUsername(username);
        return issueDao.findAllByAssignedTo(user);
    }

    @Override
    public Iterable<Issue> getCreatedByIssuesForUser(String jwtToken) {
        String username = accessService.getUsernameFromJwtToken(jwtToken);
        User user = userDao.findByUsername(username);
        return issueDao.findAllByCreatedBy(user);
    }

    @Override
    public Iterable<Issue> getReviewedByIssuesForUser(String jwtToken) {
        String username = accessService.getUsernameFromJwtToken(jwtToken);
        User user = userDao.findByUsername(username);
        return issueDao.findAllByReviewedBy(user);
    }
}
