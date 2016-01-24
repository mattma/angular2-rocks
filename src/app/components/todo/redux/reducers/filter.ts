import {SET_CURRENT_FILTER} from '../actions/todo';

const initialState = 'SHOW_ALL';
// After dispatching the action the rootReducer will be called
// by the store passing the currentState
export function FilterReducer(state: string = initialState, action): string {
  switch (action.type) {
    case SET_CURRENT_FILTER:
      return action.filter;
    default:
      return state;
  }
};
