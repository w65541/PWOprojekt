import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserCreateService {

  constructor(private httpClient: HttpClient, private router: Router,) { }

  createUser(login: string, password: string, email: string, loginError:{text:string}) {
    console.log("adding user");
    let params = new HttpParams()
      .set("username", login)
      .set("password", password)
      .set("email", email);

    this.httpClient.post(`${environment.apiUrl}User/add`, {},
      {
        params,
      }).subscribe({
        next: response => {
          console.log(response);
          this.router.navigate(['/login'])
        },
        error: e => {
          console.error(e);
          console.error(e.error);
          loginError.text=e.error;
             
      
        }
      });
  }
}
