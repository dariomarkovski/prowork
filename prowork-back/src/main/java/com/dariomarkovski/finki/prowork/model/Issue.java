package com.dariomarkovski.finki.prowork.model;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "issue")
public class Issue {

    public enum issueStatus {
        NONE, DONE, WORKING
    }

    public enum issueType {
        TASK, STORY, BUG
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long issueId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private issueStatus status;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private issueType type;

    @JoinColumn(nullable = false)
    @ManyToOne
    private User createdBy;

    @JoinColumn(nullable = false)
    @ManyToOne
    private User reviewedBy;

    @JoinColumn(nullable = false)
    @ManyToOne
    private User assignedTo;

    @Column(nullable = false)
    private Date dateCreated;

    @Column
    private Date dateDue;

    @Column(length = 1000, nullable = false)
    private String description;

    @OneToMany(mappedBy = "issue", cascade = CascadeType.REMOVE)
    private Set<Comment> comments;

    public long getIssueId() {
        return issueId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public issueStatus getStatus() {
        return status;
    }

    public void setStatus(issueStatus status) {
        this.status = status;
    }

    public issueType getType() {
        return type;
    }

    public void setType(issueType type) {
        this.type = type;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public User getReviewedBy() {
        return reviewedBy;
    }

    public void setReviewedBy(User reviewedBy) {
        this.reviewedBy = reviewedBy;
    }

    public User getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(User assignedTo) {
        this.assignedTo = assignedTo;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getDateDue() {
        return dateDue;
    }

    public void setDateDue(Date dateDue) {
        this.dateDue = dateDue;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
