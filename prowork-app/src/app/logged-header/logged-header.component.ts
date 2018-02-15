import {Component, OnInit} from '@angular/core';
import {AccessService} from "../access.service";

@Component({
  selector: 'app-logged-header',
  templateUrl: './logged-header.component.html',
  styleUrls: ['./logged-header.component.css']
})
export class LoggedHeaderComponent implements OnInit {

  loggedUsername: string;

  constructor(private accessService: AccessService) {
  }

  ngOnInit() {
    this.loggedUsername = localStorage.getItem('User');
  }

  logout() {
    this.accessService.logout();
  }
}
