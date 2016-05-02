import {List} from 'immutable';
import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  CLEAR_COMPLETED,
  COMPLETE_ALL,
  EDIT_TODO
} from '../actions/todo';
import {ITodos, ITodo, ITodoAction} from '../actions/todo';

const cuid = require('cuid');

const initialState: ITodos = List<ITodos>();

// After dispatching the action the rootReducer will be called
// by the store passing the currentState
export function TodoReducer(state: ITodos = initialState, action: ITodoAction): ITodos {
  switch (action.type) {
    case ADD_TODO:
      return state.push({
        id: cuid(),
        text: action.text,
        completed: action.completed
      });

    case TOGGLE_TODO:
      return toggleTodo(state, action);

    case EDIT_TODO:
      return editTodo(state, action);

    case REMOVE_TODO:
      return removeTodo(state, action);

    case COMPLETE_ALL:
      return completeAll(state, action);

    case CLEAR_COMPLETED:
      return clearCompleted(state);

    default:
      return state;
  }
};

