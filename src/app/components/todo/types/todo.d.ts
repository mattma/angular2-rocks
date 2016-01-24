import {List} from 'immutable';

export interface ITodo {
  id: string;
  text: string;
  completed: boolean;
}

export interface ITodos {
  todos: List<ITodo>;
}

export interface ITodosState extends ITodos {
  currentFilter: string;
  term: string;
}
