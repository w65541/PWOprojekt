import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ForgotService } from '../../Services/forgot-service';
@Component({
  selector: 'app-forgot',
  imports: [ ReactiveFormsModule],
  templateUrl: './forgot.html',
  styleUrl: './forgot.css'
})
export class Forgot {
invalidEmail=false;

private formBuilder = inject(FormBuilder);
  forgetForm = this.formBuilder.group({
    email: this.formBuilder.control('', { validators: [Validators.required, Validators.email], nonNullable: true }),
  });
validEmail=false;


constructor(private forgotService:ForgotService){}

  async submitClicked() {
  console.log(this.forgotService.recoverAccount(this.forgetForm.controls.email.value));
if(await this.forgotService.recoverAccount(this.forgetForm.controls.email.value)){
  this.invalidEmail=false;
  this.validEmail=true;
}else{
  this.invalidEmail=true;
  this.validEmail=false;
}
}

}
