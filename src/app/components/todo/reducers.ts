import {combineReducers} from 'redux';
import {TodoReducer as todos} from './redux/reducers/todo';
import {FilterReducer as currentFilter} from './redux/reducers/filter';
import {TermReducer as term} from './redux/reducers/term';

export default combineReducers({
  todos,
  currentFilter,
  term
});
