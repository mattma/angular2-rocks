import {List} from 'immutable';
const cuid = require('cuid');
import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  CLEAR_COMPLETED,
  COMPLETE_ALL,
  EDIT_TODO
} from '../actions/todo';
import {ITodo} from '../actions/todo';

const initialState = List([]);
// After dispatching the action the rootReducer will be called
// by the store passing the currentState
export function TodoReducer(state: List<ITodo> = initialState, action): List<ITodo> {
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
      return clearCompleted(state, action);
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

function editTodo(todos: List<ITodo>, action): List<ITodo> {
  const index = getIndex(todos, action);
  return todos.update(index, t => {
    t.text = action.text;
    return t;
  });
}

function removeTodo(todos: List<ITodo>, action): List<ITodo> {
  const index = getIndex(todos, action);
  return todos.delete(index);
}

function clearCompleted(todos: List<ITodo>, action): List<ITodo> {
  return todos.filter(t => !t.completed).toList();
}

function completeAll(todos: List<ITodo>, action): List<ITodo> {
  return todos.map(t => {
    if (t.completed !== action.isChecked) {
      t.completed = action.isChecked;
    }
    return t;
  }).toList();
}

function getIndex(state: List<ITodo>, action): number {
  return state.findIndex((todo: ITodo) => todo.id === action.id);
}
