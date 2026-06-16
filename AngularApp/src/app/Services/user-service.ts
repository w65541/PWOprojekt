import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: Array<any> = [];
  constructor(private httpClient:HttpClient){}
  
  getSetUsers(){
    return [
    {id:1,Login:"aaaa", Email:"faf@esf", Type:1, CreationDate:Date.now()},
    {id:2,Login:"aaaa", Email:"faf@esf", Type:1, CreationDate:Date.now()},
    {id:3,Login:"aaaa", Email:"faf@esf", Type:1, CreationDate:Date.now()},
    {id:4,Login:"aaaa", Email:"faf@esf", Type:1, CreationDate:Date.now()},
    {id:5,Login:"aaaa", Email:"faf@esf", Type:1, CreationDate:Date.now()},
    {id:6,Login:"aaaa", Email:"faf@esf", Type:1, CreationDate:Date.now()},
    
  ]
  }
  getUsers():Observable<any[]>{
    return this.httpClient.get<Array<any>>(`${environment.apiUrl}User/getAll`);
    
  }

  getUser(id:number):Observable<any>{
    let params = new HttpParams()
      .set("id", id);
    return this.httpClient.get<Array<any>>(`${environment.apiUrl}User/get`,{params});
  }

  updateUser(id: number, dto: UpdateUserDto): Observable<any> {
    let params = new HttpParams().set('id', id);
    return this.httpClient.put<any>(`${environment.apiUrl}User/update`, dto, { params });
  }

  archiveUser(id: number, archId: number): Observable<any> {
    let params = new HttpParams().set('id', id).set('archId', archId);
    return this.httpClient.post<any>(`${environment.apiUrl}User/archive`, {}, { params });
  }
}

export interface UpdateUserDto {
  login?: string;
  email?: string;
  password?: string;
  typeId?: number;
}