import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../model/user";
import {Router} from "@angular/router";
import {IssueService} from "../issue.service";
import {Issue} from "../model/issue";
import moment = require("moment");

@Component({
  selector: 'app-new-issue',
  templateUrl: './new-issue.component.html',
  styleUrls: ['./new-issue.component.css']
})
export class NewIssueComponent implements OnInit {

  issueForm: FormGroup;
  users: User[];
  usersReady = false;

  constructor(private fb: FormBuilder, private router: Router,
              private issueService: IssueService) {
  }

  ngOnInit() {
    this.issueService.getAllUsers().subscribe(
      (users: User[]) => {
        this.usersReady = true;
        this.users = users;
        const date: string = moment().format('YYYY-MM-DD');
        console.log(date);
        this.issueForm = this.fb.group({
          name: ['', [Validators.required]],
          type: ['TASK', [Validators.required]],
          reviewedBy: ['No one selected', [Validators.required]],
          assignedTo: ['No one selected', [Validators.required]],
          description: ['', [Validators.required]],
          dueDate: [{value: '2018-01-14', disabled: true}],
          dueDateSelected: [false]
        });
      },
      (error: any) => console.error(error)
    );
  }

  onSubmit() {
    const date = moment(this.issueForm.value.dueDate, 'YYYY-MM-DD');

    const formValue = this.issueForm.value;
    const formData = new FormData();
    formData.set('name', formValue.name);
    formData.set('type', formValue.type);
    formData.set('reviewedBy', formValue.reviewedBy);
    formData.set('assignedTo', formValue.assignedTo);
    formData.set('description', formValue.description);
    formData.set('dueDate', date.format('DD.MM.YYYY'));
    formData.set('dueDateSelected', formValue.dueDateSelected);

    this.issueService.createNewIssue(formData)
      .subscribe((response: Issue) => this.router.navigateByUrl('/home'),
        (error: any) => console.error(error));
  }

  discard() {
    this.router.navigateByUrl('/home');
  }

  changeDueDateInputEnabled(enabled: boolean): void {
    const control = this.issueForm.controls['dueDate'];
    enabled ? control.enable() : control.disable();

  }

}
