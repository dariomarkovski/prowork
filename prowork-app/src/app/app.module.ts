import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AuthGuardService} from "./auth-guard.service";
import {HeaderComponent} from './header/header.component';
import {NewIssueComponent} from './new-issue/new-issue.component';
import {LoggedHeaderComponent} from './logged-header/logged-header.component';
import {IssueService} from "./issue.service";
import {AccessService} from "./access.service";
import {EditUserComponent} from './edit-user/edit-user.component';
import {LoginHelpComponent} from './login-help/login-help.component';
import {CommentService} from "./comment.service";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login-help',
    component: LoginHelpComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'new-issue',
    component: NewIssueComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    NewIssueComponent,
    LoggedHeaderComponent,
    EditUserComponent,
    LoginHelpComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AccessService, IssueService, CommentService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
