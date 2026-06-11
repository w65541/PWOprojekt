import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MyNotification } from '../../models/notificationModel';

@Injectable({
  providedIn: 'root'
})
export class NotificationSseService {

  //private _notifications = new BehaviorSubject<MyNotification[]>([]);
  public _notifications = new BehaviorSubject<Map<number, MyNotification>>(new Map<number, MyNotification>);
  notifications$ = this._notifications.asObservable();
  unreadCount = signal(0);
  private eventSource?: EventSource;
  private retryTimeout?: any;

  constructor(private httpClient: HttpClient) { }

  getNotifications(): Observable<MyNotification[]> {

    let token = localStorage.getItem('currentUser');

    console.log("Getting notifications");
    return new Observable(observer => {
      const eventSource = new EventSource(`${environment.apiUrl}NotificationSSE/sse?token=${token}`);
      eventSource.onmessage = event => {
        observer.next(JSON.parse(event.data));
        //this._notifications.next(this._notifications.value.concat(JSON.parse(event.data)));
        JSON.parse(event.data).forEach((element: MyNotification) => {
          this._notifications.value.set(element.Id, element);
        });
        this.getUnreadCount()
        console.log("notifs: ", JSON.parse(event.data));

      };
      eventSource.onerror = error => {
        observer.error(error);
        eventSource.close();
      };
      return () => eventSource.close();
    });
  }

  sendNotification(id: number, message: string) {
    let params = new HttpParams()
      .set("userId", id)
      .set("message", message);
  }

  markAsRead(id: number) {
    let params = new HttpParams()
      .set("notId", id);

    this.httpClient.post(`${environment.apiUrl}NotificationSSE/read`, {}, { params })
      .subscribe({
        next: response => {
          var notif = this._notifications.value.get(id);
          if (notif) {
            notif.Read = true;
            this._notifications.value.set(id, notif);
            this.getUnreadCount();
          }
        },
        error: e => {
          console.error(e);
          console.error(e.error);
        }
      });
  }
  


  getUnreadCount() {
    //this.unreadCount.set(this._notifications.value.filter(n => n.Read == false).length);
    let num = 0;
    this._notifications.value.forEach((value, key) => {
      if (!value.Read) num++;
    });
    this.unreadCount.set(num);
    console.log("unread count:", this.unreadCount());
  }

  connect() {
    let token = localStorage.getItem('currentUser');
    if (!token) return;

    const url = `${environment.apiUrl}NotificationSSE/sse?token=${token}`;

    this.eventSource = new EventSource(url);
this.eventSource.addEventListener("notification", 
  (event) => {
      //const data = JSON.parse(event.data);
      //this._notifications.next(this._notifications.value.concat(JSON.parse(event.data)));
      const temp = JSON.parse(event.data)
      if (Array.isArray(temp)) {
        temp.forEach((element: MyNotification) => {
          this._notifications.value.set(element.Id, element);
        });
      } else {
        this._notifications.value.set(temp.Id, temp);
      }

      this.getUnreadCount();
      console.log('Got notifications:', JSON.parse(event.data));
    });

    this.eventSource.onerror = (error) => {
      console.error('SSE error, closing:', error);
      this.eventSource?.close();
      this.scheduleReconnect();
    };

    console.log('SSE connection established');
  }

  private scheduleReconnect() {
    // clear previous timer
    if (this.retryTimeout) clearTimeout(this.retryTimeout);

    // retry in 3 seconds
    this.retryTimeout = setTimeout(() => {
      console.log('Reconnecting SSE...');
      this.connect();
    }, 3000);
  }

  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = undefined;
    }
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
      this.retryTimeout = undefined;
    }
  }


}
