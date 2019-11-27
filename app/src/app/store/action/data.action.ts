import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {StoreData} from '../../models/data.model';

export const FETCH = '[stars] Fetch';
export const ERROR = '[stars] Error';
export const SUCCESS = '[stars] Success';
export const START_END_DATE = '[stars]  changeStartDate';
export const SELECTED_DATE = '[stars] ChangeSelectedDate'

export class Fetch implements Action {
  readonly type = FETCH;
  constructor() { }
}

export class Error implements Action {
  readonly type = ERROR;

  constructor(public payload: string) {
  }
}

export class Success implements Action {
  readonly type = SUCCESS;

  constructor(public payload: {}) {
  }
}

export class ChangeStartEndDate implements Action {
  readonly type = START_END_DATE;

  constructor(public payload: {}) {
  }
}
export class ChangeSelectedDate implements Action {
  readonly type = SELECTED_DATE;

  constructor(public payload: {}) {
  }
}



export type Actions = Fetch | Error | Success | ChangeStartEndDate | ChangeSelectedDate;
