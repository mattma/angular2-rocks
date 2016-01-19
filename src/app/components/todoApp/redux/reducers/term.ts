import {STARTED_LETTER} from '../actions/todo';

// After dispatching the action the rootReducer will be called
// by the store passing the currentState
export function TermReducer(state: string, action): string {
  if (!state) {
    return '';
  }
  console.log('term action: ', action);
  console.log('term state: ', state);
  switch (action.type) {
    case STARTED_LETTER:
      console.log('fire memeem plaes');
      return action.term;
    default:
      console.log('fire default now');
      return state;
  }
};
