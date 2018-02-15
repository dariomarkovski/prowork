import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../model/user";
import {Router} from "@angular/router";
import {AccessService} from "../access.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  matchingPasswordsError = false;
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
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      confirmPassword: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    }, {validator: this.matchingPasswordsValidator});
  }

  onSubmit() {
    const formValue = this.registerForm.value;
    const formData = new FormData();
    formData.set('username', formValue.username);
    formData.set('password', formValue.password);
    formData.set('email', formValue.email);
    this.accessService.register(formData)
      .subscribe(
        (user: User) => {
          console.log(user);
          this.router.navigateByUrl('/login');
        },
        (error: any) => {
          this.errorMessage = error.error.message;
          this.errorDisplay = true;
        }
      );
  }

  goBack() {
    this.router.navigateByUrl('/login');
  }

  matchingPasswordsValidator(control: AbstractControl) {
    if (control.get('password').value !== control.get('confirmPassword').value) {
      return {invalid: true};
    }
  }

}
