import { Reducer, Action } from '@ngrx/store';

import { Todo } from '../services/todo-model';
import * as type from '../reducers/constant';

export const todos: Reducer<any> = (state: Array<Todo>, action: Action) => {
  switch (action.type) {
    case type.ADD_TODO:
      return [...state, action.payload];

    case type.TOGGLE_TODO:
      return state.map((todo: Todo) => {
        if (todo.id === action.payload) {
          todo.completed = !todo.completed;
        }
        return todo;
      });

    case type.EDIT_TODO:
      const {id, text} = action.payload;
      return state.map((todo: Todo) => {
        if (todo.id === id) {
          todo.text = text;
        }
        return todo;
      });

    case type.REMOVE_TODO:
      return state.filter((todo: Todo) => todo.id !== action.payload);

    case type.CLEAR_COMPLETED:
      return state.filter((todo: Todo) => !todo.completed);

    case type.COMPLETE_ALL:
      return state.map((todo: Todo) => {
        if (todo.completed !== action.payload) {
          todo.completed = action.payload;
        }
        return todo;
      });

    default:
      return state;
  }
};
