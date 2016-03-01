import {List} from 'immutable';

export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const SET_CURRENT_FILTER = 'SET_CURRENT_FILTER';
export const STARTED_LETTER = 'STARTED_LETTER';
export const COMPLETE_ALL = 'COMPLETE_ALL';
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';

// export interface ITodo extends Map<string, string> {
export interface ITodo {
  id?: string;
  text?: string;
  completed?: boolean;
}

export interface ITodos extends List<ITodo> {}

// TodoActions will act as an ActionCreator with a public method
// for each action. These methods are used only to create an Action,
// not to dispatch it.
export class TodoActions {
  // Action is only a simple POJO with a type string property
  // that identifies the type of action.
  addTodo(text: string) {
    return {
      type: ADD_TODO,
      text: text,
      completed: false
    };
  }

  toggleTodo(id: string) {
    return {
      type: TOGGLE_TODO,
      id: id
    };
  }

  removeTodo(id: string) {
    return {
      type: REMOVE_TODO,
      id: id
    };
  }

  setCurrentFilter(filter: string) {
    return {
      type: SET_CURRENT_FILTER,
      filter: filter
    };
  }

  startedLetter(term: string) {
    return {
      type: STARTED_LETTER,
      term: term
    };
  }

  editTodo(id: string, text: string) {
    return {
      type: EDIT_TODO,
      id,
      text
    };
  }

  completeAll(isChecked: boolean) {
    return {
      type: COMPLETE_ALL,
      isChecked
    };
  }

  clearCompleted() {
    return {
      type: CLEAR_COMPLETED
    };
  }
}
