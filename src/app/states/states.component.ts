import { DistrictData } from './../model/district-data';
import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent implements OnInit {

  public states: string[] = [];
  public stateDistrictData = [];
  public stateData = [];
  public barChartData = [];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Cases';
  showYAxisLabel = true;
  yAxisLabel = 'Districts';

  showLabels: boolean = true;
  isDoughnut: boolean = false;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getDistrictWiseData().subscribe((data: DistrictData[]) => {
      this.states = [...new Set(data.map(item => item.stateName))];
      data.forEach((stateWiseData: DistrictData) => {
        if(stateWiseData.districtName !== 'Unknown') {
          if(this.stateDistrictData[stateWiseData.stateName]){
            let districtsArray = this.stateDistrictData[stateWiseData.stateName];
            districtsArray.push(stateWiseData);
          } else {
            let districtsArray1 = [];
            districtsArray1.push(stateWiseData);
            this.stateDistrictData[stateWiseData.stateName] = districtsArray1;
          }
        }
      });
      this.updatedState(this.states[0]);
    });
  }

  updatedState(state: string) {
    this.stateData = [];
    this.stateData = this.stateDistrictData[state];
    this.prepareBarChartData(this.stateData);
  }

  prepareBarChartData(stateData) {
    let data:{name: string, value: number}[] = [];
    for(let i = 0; i < stateData.length; i++) {
      data.push( {
        name: stateData[i].districtName,
        value: stateData[i].confirmed
      });
    }
    this.barChartData = data;
  }
}
