import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HeaderService } from '../../Services/header-service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule, DatePipe } from '@angular/common';
import { NotificationBell } from '../../notification-bell/notification-bell';
import { NotificationSseService } from '../../Services/notification-sse-service';
@Component({
  selector: 'app-header',
  imports: [RouterLink, NotificationBell],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  
  constructor(public headerService:HeaderService,private notSer:NotificationSseService){}

  logout(){
    this.headerService.logout();
    localStorage.removeItem('currentUser');
    this.notSer.disconnect();
  }
}
