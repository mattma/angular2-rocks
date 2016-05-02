import {Injectable} from 'angular2/core';
import {Store} from '@ngrx/store';
import {List} from 'immutable';

// export interface ITodo extends Map<string, string> {
export interface ITodo {
  id?: string;
  text?: string;
  completed?: boolean;
}

export interface ITodos extends List<ITodo> {}

export interface ITodoAction {
  type: string;
  id?: string;
  text?: string;
  completed?: boolean;
  filter?: string;
  term?: string;
  isChecked?: boolean;
}

@Injectable()
export class TodoModel {
  constructor(private store: Store<any>) {
    const store$ = this.store.select<ITodos>('todos');
    console.log('store$: ', store$);
  }
}
