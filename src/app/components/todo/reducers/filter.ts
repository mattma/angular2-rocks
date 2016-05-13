import {Reducer, Action} from '@ngrx/store';

import * as type from '../reducers/constant';

export const FilterReducer: Reducer<string> = (state: string, action: Action) => {
  switch (action.type) {
    case type.SET_CURRENT_FILTER:
      return action.payload;

    default:
      return state;
  }
};