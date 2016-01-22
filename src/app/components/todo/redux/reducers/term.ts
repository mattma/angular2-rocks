import {STARTED_LETTER} from '../actions/todo';

// After dispatching the action the rootReducer will be called
// by the store passing the currentState
export function TermReducer(state: string = '', action): string {
  switch (action.type) {
    case STARTED_LETTER:
      return action.term;
    default:
      return state;
  }
};
