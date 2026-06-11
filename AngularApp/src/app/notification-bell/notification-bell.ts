import { Component, signal, Signal, ViewEncapsulation } from '@angular/core';
import { NotificationSseService } from '../Services/notification-sse-service';
import { NotificationList } from '../notification-list/notification-list';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-notification-bell',
  imports: [NotificationList],
  templateUrl: './notification-bell.html',
  styleUrl: './notification-bell.css',
   encapsulation: ViewEncapsulation.None
})
export class NotificationBell {

isOpen= signal<boolean>(false);
 constructor(public notSer:NotificationSseService){}
ngOnInit(){
  /*this.notSer.getNotifications().subscribe(notifs => {
  console.log("Received from SSE:", notifs);

});;*/
this.notSer.connect();
  this.notSer.getUnreadCount();
}

open() {
  if(this.isOpen()){
this.isOpen.set(false);
  }else{
    this.isOpen.set(true);
  }

console.log(this.isOpen());
}
}
