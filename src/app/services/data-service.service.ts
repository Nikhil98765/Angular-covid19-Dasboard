import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { DistrictData } from '../model/district-data';
import { StateData } from '../model/state-data';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {


  private stateWiseData = "https://api.covid19india.org/csv/latest/state_wise.csv";
  private districtWiseData = "	https://api.covid19india.org/csv/latest/district_wise.csv";

  constructor(private http: HttpClient) { }

  getStateWiseData() {
    return this.http.get(this.stateWiseData, {responseType: 'text'}).pipe(map(result => {
      let rowData = result.split('\n');
      let stateData: StateData[] = [];
      rowData.forEach(data=> {
        let cols = data.split(',');
        if(cols.length > 1){
          if(cols.length === 13) {
            cols.splice(12, 1);
          }
          if(+cols[1] > 0){
          stateData.push({
            state: cols[0],
            confirmed: +cols[1],
            recovered: +cols[2],
            deaths: +cols[3],
            active: +cols[4]
          });
        }
        }
      })
      return stateData;
    }));
  }

  getDistrictWiseData() {
    return this.http.get(this.districtWiseData, {responseType: 'text'}).pipe(map(result => {
      let rowData = result.split('\n');
      let districtData: DistrictData[] = [];
      rowData.forEach(data=> {
        let cols = data.split(',');
        cols.splice(9, cols.length);
        if(+cols[0] > 0) {
          districtData.push({
            stateName : cols[2],
            districtName: cols[4],
            confirmed: +cols[5],
            active: +cols[6],
            recovered: +cols[7],
            deceased: +cols[8]
          });
        }
      });
      return districtData;
    }))
  }
}
