import { Injectable, Injector } from '@angular/core';
import { Authorization } from './authorization';
import { Observable } from 'rxjs';
import { HttpEvent,HttpHandler,HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class JwtInterceptor {
  constructor(){}
  intercept(request:HttpRequest<any>,next: HttpHandler):Observable<HttpEvent<any>> {


    const currentUser=localStorage.getItem('currentUser');
    
    if(currentUser){
      request=request.clone({
        setHeaders:{
          Authorization:`Bearer ${currentUser}`
        }
      });
    }

    return next.handle(request);
  } 
}
