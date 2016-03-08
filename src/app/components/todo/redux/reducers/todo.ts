import {List} from 'immutable';
import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  CLEAR_COMPLETED,
  COMPLETE_ALL,
  EDIT_TODO
} from '../actions/todo';
import {ITodos, ITodo} from '../actions/todo';

const cuid = require('cuid');

const initialState: ITodos = List<ITodos>();

// After dispatching the action the rootReducer will be called
// by the store passing the currentState
export function TodoReducer(state: ITodos = initialState, action): ITodos {
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

// creates a new array toggling the todo matching
// the action.id being dispatched and maintaining the rest.
function toggleTodo(todos: ITodos, action): ITodos {
  const index = getIndex(todos, action);
  let toggleTodo: ITodo = todos.get(index);

  return todos.set(index, {
    id: toggleTodo.id,
    text: toggleTodo.text,
    completed: !toggleTodo.completed
  });
}

function editTodo(todos: ITodos, action): ITodos {
  const index = getIndex(todos, action);
  return todos.update(index, t => {
    t.text = action.text;
    return t;
  });
}

function removeTodo(todos: ITodos, action): ITodos {
  const index = getIndex(todos, action);
  return todos.delete(index);
}

function clearCompleted(todos: ITodos): ITodos {
  return todos.filter((t: ITodo) => !t.completed).toList();
}

function completeAll(todos: ITodos, action): ITodos {
  return todos.map((t: ITodo) => {
    if (t.completed !== action.isChecked) {
      t.completed = action.isChecked;
    }
    return t;
  }).toList();
}

function getIndex(state: ITodos, action): number {
  return state.findIndex((todo: ITodo) => todo.id === action.id);
}
