import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import {Stars} from '../service/data';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
public allDates:string[] = [];
public allStars: any[]=[];
public allNames: any[]=[];
public allId: any[]=[];
public obj: any;
  constructor(
    public service: ServiceService
  ) { }


  ngOnInit() {
    this.service.getData()
    .subscribe((data)=>{
    for (const key of Object.keys(data.near_earth_objects)) {
      console.log(key, data.near_earth_objects[key]);
      this.allDates.push(key);
        this.allStars.push(data.near_earth_objects[key]);
        this.allStars.forEach((item)=>{
          for (const key of Object.keys(item)) {
            this.allNames.push(item[key].name);
            this.allId.push(item[key].id);
          }
        })

  }

      console.log(this.allDates);
      console.log(this.allStars);
    })
  }

  openDetails(i){
    console.log(i);
    console.log(this.allId[i]);
    this.service.openDet(this.allId[i]);
    this.service.takeDetails(this.allId[i]);
  }


}
