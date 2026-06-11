import { Component, inject } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule, DatePipe } from '@angular/common';
import { UserService } from '../../Services/user-service';
import { FormsModule } from '@angular/forms';
import { PieChartService } from '../../Services/pie-chart-service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-pie-chart',
  imports: [CommonModule,
    NgxChartsModule,
    FormsModule,

  ],
  templateUrl: './pie-chart.html',
  styleUrl: './pie-chart.css'
})
export class PieChart {
dblClicked($event: any) {
console.log("dbl Click")
    console.log($event);
}
deactivate($event: any) {
console.log("deactivate")
    console.log($event);
}
activate($event: any) {
console.log("activate")
    console.log($event.event);
}
//  dangerousUrl: string;
//  trustedUrl: any;


  clickedChart($event: any) {
    console.log("click")
    console.log($event);
  }
  key: any;

  private sanitizer = inject(DomSanitizer);   


  constructor(private userService: UserService, private pieService: PieChartService) {
   // this.dangerousUrl = '<ngx-charts-pie-chart [results]="dataPC2" [view]="viewPC" [animations]="animationPC" [scheme]="colorSchemePC" [labels]="labelsPC" [doughnut]="doughnut" [tooltipText]="percentageFormatterPC" [legend]="true" (select)="clickedChart($event)" class="shadow-sm rounded-0" style="max-width: 600px; width: 100%;" >  </ngx-charts-pie-chart>';    
   // this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(this.dangerousUrl);
}

  // Options for Pie Chart

  dataPC = [
    {
      name: "Rest",
      value: 53.24,
    },
    {
      name: "China",
      value: 18.47,
    },
    {
      name: "India",
      value: 17.7,
    },
    {
      name: "USA",
      value: 4.25,
    },
    {
      name: "Indonesia",
      value: 3.51,
    },
    {
      name: "Pakistan",
      value: 2.83,
    },
  ];
  annualWageSalary = [
    {
      name: "USA",
      series: [
        {
          value: 39238,
          name: "2000-09-24T00:33:38.246Z",
        },
        {
          value: 45647,
          name: "2005-09-24T00:33:38.246Z",
        },
        {
          value: 53235,
          name: "2010-09-24T00:33:38.246Z",
        },
        {
          value: 59993,
          name: "2015-09-24T00:33:38.246Z",
        },
        {
          value: 71655,
          name: "2020-09-24T00:33:38.246Z",
        },
      ],
    },
    {
      name: "Bulgaria",
      series: [
        {
          value: 1910,
          name: "2000-09-24T00:33:38.246Z",
        },
        {
          value: 3030,
          name: "2005-09-24T00:33:38.246Z",
        },
        {
          value: 6180,
          name: "2010-09-24T00:33:38.246Z",
        },
        {
          value: 7110,
          name: "2015-09-24T00:33:38.246Z",
        },
        {
          value: 9320,
          name: "2020-09-24T00:33:38.246Z",
        },
      ],
    },
  ];

  ///pie
  viewPC: [number, number] = [700, 400];
  animationPC = true;
  colorSchemePC = "vivid";
  labelsPC = true;
  doughnut = true;

  percentageFormatterPC(data: any): string {
    return data.value + "%";
  }
  ///

  //vertical
  dataVBC: any[] = [];
  viewVBC: [number, number] = [800, 300];
  animationsVBC = false;
  legendVBC = true;
  xAxisVBC = true;
  yAxisVBC = true;
  showYAxisLabelVBC = true;
  yAxisLabelVBC = "Amount in Trillions ($)";

  dataLabelFormatterVBC(tooltipText: any) {
    return "$" + tooltipText + " trillion";
  }
  //

  ///line
  dataLC: any[] = [];
  viewLC: [number, number] = [700, 300];
  animationsLC = true;
  showGridLinesLC = true;
  legendLC = true;
  legendTitleLC = "Countries";
  roundDomainsLC = true;
  xAxisLC = true;
  yAxisLC = true;

  currencyFormatterLC(moneyAmount: any): string {
    const currencyFormat = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    return currencyFormat.format(moneyAmount);
  }

  dateFormatterLC(date: string): string {
    const datePipe = new DatePipe("en-UK");
    let formatted = datePipe.transform(date);
    return formatted ? formatted : date;
  }

  ///



  dataPC2: any[] = [];
  users: any;
  ngOnInit() {
    this.userService.getUsers()
      .subscribe({
        next: users => {
          this.users = users;
          this.dataPC2 = this.pieService.getKeyDataPer("type", this.users);
          this.dataVBC = this.pieService.getKeyData("type", this.users);
          this.dataLC = this.pieService.getDatedData("type", this.users);
        },
        error: err => console.error(err)
      });

  }

  setNewData() {
    this.dataPC2 = this.pieService.getKeyDataPer(this.key, this.users);
    this.dataVBC = this.pieService.getKeyData(this.key, this.users);
  }
}
