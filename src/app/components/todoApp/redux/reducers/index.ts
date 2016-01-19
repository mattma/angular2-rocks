import {combineReducers} from 'redux';
import {List} from 'immutable';
import {ITodosState} from '../../types/todo.d';
import {TodoReducer} from './todo';
import {FilterReducer} from './filter';
import {TermReducer} from './term';

export default combineReducers({
  todos: TodoReducer,
  currentFilter: FilterReducer,
  term: TermReducer
});

// store will take `initialState` and pass down to this reducer
export const initialState: ITodosState = {
  todos: List([{
    id: 100,
    text: 'todo test',
    completed: false
  }]),
  currentFilter: 'SHOW_ALL',
  term: ''
};
