import {combineReducers} from 'redux';
import {TodoReducer as todos} from '../../components/todo/redux/reducers/todo';
import {FilterReducer as currentFilter} from '../../components/todo/redux/reducers/filter';
import {TermReducer as term} from '../../components/todo/redux/reducers/term';

export default combineReducers({
  todos,
  currentFilter,
  term
});
