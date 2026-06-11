import { Component } from '@angular/core';
import { UserService } from '../../Services/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-users-detail',
  imports: [DatePipe],
  templateUrl: './users-detail.html',
  styleUrl: './users-detail.css'
})
export class UsersDetail {



  constructor(private userService: UserService,private route: ActivatedRoute,private router:Router) { }
  temp = 1;
  user: any;


ngOnInit()
{
   const id = this.route.snapshot.paramMap.get('id');
  const i=id as unknown as number;
  this.userService.getUser(i)
    .subscribe({
      next: user => {
        this.user = user;
        console.log(user);
      },
      error: err => console.error(err)
    });

  console.log(this.user);
}

back() {
this.router.navigate(['/users'])
}

}


