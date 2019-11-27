import {
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import {StoreData} from '../../models/data.model';
import {getstartEndDate} from '../reducers/data.reducer';
import {getObjData} from '../reducers/data.reducer';
import {getObjSelectedData} from '../reducers/data.reducer';
import {getIsFetching} from '../reducers/data.reducer';

export const getState =
  createFeatureSelector<StoreData>('storeData');
export const objDate = createSelector(
  getState,
  getstartEndDate,
);

export const objData = createSelector(
  getState,
  getObjData,
);
export const selectedData = createSelector(
  getState,
  getObjSelectedData,
);
export const selectedArrData = createSelector(
  selectedData,
  objData,
  (key = '', obj = {}) => obj[key]
);

export const isFetching = createSelector(
  getState,
  getIsFetching,
);
