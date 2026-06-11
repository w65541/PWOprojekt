import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import * as forge from 'node-forge';
import { HeaderService } from './header-service';
@Injectable({
  providedIn: 'root'
})
export class Authorization {
  token = "";
  pubkey = "";
  logged = false;

  constructor(private router: Router, private httpClient: HttpClient,private headerService:HeaderService) {
    this.httpClient.get(`${environment.apiUrl}Auth/pubkey`, { responseType: 'text' })
      .subscribe({
        next: response => {
          console.log(response);
          this.pubkey = response;
        }
      });
    const user = localStorage.getItem("currentUser");
    if (user) {
      this.logged = true;
    }

  }
  
  get currentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  logout() {
    this.logged = false;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  login(username: any, password: any) {
    console.log("login 1")

    this.httpClient.post(`${environment.apiUrl}Auth?login=${username}&pwd=${password}`, {}, { responseType: 'text' })
      .subscribe({
        next: response => {
          console.log(response);
          this.token = response;
          localStorage.setItem('currentUser', response);
        },
        error: e => {
          console.error(e);

        }
      });

  }

  login2(username: any, password: any, loginError?: { text: string; }) {
    console.log("login 2");
    const enpwd = encodeURIComponent(this.encryptRSA(password, this.pubkey));
    this.httpClient.post(`${environment.apiUrl}Auth/authEncr?login=${username}&pwd=${enpwd}`, {}, { responseType: 'text' })
      .subscribe({
        next: response => {
          console.log(response);
          this.token = response;
          localStorage.setItem('currentUser', response);
          this.router.navigate(['/users'])
          this.headerService.login();
        },
        error: e => {
          console.error(e)
          if (loginError)
            loginError.text = "Login failed. Please check your username and password.";
        }

      });

  }



  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem("currentUser") || '{}');
  }

  encryptRSA(plaintext: string, publicKeyPem: string): string {
    if (!plaintext) {
      throw new Error('No message provided for RSA encryption');
    }
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    const encrypted = publicKey.encrypt(plaintext, 'RSA-OAEP', {
      md: forge.md.sha256.create()
    });
    return forge.util.encode64(encrypted);
  }


}
