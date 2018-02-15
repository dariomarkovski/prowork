import {Component, OnInit, Renderer2} from '@angular/core';
import {IssueService} from "../issue.service";
import {Issue} from "../model/issue";
import {CommentService} from "../comment.service";
import {Comment} from "../model/comment";
import {User} from "../model/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: string;
  issues: Issue[];
  allIssues: Issue[];
  selectedIssue: Issue = undefined;
  selectedIssueComments: Comment[];
  status: string;
  userField: string;
  comment = '';
  allUsers: User[] = [];

  constructor(private issueService: IssueService,
              private commentService: CommentService,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    this.username = localStorage.getItem('User');
    this.issueService.getAllIssues()
      .subscribe((issues: Issue[]) => {
          this.issues = issues;
          this.allIssues = issues;
        },
        (error: any) => console.error(error));
    this.issueService.getAllUsers()
      .subscribe((users: User[]) => {
        this.allUsers = users;
      }, (error: any) => {
        console.error(error);
      });
  }

  selectIssue(issue: Issue): void {
    this.selectedIssue = issue;
    this.renderer.addClass(document.getElementById('task-main'), 'task-main-half');
    this.commentService.getAllCommentsByIssueId(issue.issueId)
      .subscribe((comments: Comment[]) => {

          this.selectedIssueComments = comments;
        },
        (error: any) => console.error(error));
  }

  changeUserField(userField: string): void {
    this.userField = userField;
    this.filterIssues();
  }

  changeStatus(status: string): void {
    this.status = status;
    this.filterIssues();
  }

  filterIssues(): void {
    const username = localStorage.getItem('User');
    if (this.userField === 'all') {
      this.issues = this.allIssues;
    } else if (this.userField === 'assigned') {
      this.issues = this.allIssues.filter((issue: Issue) => issue.assignedTo.username === username);
    } else if (this.userField === 'created') {
      this.issues = this.allIssues.filter((issue: Issue) => issue.createdBy.username === username);
    } else if (this.userField === 'review') {
      this.issues = this.allIssues.filter((issue: Issue) => issue.reviewedBy.username === username);
    }
    if (this.status === 'none') {
      this.issues = this.issues.filter((issue: Issue) => issue.status === 'NONE');
    } else if (this.status === 'working') {
      this.issues = this.issues.filter((issue: Issue) => issue.status === 'WORKING');
    } else if (this.status === 'done') {
      this.issues = this.issues.filter((issue: Issue) => issue.status === 'DONE');
    }
  }

  addComment() {
    const formData = new FormData();
    formData.set('issue', '' + this.selectedIssue.issueId);
    formData.set('commentText', this.comment);
    this.commentService.addComment(formData)
      .subscribe((comment: Comment) => {
        this.selectedIssueComments.push(comment);
        this.comment = '';
      }, (error: any) => console.error(error));
  }

  discardComment() {
    this.comment = '';
  }

  deleteComment(commentId: number) {
    const formData = new FormData();
    formData.set('commentId', '' + commentId);
    this.commentService.deleteComment(formData)
      .subscribe((deletedComments: Number) => {
        this.selectedIssueComments = this.selectedIssueComments.filter((value: Comment) => value.commentId !== commentId);
      }, (error: any) => {
        console.error(error);
      });
  }

  changeIssueStatus(statusCode: number) {
    const formData = new FormData();
    formData.set('issueId', '' + this.selectedIssue.issueId);
    formData.set('statusCode', '' + statusCode);
    this.issueService.changeIssueStatus(formData)
      .subscribe((issue: Issue) => {
        this.selectedIssue.status = issue.status;
      }, (error: any) => {
        console.error(error);
      });
  }

  changeIssueAssignee(username: String) {
    const formData = new FormData();
    formData.set('issueId', '' + this.selectedIssue.issueId);
    formData.set('username', '' + username);
    this.issueService.changeIssueAssignee(formData)
      .subscribe((issue: Issue) => {
        this.selectedIssue.assignedTo = issue.assignedTo;
      }, (error: any) => {
        console.error(error);
      });
  }
}
