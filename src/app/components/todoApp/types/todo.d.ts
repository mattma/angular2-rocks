import {List} from 'immutable';

export interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}

export interface ITodos {
  todos: List<ITodo>;
  currentFilter: string;
  term: string;
}
