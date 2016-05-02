import {Reducer, Action} from '@ngrx/store';
import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  CLEAR_COMPLETED,
  COMPLETE_ALL,
  EDIT_TODO,
  ITodo,
  ITodos,
  ITodoAction
} from './constant';
import {List} from 'immutable';
const cuid = require('cuid');

// creates a new array toggling the todo matching
// the action.id being dispatched and maintaining the rest.
function toggleTodo(todos: ITodos, action: ITodoAction): ITodos {
  const index = getIndex(todos, action);
  let toggleTodo: ITodo = todos.get(index);

  return todos.set(index, {
    id: toggleTodo.id,
    text: toggleTodo.text,
    completed: !toggleTodo.completed
  });
}

function editTodo(todos: ITodos, action: ITodoAction): ITodos {
  const index = getIndex(todos, action);
  return todos.update(index, t => {
    t.text = action.text;
    return t;
  });
}

function removeTodo(todos: ITodos, action: ITodoAction): ITodos {
  const index = getIndex(todos, action);
  return todos.delete(index);
}

function clearCompleted(todos: ITodos): ITodos {
  return todos.filter((t: ITodo) => !t.completed).toList();
}

function completeAll(todos: ITodos, action: ITodoAction): ITodos {
  return todos.map((t: ITodo) => {
    if (t.completed !== action.isChecked) {
      t.completed = action.isChecked;
    }
    return t;
  }).toList();
}

function getIndex(state: ITodos, action: ITodoAction): number {
  return state.findIndex((todo: ITodo) => todo.id === action.id);
}


const initialState: ITodos = List<ITodos>();

export const TodoReducer: Reducer<ITodos> = (state: ITodos = initialState, action: Action) => {
  switch (action.type) {
    case ADD_TODO:
      return state.push({
        id: cuid(),
        text: action.text,
        completed: action.completed
      });

    default:
      return state;
  }
};
