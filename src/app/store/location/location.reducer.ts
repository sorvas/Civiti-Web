import { createReducer, on } from '@ngrx/store';
import { LocationState } from './location.state';
import * as LocationActions from './location.actions';

export const initialLocationState: LocationState = {
  county: null,
  city: null,
  district: null,
  loading: false,
  error: null
};

export const locationReducer = createReducer(
  initialLocationState,
  
  on(LocationActions.setLocation, (state, { county, city, district }) => ({
    ...state,
    county,
    city,
    district,
    error: null
  })),
  
  on(LocationActions.clearLocation, () => initialLocationState)
);