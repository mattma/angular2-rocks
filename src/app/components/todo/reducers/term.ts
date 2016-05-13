import {Reducer, Action} from '@ngrx/store';

import {STARTED_LETTER} from '../reducers/constant';

export const TermReducer: Reducer<string> = (state: string, action: Action) => {
   switch (action.type) {
    case STARTED_LETTER:
      return action.payload;

    default:
      return state;
  }
};