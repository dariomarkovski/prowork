package com.dariomarkovski.finki.prowork.repository;

import com.dariomarkovski.finki.prowork.model.Issue;
import com.dariomarkovski.finki.prowork.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IssueDao extends CrudRepository<Issue, Long> {
    Iterable<Issue> findDistinctByAssignedToOrCreatedByOrReviewedBy(User assignedTo, User createdBy, User reviewedBy);

    Iterable<Issue> findAllByCreatedBy(User createdBy);

    Iterable<Issue> findAllByReviewedBy(User reviewedBy);

    Iterable<Issue> findAllByAssignedTo(User assignedTo);

    Iterable<Issue> findAllByStatus(Issue.issueStatus issueStatus);

    Iterable<Issue> findAllByType(Issue.issueType issueType);
}
