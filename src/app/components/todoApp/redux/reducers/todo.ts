import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  SET_CURRENT_FILTER,
  STARTED_LETTER
} from '../actions/todo';
import {ITodo, ITodosState} from '../../types/todo.d';
import {List} from 'immutable';

// store will take `initialState` and pass down to this reducer
export const initialState: ITodosState = {
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
export function TodoReducer(state: ITodosState, action): ITodosState {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: state.todos.push({
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
        todos: removeTodo(state.todos, action),
        currentFilter: state.currentFilter,
        term: state.term
      };
    case SET_CURRENT_FILTER:
      return {
        todos: state.todos,
        currentFilter: action.filter,
        term: state.term
      };
    case STARTED_LETTER:
      return {
        todos: state.todos,
        currentFilter: state.currentFilter,
        term: action.term
      };
    default:
      return state;
  }
};

// creates a new array toggling the todo matching
// the action.id being dispatched and maintaining the rest.
function toggleTodo(todos: List<ITodo>, action): List<ITodo> {
  const index = getIndex(todos, action);
  let toggleTodo: ITodo = todos.get(index);

  return todos.set(index, {
    id: toggleTodo.id,
    text: toggleTodo.text,
    completed: !toggleTodo.completed
  });
}

function removeTodo(todos: List<ITodo>, action): List<ITodo> {
  const index = getIndex(todos, action);
  return todos.delete(index);
}

function getIndex(state: List<ITodo>, action): number {
  return state.findIndex((todo: ITodo) => todo.id === action.id);
}
