import { Component, OnInit } from '@angular/core';
import { StateData } from '../model/state-data';
import { DataServiceService } from '../services/data-service.service';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public totalConfirmed: number = 0;
  public totalRecovered: number = 0;
  public totalDeaths: number = 0;
  public totalActive: number = 0;
  public statesData: StateData[] = [];
   // options
   showXAxis = true;
   showYAxis = true;
   gradient = false;
   showLegend = true;
   showXAxisLabel = true;
   xAxisLabel = 'State';
   showYAxisLabel = true;
   yAxisLabel = 'Cases';
 
   colorScheme = {
     domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
   };
   view = [700, 400];
   public chartData: any[] = [];

  

  constructor(private dataservice: DataServiceService) { }

  ngOnInit(): void {
    this.dataservice.getStateWiseData().subscribe((data => {
        this.totalConfirmed = data[0].confirmed;
        this.totalActive = data[0].active;
        this.totalDeaths = data[0].deaths;
        this.totalRecovered = data[0].recovered;
        data.splice(0, 1);
        this.statesData = data;
        // this.createChart();
        this.statesData.forEach(stateData =>
        this.chartData.push({
          "name": stateData.state,
          "value": stateData.confirmed
        }));
    }));
  }
}
