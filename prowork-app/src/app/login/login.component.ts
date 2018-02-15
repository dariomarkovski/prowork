import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AccessService} from "../access.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  errorMessage: string;
  errorDisplay = false;

  constructor(private fb: FormBuilder, private accessService: AccessService,
              private router: Router, private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'body-color');
    if (localStorage.getItem('Bearer') !== null) {
      this.router.navigateByUrl('/home');
    }
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'body-color');
  }


  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const formValue = this.loginForm.value;
    const formData = new FormData();
    formData.set('username', formValue.username);
    formData.set('password', formValue.password);
    this.accessService.login(formData)
      .subscribe(
        (jwtToken: any) => {
          localStorage.setItem('Bearer', jwtToken);
          localStorage.setItem('User', formValue.username);
          this.router.navigateByUrl('/home');
        },
        (error: any) => {
          if (error.status === 500) {
            const errorObj = JSON.parse(error.error);
            this.errorMessage = errorObj.message;
            this.errorDisplay = true;
          }
        }
      );
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }

  navigateToLoginHelp() {
    this.router.navigateByUrl('/login-help');
  }
}
