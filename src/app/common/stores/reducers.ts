import {combineReducers} from '@ngrx/store';

import {counter} from '../../components/counter/reducers/counter';
import {TodoReducer as todos} from '../../components/todo/reducers/todo';
import {FilterReducer as currentFilter} from '../../components/todo/reducers/filter';
import {TermReducer as term} from '../../components/todo/reducers/term';

export const initialValue = { 
  counter: 0,
  todos: [],
  currentFilter: 'SHOW_ALL',
  term: ''
};

export default combineReducers({
  counter,
  todos,
  currentFilter,
  term
});
