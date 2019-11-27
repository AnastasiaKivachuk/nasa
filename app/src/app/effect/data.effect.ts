import {Injectable} from '@angular/core';

import {Effect, Actions, ofType} from '@ngrx/effects';
// import { of } from 'rxjs/observable/of';
import {map, switchMap, catchError} from 'rxjs/operators';

// import * as fromRoot from '../../../app/store';
import * as StoreDataAction from '../store/action/data.action';
import * as fromServices from '../service/service.service';
import {of} from 'rxjs';

@Injectable()
export class DataEffects {
  constructor(
    private actions$: Actions,
    private movieService: fromServices.ServiceService
  ) {
  }

  @Effect()
  loadData$ = this.actions$.pipe(
    ofType(StoreDataAction.FETCH)).pipe(switchMap(() => {
    return this.movieService
      .getData()
      .pipe(
        map(data => {
          const dataObj = {};
          Object.keys(data.near_earth_objects).forEach(date => {
            dataObj[date] = data.near_earth_objects[date].map(asteroid => {
              const {id, name} = asteroid;
              return {id, name};
            });
          })
          return new StoreDataAction.Success(dataObj);
        }),
        catchError(error => of(new StoreDataAction.Error(error)))
      );
  }));


}
