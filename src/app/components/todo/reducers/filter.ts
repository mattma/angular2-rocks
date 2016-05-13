import {Reducer, Action} from '@ngrx/store';

import {SET_CURRENT_FILTER} from '../reducers/constant';

export const FilterReducer: Reducer<string> = (state: string, action: Action) => {
  switch (action.type) {
    case SET_CURRENT_FILTER:
      return action.payload;

    default:
      return state;
  }
};