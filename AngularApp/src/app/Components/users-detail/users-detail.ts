import { Component, inject } from '@angular/core';
import { UserService } from '../../Services/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-detail',
  imports: [DatePipe,
    ReactiveFormsModule],
  templateUrl: './users-detail.html',
  styleUrl: './users-detail.css'
})
export class UsersDetail {
  
  private formBuilder = inject(FormBuilder);
editForm = this.formBuilder.group({
    login:    this.formBuilder.control('', { validators: [Validators.required], nonNullable: true }),
    email:    this.formBuilder.control('', { validators: [Validators.required, Validators.email], nonNullable: true }),
    password: this.formBuilder.control('', { nonNullable: true }),
    typeId:   this.formBuilder.control(2, { validators: [Validators.required], nonNullable: true }),
  });

temp = 1;
  user: any;
  editMode = false;
  saveError = '';
  saveSuccess = false;

  constructor(private userService: UserService,private route: ActivatedRoute,private router:Router) { }
  

  

  
  
ngOnInit()
{
   const id = this.route.snapshot.paramMap.get('id');
  const i=id as unknown as number;
  this.userService.getUser(i)
    .subscribe({
      next: user => {
        this.user = user;
        console.log(user);
        this.resetForm();
      },
      
    });

  console.log(this.user);
}



  resetForm() {
    this.editForm.patchValue({
      login:    this.user.login,
      email:    this.user.email,
      password: '',
      typeId:   this.user.typeId,
    });
  }

  toggleEdit() {
    this.editMode = !this.editMode;
    this.saveError = '';
    this.saveSuccess = false;
    if (!this.editMode) this.resetForm();
  }

  save() {
    if (this.editForm.invalid) return;

    const dto: any = {
      login:  this.editForm.value.login,
      email:  this.editForm.value.email,
      typeId: this.editForm.value.typeId,
    };
    if (this.editForm.value.password) {
      dto.password = this.editForm.value.password;
    }

    this.userService.updateUser(this.user.id, dto).subscribe({
      next: updated => {
        this.user = updated;
        this.editMode = false;
        this.saveSuccess = true;
        this.saveError = '';
        setTimeout(() => this.saveSuccess = false, 3000);
      },
      
    });
  }

  archive() {
    if (!confirm(`Czy na pewno chcesz zarchiwizować użytkownika ${this.user.login}?`)) return;

    // archiver id from JWT stored in localStorage
    const token = localStorage.getItem('currentUser');
    let archId = 1;
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        archId = parseInt(payload.unique_name ?? '1');
      } catch {}
    }

    this.userService.archiveUser(this.user.id, archId).subscribe({
      next: () => this.router.navigate(['/users']),
    });
  }

  





back() {
this.router.navigate(['/users'])
}

}


