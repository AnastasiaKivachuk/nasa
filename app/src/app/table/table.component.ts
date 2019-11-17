import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import {Stars} from '../service/data';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
public allStars: Stars;
  constructor(
    public service: ServiceService
  ) { }

  // ngOnInit() {
  //   this.service.getData()
  //   .subscribe(data=>this.allStars=data);
  //   console.log(this.allStars);
  // }
  ngOnInit() {
    this.service.getData()
    .subscribe((data)=>{
      // console.log(data.near_earth_objects);
      // this.allStars = data.near_earth_objects;
      this.allStars = data;
      console.log(this.allStars);
    })
    // console.log(this.allStars);
  }

}
