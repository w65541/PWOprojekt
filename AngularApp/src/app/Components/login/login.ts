import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Authorization } from '../../Services/authorization';
import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HeaderService } from '../../Services/header-service';
import { Router } from '@angular/router';
import { NotificationSseService } from '../../Services/notification-sse-service';
@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {


  loginError = { text: "" };

  private formBuilder = inject(FormBuilder);
  userForm = this.formBuilder.group({
    username: this.formBuilder.control('', { validators: [Validators.required], nonNullable: true }),
    password: this.formBuilder.control('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true }),
    remember: this.formBuilder.control(true, { validators: [Validators.required, Validators.minLength(3)], nonNullable: true }),
  });

  constructor(private authorization: Authorization,private router:Router,private notSer:NotificationSseService) {
    if (localStorage.getItem("remember")) {
      this.userForm.controls.remember.setValue(!!localStorage.getItem("remember"));
      this.userForm.controls.username.setValue(localStorage.getItem("username") as string);
    }
  }

  submitLoginClicked() {
    //console.log(`Auth?login=${this.username}&pwd=${this.password}`);
    //this.outLogin.emit();
    if (this.userForm.controls.remember) {
      localStorage.setItem("remember", "true");
      localStorage.setItem("username", this.userForm.controls.username.value);
    } else {
      localStorage.setItem("remember", "");
      localStorage.setItem("username", "");
    }

    this.authorization.login2(this.userForm.controls.username.value, this.userForm.controls.password.value, this.loginError);
    this.notSer.getNotifications();
  }

  forgot() {
    this.router.navigate(['/forgot'])
  }

}
