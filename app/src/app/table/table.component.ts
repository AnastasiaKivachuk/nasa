import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
public allDates: string[] = [];
public allStars: any[] = [];
public allNames: any[] = [];
public allId: any[] = [];
public length: any[] = [];
public obj: any;
  constructor(
    public service: ServiceService
  ) { }


  ngOnInit() {
    this.service.getData()
    .subscribe((data) => {
    for (const key of Object.keys(data.near_earth_objects)) {
      // console.log(key, data.near_earth_objects[key]);
      this.allDates.push(key);
      this.allStars.push(data.near_earth_objects[key]);
      // console.log(`1    ${this.allStars}`);
      this.allStars.forEach((item) => {
        //   this.length.push(item);
        // console.log(item);
          for (const key2 of Object.keys(item)) {
            this.allNames.push(item[key2].name);
            this.allId.push(item[key2].id);
            // console.log( this.allNames.length)
          }
        });
      console.log(this.length);
  }
      //
      // console.log(this.allDates);
      // console.log(this.allStars);
    });
  }

  openDetails(i) {
    console.log(i);
    console.log(this.allId[i]);
    this.service.openDet(this.allId[i]);
    this.service.takeDetails(this.allId[i]);
  }
}
