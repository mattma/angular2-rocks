import {Reducer, Action} from '@ngrx/store';

import * as type from '../reducers/constant';

const initialState = 'SHOW_ALL';

export const FilterReducer: Reducer<string> = (state: string = initialState, action: Action) => {
  switch (action.type) {
    case type.SET_CURRENT_FILTER:
      console.log('action: ', action);
      return state;

    default:
      return state;
  }
};