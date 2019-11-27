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
import {isFetching} from '../store/selector/selectorDate';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  myForm: FormGroup;
  public hideVal = false;
  public hideH3: Observable<boolean>;
  public hide = false;
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
    this.hideH3 = store.select(isFetching).subscribe(data => {
      this.hideH3 = data;
    });;

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
      // this.hideH3 = false;
      // this.groupData();
    }
  }

  openForm() {
    if (this.dateStart) {
      this.hide = false;
      // this.hideH3 = true;
      this.store.dispatch(new StoreDataAction.Success({}));
    }
  }

  submit() {
    if (this.checkValid(this.myForm.value)) {
      this.store.dispatch(new StoreDataAction.ChangeStartEndDate(this.myForm.value));
      this.service.takeDates();
      this.hide = true;
      this.hideVal = false;

      this.store.dispatch(new StoreDataAction.Fetch());
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
