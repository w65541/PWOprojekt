import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DailyActivityService {
  
  constructor(private httpClient: HttpClient ){}
  
  getLogs() :Observable<any[]>{
      return this.httpClient.get<Array<any>>(`${environment.apiUrl}Log/getAll`);     
    }
  
    getDatedLogs(start:Date,end:Date) :Observable<any[]>{

      if(start.getDate()==end.getDate()){
        let params = new HttpParams()
      .set("start", start.toTimeString());
      return this.httpClient.get<Array<any>>(`${environment.apiUrl}Log/getDateLog`,{params});    
      }else{
        let params = new HttpParams()
      .set("start", start.toTimeString())
      .set("end", end.toTimeString());
return this.httpClient.get<Array<any>>(`${environment.apiUrl}Log/getDateRangeLog`,{params});  
      }
         
      
    }

  getDailyActivity(data: any[]){
    var dataKey: any[] = [
    ];
    var loggedUsers:any[] = [
    ];
    console.log(data);
    data.forEach(d => {
      const date=d["loginDate"].slice(0,10);
      const exist = dataKey.find(x => x.name == date);
      if (exist) {
        if(!loggedUsers.find(x=> x==d["userId"])){
          exist.value++;
          loggedUsers.push(d["userId"]);
        }
      } else {
        dataKey.push(
          {
            name: date,
            value: 1,
          }
          
        )
        loggedUsers=[d["userId"]]
      }

    });

    return dataKey;
  }

}
