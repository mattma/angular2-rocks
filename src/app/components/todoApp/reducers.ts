import {combineReducers} from 'redux';
import {TodoReducer} from './redux/reducers/todo';
import {FilterReducer} from './redux/reducers/filter';
import {TermReducer} from './redux/reducers/term';

export default combineReducers({
  todos: TodoReducer,
  currentFilter: FilterReducer,
  term: TermReducer
});
