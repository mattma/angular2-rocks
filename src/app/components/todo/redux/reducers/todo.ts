import {List} from 'immutable';
import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO
} from '../actions/todo';
import {ITodo} from '../../types/todo.d';

const initialState = List([]);
// After dispatching the action the rootReducer will be called
// by the store passing the currentState
export function TodoReducer(state: List<ITodo> = initialState, action): List<ITodo> {
  switch (action.type) {
    case ADD_TODO:
      return state.push({
        id: action.id,
        text: action.text,
        completed: action.completed
      });
    case TOGGLE_TODO:
      return toggleTodo(state, action);
    case REMOVE_TODO:
      return removeTodo(state, action);
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
