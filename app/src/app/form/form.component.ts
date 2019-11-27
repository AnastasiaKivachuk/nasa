import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ServiceService} from '../service/service.service';
import {ActivatedRoute} from '@angular/router';
import * as StoreDataAction from '../store/action/data.action';
import {AppState} from '../store/app.state';

import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {objDate} from '../store/selector/selectorDate';
import {objData} from '../store/selector/selectorDate';
import {selectedArrData} from '../store/selector/selectorDate';


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
  public objectKeys = Object.keys;
  private dateStart: any;
  private selectedObj: Observable<{
    name: any;
    id: any;
  }[]>;
  private dateStartEnd: Observable<{
    dateStart: any;
    dateEnd: any;
  }>;
  private objAllData: Observable<{}>;

  constructor(
    public service: ServiceService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {

    this.objAllData = store.select(objData);
    this.selectedObj = store.select(selectedArrData);
    this.myForm = new FormGroup({
      dateStart: new FormControl('', Validators.required),
      dateEnd: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.dateStartEnd = this.store.select(objDate);
    this.dateStartEnd.subscribe((data: { dateStart: Date, dateEnd: Date }) => {
      this.dateStart = data.dateStart;
    });
    if (this.dateStart) {
      this.hide = true;
      this.hideH3 = false;
      this.groupData();
    }
  }

  openForm() {
    if (this.dateStart) {
      this.hide = false;
      this.hideH3 = true;
      this.store.dispatch(new StoreDataAction.Success({}));
    }
  }

  groupData() {
    this.store.dispatch(new StoreDataAction.Fetch());
    this.service.getData()
      .subscribe((data) => {
          this.hideH3 = true;
          const mainObj = {};
          Object.keys(data.near_earth_objects).forEach((item, i) => {
            const arrOfStars = [];
            data.near_earth_objects[item].forEach((item2) => {
              const objOfStars = {
                id: undefined,
                name: undefined
              };
              objOfStars.id = item2.id;
              objOfStars.name = item2.name;
              arrOfStars.push(objOfStars);

            });
            console.log(arrOfStars);
            mainObj[item] = arrOfStars;
          });
          console.log(mainObj);
          this.store.dispatch(new StoreDataAction.Success(mainObj));
        },
        err => {
          console.log(err);
          this.store.dispatch(new StoreDataAction.Error(err));
        });
  }

  submit() {
    if (this.checkValid(this.myForm.value)) {
      this.store.dispatch(new StoreDataAction.ChangeStartEndDate(this.myForm.value));
      this.service.takeDates();
      this.hide = true;
      this.hideVal = false;

      this.groupData();
    } else {
      this.hideVal = true;
    }
  }

  checkValid(dates) {
    const dateStart = new Date(dates.dateStart).getTime();
    const dateEnd = new Date(dates.dateEnd).getTime();
    return 604800000 > dateEnd - dateStart && dateEnd - dateStart > 0;
  }

  openNames(date) {
    this.store.dispatch(new StoreDataAction.ChangeSelectedDate(date));
  }


  openDetails(idStar) {
    this.service.openDet(idStar);
  }
}
