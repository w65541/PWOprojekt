import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Login} from './Components/login/login';
import {Authorization} from './Services/authorization'
import { Header } from './Components/header/header';
import { UsersDetail } from "./Components/users-detail/users-detail";
import { UsersPage } from "./Components/users-page/users-page";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { NotificationBell } from "./notification-bell/notification-bell";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header,
    CommonModule,
    NgxChartsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AngularApp');
  constructor(){}

  submitLoginClicked(){
    console.log("got Click");
    //this.authorization.login("admin","admin");
  }


}
