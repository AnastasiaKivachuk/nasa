import {Component, OnInit} from '@angular/core';
import {ServiceService} from '../service/service.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public name: string;
  public absoluteMagnitudeH: string;
  public nasaJplUrl: string;

  constructor(public service: ServiceService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.service.takeDetails(this.route.snapshot.paramMap.get('id'));
    this.service.getDetails()
      .subscribe((data) => {
        this.name = data.name;
        this.absoluteMagnitudeH = data.absolute_magnitude_h;
        this.nasaJplUrl = data.nasa_jpl_url;
      });
  }
}
