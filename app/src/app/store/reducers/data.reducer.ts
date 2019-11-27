import {Action} from '@ngrx/store';
import {StoreData} from '../../models/data.model';
import * as StoreDataAction from '../action/data.action';

const initialState: StoreData = {
    isFetching: false,
    error: '',
    data: [],
    startEndDate: {dateStart: null, dateEnd: null},
    selectedDate: null
  }
;

export function reducer(state: StoreData = initialState, action: StoreDataAction.Actions) {


  switch (action.type) {
    case StoreDataAction.FETCH:
      return {
        ...state,
        isFetching: true,
        error: '',
        data: {},
      };
    case StoreDataAction.ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        selectedDate: null

      };
    case StoreDataAction.SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
        selectedDate: ''

      };
    case StoreDataAction.START_END_DATE:
      return {
        ...state,
        startEndDate: action.payload

      };
    case StoreDataAction.SELECTED_DATE:
      return {
        ...state,
        selectedDate: action.payload
      };
    default:
      return state;
  }
}

export const getstartEndDate = (state: StoreData) => state.startEndDate;
export const getObjData = (state: StoreData) => state.data;
export const getObjSelectedData = (state: StoreData) => state.selectedDate;

