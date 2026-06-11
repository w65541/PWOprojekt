import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserCreateService } from '../../Services/user-create-service';
@Component({
  selector: 'app-user-create',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user-create.html',
  styleUrl: './user-create.css'
})
export class UserCreate {
  constructor(private userSer: UserCreateService) { }

  private formBuilder = inject(FormBuilder);
  userForm = this.formBuilder.group({
    username: this.formBuilder.control('', { validators: [Validators.required], nonNullable: true }),
    password: this.formBuilder.control('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true }),
    email: this.formBuilder.control('', { validators: [Validators.required, Validators.email], nonNullable: true }),
  });
  activeErrors = false;
  loginError = { text: "" };



  submitCreateClicked() {
    console.log("click");
    this.userSer.createUser(this.userForm.controls.username.value, this.userForm.controls.password.value, this.userForm.controls.email.value, this.loginError);//{ queryParams: { ref: 'email' } }
  }

}
