import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PieChartService {

  constructor(){}
 private datePipe = new DatePipe("en");
 
  getKeyData(key: string, data: any[]) {

    var dataKey: any[] = [
    ];
    console.log(data);
    data.forEach(d => {
      const exist = dataKey.find(x => x.name == d[key]);
      if (exist) {
        exist.value++;
      } else {
        dataKey.push(
          {
            name: d[key],
            value: 1,
          }
        )
      }
    });

    return dataKey;
  }

  getKeyDataPer(key: string, data: any[]) {
    var dataKeyPer = this.getKeyData(key, data);
    dataKeyPer.forEach(x => x.value = x.value / data.length * 100);
    return dataKeyPer;
  }

getDatedData(key: string, data: any[]){
  var dataKey: any[] = [];

    console.log(data);


    data.forEach(d => {
      let exist = dataKey.find(x => x.name == d[key]);
      console.log(d["creationDate"])
      const date=d["creationDate"].slice(0,10);

      
    
      if (!exist) {
        exist={
            name:d[key],
            series:[]
          };
        dataKey.push(exist)
      }

    let dateEntry = exist.series.find((s: any) => s.name === date);
    if (dateEntry) {
      dateEntry.value++;
    } else {
      exist.series.push({ name: date, value: 1 });
    }

  });
    console.log(dataKey);
    return dataKey;
}

}
