import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotificationSseService } from '../Services/notification-sse-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-notification-list',
  imports: [ ScrollingModule, FormsModule,NgClass],
  templateUrl: './notification-list.html',
  styleUrl: './notification-list.css'
})
export class NotificationList {

  itemSize = '2.5rem';      
  viewportHeightPx = 200;
constructor(public notSer:NotificationSseService){}

read(arg0: number) {
  console.log("notId:",arg0);
  this.notSer.markAsRead(arg0);
}


}
