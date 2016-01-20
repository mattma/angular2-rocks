import {SET_CURRENT_FILTER} from '../actions/todo';

// After dispatching the action the rootReducer will be called
// by the store passing the currentState
export function FilterReducer(state: string = 'SHOW_ALL', action): string {
  switch (action.type) {
    case SET_CURRENT_FILTER:
      return action.filter;
    default:
      return state;
  }
};
