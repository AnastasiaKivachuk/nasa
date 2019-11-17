import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Stars} from './data';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
 private _url: string;
private dateStart: Date;
private dateEnd: Date;
  constructor( public router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) { }


    openTable() {
      this.router.navigate(['table']);
    }

    getData(): Observable<any>{

      return this.http.get(this._url);
    }

    takeDates(objArray){
      this.dateStart=objArray.dateStart;
      this.dateEnd=objArray.dateEnd;
      console.log(this.dateStart);
      console.log(this.dateEnd);
      this._url=`https://api.nasa.gov/neo/rest/v1/feed?start_date=${this.dateStart}&end_date=${this.dateEnd}&api_key=9Ix4GmtXb3ZOtISXbhA91egYf7rFwo1s4cZoqbq3`;
      console.log(this._url);
    }

    // console.log(this.dateStart);
}
