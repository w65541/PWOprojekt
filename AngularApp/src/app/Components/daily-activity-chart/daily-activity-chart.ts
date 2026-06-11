import { Component } from '@angular/core';
import { DailyActivityService } from '../../Services/daily-activity-service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-daily-activity-chart',
  imports: [
    NgxChartsModule,],
  templateUrl: './daily-activity-chart.html',
  styleUrl: './daily-activity-chart.css'
})
export class DailyActivityChart {

  dataVBC: any;
  viewVBC: [number, number] = [700, 400];
  xAxisLabelVBC="Date";

  animationsVBC = true;
  legendVBC = false;
  xAxisVBC=true;
  yAxisLabelVBC="Unique Daily Users";
  dataLabelFormatterVBC: any;

  logs:any[]=[]
gridVBC=true;

  dateStart:any;
  dateEnd:any;

  constructor(private dailySerice: DailyActivityService) { }

  ngOnInit(){
    this.dailySerice.getLogs()
    .subscribe({ 
      next: logs => {
      this.logs = logs;
      console.log(this.logs);
      this.dataVBC=this.dailySerice.getDailyActivity(logs);
    },
    error: err => console.error(err)
  });
  }

  getDateRangeData(){
    this.dailySerice.getDatedLogs(this.dateStart,this.dateEnd)
    .subscribe({ 
      next: logs => {
      console.log(this.logs);
      this.dataVBC=this.dailySerice.getDailyActivity(logs);
    },
    error: err => console.error(err)
  });
  }
}
