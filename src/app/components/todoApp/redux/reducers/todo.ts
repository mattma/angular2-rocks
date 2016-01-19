import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  SET_CURRENT_FILTER,
  STARTED_LETTER
} from '../actions/todo';
import {ITodo, ITodos} from '../../types/todo.d';
import {List} from 'immutable';

// store will take `initialState` and pass down to this reducer
export const initialState: ITodos = {
  todos: List([{
    id: 100,
    text: 'todo 1',
    completed: false
  }]),
  currentFilter: 'SHOW_ALL',
  term: ''
};

// After dispatching the action the rootReducer will be called
// by the store passing the currentState
export function TodoReducer (state, action): ITodos {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: state.todos.concat({
          id: action.id,
          text: action.text,
          completed: action.completed
        }),
        currentFilter: state.currentFilter,
        term: state.term
      };
    case TOGGLE_TODO:
      return {
        todos: toggleTodo(state.todos, action),
        currentFilter: state.currentFilter,
        term: state.term
      };
    case REMOVE_TODO:
      return {
        todos: state.todos.filter(todo => todo.id !== action.id),
        currentFilter: state.currentFilter,
        term: state.term
      };
    case SET_CURRENT_FILTER:
      return {
        todos: state.todos.map(todo => todo),
        currentFilter: action.filter,
        term: state.term
      };
    case STARTED_LETTER:
      return {
        todos: state.todos.map(todo => todo),
        currentFilter: state.currentFilter,
        term: action.term
      };
    default:
      return state;
  }
};

// creates a new array toggling the todo matching
// the action.id being dispatched and maintaining the rest.
function toggleTodo(todos, action): List<ITodo> {
  // map returns new array
  return todos.map(todo => {
    // skip other items
    if (todo.id !== action.id)
      return todo;
    // toggle
    return {
      id: todo.id,
      text: todo.text,
      completed: !todo.completed
    };
  });
}
