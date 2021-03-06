import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/shared/service/messages.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit, OnDestroy {

  editInProgress = false;

  @ViewChild('form') form: NgForm;
  userRoles = ['admin', 'manager', 'HR'];
  role: string;
  isValidPassword: boolean;
  isValidLogin: boolean;
  isValid = true;
  subscription$: Subscription;
  subscriptionForm$: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private msgService: MessagesService
  ) {}

  ngOnInit() {
    const isLogin = this.authService.isLoggedIn();
    if (isLogin) {
      this.router.navigate(['/films']);
    }
    this.subscriptionForm$ = this.form.valueChanges.subscribe(() => {
      if (this.form.touched || this.form.dirty) {
        this.editInProgress = true;
        this.validationPassword();
        this.validationLogin();
      }
    });
  }

  submitForm() {
    this.editInProgress = false;
    if (this.form.valid) {
      this.isValid = true;
      this.subscription$ = this.authService.login(this.form.value.login, this.form.value.password)
        .subscribe(
          () => {
            this.msgService.setMessage({
              type: 'success',
              body: `${this.form.value.login}, Вы успешно зарегистрировались в системе. Добро пожаловать!`,
            });
            setTimeout(() => {
              this.router.navigate(['/main']);
            }, 2000);
          },
          err => {
            console.log(err);
          }
        );
    } else {
      this.isValid = false;
    }
  }

  clear() {
    this.isValid = true;
    this.form.reset();
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  validationLogin() {
    const exp1 = new RegExp('.*[A-Z]+.*');
    const exp2 = new RegExp('.*[0-9]+.*');
    const exp3 = new RegExp('.*[!&^%$#@()/]+.*');
    if (exp1.test(this.form.value.login) && exp2.test(this.form.value.login) && exp3.test(this.form.value.login)) {
      this.isValidLogin = true;
    } else {
      this.isValidLogin = false;
    }
  }

  validationPassword() {
    const exp1 = new RegExp('.*[A-Z]+.*');
    const exp2 = new RegExp('.*[0-9]+.*');
    if (exp1.test(this.form.value.password) && exp2.test(this.form.value.password)) {
      this.isValidPassword = true;
    } else {
      this.isValidPassword = false;
    }
  }

  ngOnDestroy() {
    this.subscriptionForm$.unsubscribe();
  }
}
