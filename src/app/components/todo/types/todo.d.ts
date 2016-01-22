import {List} from 'immutable';

export interface ITodo {
  id: number;
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
