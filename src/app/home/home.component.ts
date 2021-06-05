import { Component, OnInit } from '@angular/core';
import { StateData } from '../model/state-data';
import { DataServiceService } from '../services/data-service.service';

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
  //charts Options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'right';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  confirmedChartData = [];
  recoveredChartData = [];
  deathsChartData = [];
  activeChartData = [];
  

  constructor(private dataservice: DataServiceService) { }

  ngOnInit(): void {
    this.dataservice.getStateWiseData().subscribe((data => {
        this.totalConfirmed = data[0].confirmed;
        this.totalActive = data[0].active;
        this.totalDeaths = data[0].deaths;
        this.totalRecovered = data[0].recovered;
        data.splice(0, 1);
        this.statesData = data;
        this.prepareConfirmedChartData();
        this.prepareRecoveredChartData();
        this.prepareDeathsChartData();
        this.prepareActiveChartData();
    }));
  }

  prepareConfirmedChartData() {
    let data:{name: string, value: number}[] = [];
    for(let i = 0; i < this.statesData.length; i++) {
      data.push( {
        name: this.statesData[i].state,
        value: this.statesData[i].confirmed
      });
    }
    this.confirmedChartData = data;
  }

  prepareRecoveredChartData() {
    let data:{name: string, value: number}[] = [];
    for(let i = 0; i < this.statesData.length; i++) {
      data.push( {
        name: this.statesData[i].state,
        value: this.statesData[i].recovered
      });
    }
    this.recoveredChartData = data;
  }

  prepareDeathsChartData() {
    let data:{name: string, value: number}[] = [];
    for(let i = 0; i < this.statesData.length; i++) {
      data.push( {
        name: this.statesData[i].state,
        value: this.statesData[i].deaths
      });
    }
    this.deathsChartData = data;
  }

  prepareActiveChartData() {
    let data:{name: string, value: number}[] = [];
    for(let i = 0; i < this.statesData.length; i++) {
      data.push( {
        name: this.statesData[i].state,
        value: this.statesData[i].active
      });
    }
    this.activeChartData = data;
  }
  
}
