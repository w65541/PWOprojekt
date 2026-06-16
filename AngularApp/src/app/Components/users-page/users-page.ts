import { Component } from '@angular/core';
import { UserService } from '../../Services/user-service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FilterAllPipe } from "../../Pipes/filter-all-pipe";
import { FormsModule } from "@angular/forms";
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';


@Component({
  selector: 'app-users-page',
  imports: [DatePipe, ScrollingModule, FilterAllPipe, FormsModule],
  templateUrl: './users-page.html',
  styleUrl: './users-page.css'
})
export class UsersPage {
  users: any[]=[];
  
  itemSize = '2.5rem';      
  viewportHeightPx = 200;
  searchText: any;


  constructor(private userService:UserService,private router:Router
    ,private httpClient: HttpClient){}

  ngOnInit(){
    this.userService.getUsers()
    .subscribe({ 
      next: users => {
      this.users = users;
      console.log(this.users);
    },
    error: err => console.error(err)
  });
    console.log(this.userService.getUsers());
    console.log(this.users);
  }

  goToDetails(id:number){
    this.router.navigate(['/userDetails', id]);
  }

  requestExport() {

    let currentUser = localStorage.getItem('currentUser');

    let params = new HttpParams()
      .set("userId", "5")
      .set("dataType", "users");
 
    this.httpClient.post(`${environment.apiUrl}DataExport/request-export`, {}, { params })
      .subscribe({
        next: (response: any) => {
          
        },
      error: err => {
        console.error(err);
      }
    });
  }
}
