import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ServiceService} from '../service/service.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  myForm: FormGroup;
  public hideVal = false;
  public hide = false;
  public hideH3 = false;
  public allDates: string[] = [];
  public allStars: {}[] = [];
  public allNames: string[] = [];
  public allId: number[] = [];
  public obj: {};
  private dateStart: any;
  private dateEnd: any;

  constructor(
    public service: ServiceService,
    private route: ActivatedRoute,
  ) {
    this.myForm = new FormGroup({
      dateStart: new FormControl('', Validators.required),
      dateEnd: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    console.log(this.service.returnStartEnd());
    if (this.service.returnStartEnd()) {
      this.hide = true;
      this.hideH3 = false;
      this.service.getStartEnd();
      this.groupData();
    }
  }

  groupData() {
    this.service.getData()
      .subscribe((data) => {
        this.hideH3 = true;
        for (const key of Object.keys(data.near_earth_objects)) {
          this.allDates.push(key);
          this.allStars.push(data.near_earth_objects[key]);

        }

        this.allDates.forEach((item, index) => {
          console.log(item);
          console.log(this.allStars[index]);
          this.obj = {...this.obj, ...{[item]: this.allStars[index]}};
        });
        console.log(this.obj);

      });
  }

  submit() {
    if (this.checkValid(this.myForm.value)) {
      this.service.takeDates(this.myForm.value);
      this.hide = true;
      this.groupData();
    } else {
      this.hideVal = true;
    }
  }

  checkValid(dates) {
    this.dateStart = new Date(dates.dateStart).getTime();
    this.dateEnd = new Date(dates.dateEnd).getTime();
    if (604800000 > this.dateEnd - this.dateStart  && this.dateEnd - this.dateStart > 0 ) {
      return true;
    } else {
      return false;
    }
  }

  openNames(date) {
    while (this.allNames.length > 0) {
      this.allNames.pop();
    }
    while (this.allId.length > 0) {
      this.allId.pop();
    }
    for (const key of Object.keys(this.obj)) {
      if (date === key) {
        this.obj[date].forEach((item) => {
          this.allNames.push(item.name);
          this.allId.push(item.id);
        });
      }
    }
  }


  openDetails(i) {
    this.service.openDet(this.allId[i]);
  }
}
