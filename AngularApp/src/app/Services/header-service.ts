import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
   logged = signal<boolean>(false);

  constructor() {
    const hasUser = !!localStorage.getItem('currentUser');
    this.logged.set(hasUser);
  }

  login() {
    this.logged.set(true);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.logged.set(false);
  }
}
