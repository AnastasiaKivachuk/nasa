import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public name:string;
  public absolute_magnitude_h:string;
  public nasa_jpl_url:string;

  constructor(public service: ServiceService) { }

  ngOnInit() { this.service.getDetails()
    .subscribe((data)=>{
this.name=data.name;
this.absolute_magnitude_h=data.absolute_magnitude_h;
this.nasa_jpl_url =data.nasa_jpl_url;
    })
}}
