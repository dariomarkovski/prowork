import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-help',
  templateUrl: './login-help.component.html',
  styleUrls: ['./login-help.component.css']
})
export class LoginHelpComponent implements OnInit, OnDestroy {

  emailAddressForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'body-color');
    if (localStorage.getItem('Bearer') !== null) {
      this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() {
    this.emailAddressForm = this.fb.group({
      emailAddress: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'body-color');
  }

  sendEmail() {

  }

  goBack() {
    this.router.navigateByUrl('/login');
  }
}
