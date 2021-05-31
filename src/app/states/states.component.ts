import { DistrictData } from './../model/district-data';
import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent implements OnInit {

  public states: string[];

  constructor(private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getDistrictWiseData().subscribe((data: DistrictData[]) => {
      //console.log(data);
      this.states = [...new Set(data.map(item => item.stateName))];
    })
  }

  updatedState(state: string) {
    console.log(state);
  }
}
