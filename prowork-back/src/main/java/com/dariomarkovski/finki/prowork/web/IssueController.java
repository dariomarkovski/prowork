package com.dariomarkovski.finki.prowork.web;

import com.dariomarkovski.finki.prowork.model.Issue;
import com.dariomarkovski.finki.prowork.service.IssueService;
import com.dariomarkovski.finki.prowork.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping(value = "/api/issue", produces = MediaType.ALL_VALUE)
@CrossOrigin
public class IssueController {

    IssueService issueService;
    UserService userService;

    @Autowired
    public IssueController(IssueService issueService, UserService userService) {
        this.issueService = issueService;
        this.userService = userService;
    }

    @PostMapping(value = "/new")
    public Issue createIssue(@ModelAttribute Issue newIssue, @RequestParam String dueDate, @RequestParam boolean dueDateSelected, HttpServletRequest httpServletRequest) throws ParseException {
        String jwtToken = httpServletRequest.getHeader("Authorization");
        jwtToken = jwtToken.substring(7);
        DateFormat format = new SimpleDateFormat("dd.MM.yyyy");
        Date date = dueDateSelected ? format.parse(dueDate) : null;
        newIssue.setDateDue(date);
        if (dueDateSelected) {
            System.out.println(newIssue.getDateDue().toString());
        }
        return this.issueService.createIssue(newIssue, jwtToken);
    }

    @PostMapping(value = "/changeStatus")
    public Issue changeStatus(@RequestParam long issueId, @RequestParam int statusCode) throws ServletException {
        return this.issueService.changeStatus(issueId, statusCode);
    }

    @PostMapping(value = "/changeAssignee")
    public Issue changeAssignee(@RequestParam long issueId, @RequestParam String username) throws ServletException {
        return this.issueService.changeAssignee(issueId, username);
    }

    @GetMapping(value = "/all")
    public Iterable<Issue> getAllIssuesForUser(HttpServletRequest httpServletRequest) {
        String jwtToken = httpServletRequest.getHeader("Authorization");
        jwtToken = jwtToken.substring(7);
        return issueService.getAllIssuesForUser(jwtToken);
    }

    @GetMapping(value = "/created")
    public Iterable<Issue> getCreatedByIssuesForUser(HttpServletRequest httpServletRequest) {
        String jwtToken = httpServletRequest.getHeader("Authorization");
        jwtToken = jwtToken.substring(7);
        return issueService.getCreatedByIssuesForUser(jwtToken);
    }

    @GetMapping(value = "/reviewed")
    public Iterable<Issue> getReviewedByIssuesForUser(HttpServletRequest httpServletRequest) {
        String jwtToken = httpServletRequest.getHeader("Authorization");
        jwtToken = jwtToken.substring(7);
        return issueService.getReviewedByIssuesForUser(jwtToken);
    }

    @GetMapping(value = "/assigned")
    public Iterable<Issue> getAssignedToIssuesForUser(HttpServletRequest httpServletRequest) {
        String jwtToken = httpServletRequest.getHeader("Authorization");
        jwtToken = jwtToken.substring(7);
        return issueService.getAssignedToIssuesForUser(jwtToken);
    }
}
