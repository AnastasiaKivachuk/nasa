import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private url: string;
  private urlDet: string;
  private dateStart: Date;
  private dateEnd: Date;
  private startEnd: Date[] = [];

  constructor(public router: Router,
              private route: ActivatedRoute,
              private http: HttpClient) {
  }


  openDet(id) {
    this.router.navigate([`details/${id}`]);
  }

  getData(): Observable<any> {

    return this.http.get(this.url);
  }

  getDetails(): Observable<any> {
    return this.http.get(this.urlDet);

  }

  takeDates(objArray) {
    console.log('aaaa');
    console.log(objArray);
    this.dateStart = objArray.dateStart;
    this.dateEnd = objArray.dateEnd;
    console.log(this.dateStart);
    console.log(this.dateEnd);
    this.url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${this.dateStart}&end_date=${this.dateEnd}&api_key=9Ix4GmtXb3ZOtISXbhA91egYf7rFwo1s4cZoqbq3`;
    console.log(this.url);
  }

  takeDetails(id) {
    this.urlDet = `http://www.neowsapp.com/rest/v1/neo/${id}?api_key=9Ix4GmtXb3ZOtISXbhA91egYf7rFwo1s4cZoqbq3`;
    console.log(this.url);
  }

  getStartEnd() {
    console.log('1');
    console.log(this.startEnd);
    this.startEnd = {...this.startEnd, ...{dateStart: this.dateStart, dateEnd: this.dateEnd}};
    // this.startEnd.push( this.dateStart);
    // this.startEnd.push( this.dateEnd);
    console.log('1');
    console.log(this.startEnd);
    this.takeDates(this.startEnd);
  }

  returnStartEnd() {
    return this.dateStart;
  }


}
