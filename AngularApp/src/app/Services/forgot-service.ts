import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ForgotService {
  constructor(private httpClient:HttpClient){}

  async recoverAccount(email:string):Promise<boolean>
  { 
    try {

    let params = new HttpParams()
      .set("email", email);

    var response=await this.httpClient.post(`${environment.apiUrl}User/recover`, {},{params}).toPromise();
    
    return true;

    } catch(e) {
      return false;
    }  
      
  }

}
