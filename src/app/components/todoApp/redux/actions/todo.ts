export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const SET_CURRENT_FILTER = 'SET_CURRENT_FILTER';
export const STARTED_LETTER = 'STARTED_LETTER';

// TodoActions will act as an ActionCreator with a public method
// for each action. These methods are used only to create an Action,
// not to dispatch it.
export class TodoActions {
  nextToDoId: number;

  constructor() {
    this.nextToDoId = 0;
  }

  // Action is only a simple POJO with a type string property
  // that identifies the type of action.
  addTodo(text: string) {
    return {
      type: ADD_TODO,
      id: this.nextToDoId++,
      text: text,
      completed: false
    };
  };

  toggleTodo(id: number) {
    return {
      type: TOGGLE_TODO,
      id: id
    };
  };

  removeTodo(id: number) {
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
}
