import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../environments/environment';

import {Store} from '@ngrx/store';
import {StoreData} from '../models/data.model';
import {AppState} from '../store/app.state';
import * as StoreDataAction from '../store/action/data.action';
import {objDate} from '../store/selector/selectorDate';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private url: string;
  private urlDet: string;
  private dateStart: Date;
  private dateEnd: Date;
  mainUrl = environment.mainUrl;
  apiKey = environment.apiKey;
  private dateStartEnd: Observable<{}>;


  constructor(public router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private store: Store<AppState>) {
  }


  openDet(id) {
    this.router.navigate([`details/${id}`]);
  }

  // getData(): Observable<any> {
  //
  //   return this.http.get(this.url);
  // }

  getData(): Observable<any> {

    return this.http.get(this.url);
  }

  getDetails(): Observable<any> {
    return this.http.get(this.urlDet);
  }


  takeDates() {
    this.dateStartEnd = this.store.select(objDate);
    this.dateStartEnd.subscribe((data: {dateStart: Date, dateEnd: Date}) => {
      this.dateStart = data.dateStart;
      this.dateEnd = data.dateEnd;
    });
    this.url = `${this.mainUrl}feed?start_date=${this.dateStart}&end_date=${this.dateEnd}&api_key=${this.apiKey}`;
  }

  takeDetails(id) {
    this.urlDet = `${this.mainUrl}neo/${id}?api_key=${this.apiKey}`;
  }

}
