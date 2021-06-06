import { Component, OnInit } from '@angular/core';
import { StateData } from '../model/state-data';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public totalConfirmed: Object = {};
  public totalRecovered: Object = {};
  public totalDeaths: Object = {};
  public totalActive: Object = {};
  public statesData: StateData[] = [];
  //charts Options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'right';
  view: any[] = [700, 400];
  colorScheme = {
    domain: ['#A10A28', '#5AA454', '#C7B42C', '#AAAAAA']
  };
  showXAxisLabel = true;
  xAxisLabel = 'States';
  showYAxisLabel = true;
  yAxisLabel = 'Cases';
  showXAxis = true;
  showYAxis = true;

  confirmedChartData = [];
  recoveredChartData = [];
  deathsChartData = [];
  activeChartData = [];

  cardColor: string = '#232837';
  cardData = [];
  

  constructor(private dataservice: DataServiceService) { }

  ngOnInit(): void {
    this.dataservice.getStateWiseData().subscribe((data => {
        this.totalConfirmed = { name: 'Confirmed', value:data[0].confirmed};
        this.totalActive = { name: 'Active', value:data[0].active};
        this.totalDeaths = { name: 'Deceased', value:data[0].deaths};
        this.totalRecovered = { name: 'Recovered', value:data[0].recovered};
        data.splice(0, 1);
        this.statesData = data;
        this.prepareCardData();
        this.prepareChartData('confirmed');
    }));
  }

  prepareChartData(caseType: string) {
    let data:{name: string, value: number}[] = [];
    this.statesData.forEach((stateData:StateData) => {
      data.push( {
            name: stateData.state,
            value: stateData[caseType]
           });
    })
    this.confirmedChartData = data;
  }

  updateChartData(caseType: HTMLInputElement) {
    this.prepareChartData(caseType.value);
  }

  prepareCardData() {
    this.cardData = [this.totalConfirmed, this.totalActive, this.totalRecovered, this.totalDeaths];
  }

}
