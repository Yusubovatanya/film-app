import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/shared/service/messages.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppSpinnerService } from 'src/app/shared/service/app-spinner.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  hide = true;
  isLogin: boolean;
  subscriptionLogin$: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private msgService: MessagesService,
    private formBuild: FormBuilder,
    public appSpinnerService: AppSpinnerService,
  ) {
    this.isLogin = this.authService.isLoggedIn();
    this.subscriptionLogin$ = this.authService.legLoginStatus().subscribe((isLogin: boolean) => {
      this.isLogin = isLogin;
    });
  }

  formErrors = {
    'userLogin': '',
    'userPassword': ''
  };

  validationMessages = {
    'userLogin': {
      'required': 'Поле не может быть пустым.',
      'pattern': 'Не правильный формат логина.',
      'minlength': 'Значение должно быть не менее 5и символов.',
      'maxlength': 'Значение не должно быть больше 25 символов.',
    },
    'userPassword': {
      'required': 'Поле не может быть пустым.',
      'pattern': 'Не правильный формат пароля.',
      'minlength': 'Значение должно быть не менее 5и символов.',
      'maxlength': 'Значение не должно быть больше 25 символов.'
    }
  };

  ngOnInit() {
    this.appSpinnerService.showOrHideSpinner(false);
    this.buildForm();
    if (this.isLogin) {
      this.router.navigate(['/main']);
    }
  }

  buildForm() {
    this.userForm = this.formBuild.group({
      userLogin: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
        Validators.pattern(/[A-Z]/),
        // Validators.email
        // Validators.pattern(/^(|(([A-Za-z0-9][A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|\
        // ([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/i)
      ]],
      userPassword: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
        Validators.pattern(/(?=.*[0-9])(?=.*[a-z])/g),
        // Validators.pattern(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/g)
      ]]
    });
    this.userForm.valueChanges.subscribe(() => {
      this.onValueChange();
    });
  }

  onValueChange() {
    for (const element of Object.keys(this.formErrors)) {
      this.formErrors[element] = '';
      const controlElement = this.userForm.get(element);
      if (controlElement && controlElement.dirty && !controlElement.valid) {
        const message = this.validationMessages[element];
        for (const key of Object.keys(controlElement.errors)) {
          this.formErrors[element] += message[key] + ' ';
        }
      }
    }
  }


  clear() {
    this.userForm.reset();
  }

  login() {
    if (this.userForm.valid) {
      this.authService.login(this.userForm.value.userLogin, this.userForm.value.userPassword)
        .subscribe(
          () => {
            this.msgService.setMessage({
              type: 'success',
              body: `${this.userForm.value.userLogin}, Вы успешно вошли в систему. Добро пожаловать!`,
            });
            setTimeout(() => {
              this.router.navigate(['/main']);
            }, 2000);
          },
          err => {
            console.log(err);
          }
        );
    }
  }

  goToRegistration() {
    this.router.navigate(['/registration']);
  }

  ngOnDestroy() {
    this.subscriptionLogin$.unsubscribe();
  }

}

