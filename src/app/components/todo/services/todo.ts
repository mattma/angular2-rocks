import {Injectable} from 'angular2/core';
import {Dispatcher} from '@ngrx/store';
import {Subject} from 'rxjs/Subject';

import * as type from '../reducers/constant';
import {Todo} from './todo-model';

@Injectable()
export class TodoService {
  private addNewTodo$: Subject<any> = new Subject();
  private removeTodo$: Subject<any> = new Subject();
  private updateTodo$: Subject<any> = new Subject();
  private toggleTodo$: Subject<any> = new Subject();
  private clearCompleteTodos$: Subject<any> = new Subject();
  private completeAllTodos$: Subject<any> = new Subject();

  constructor(dispatcher: Dispatcher<any>) {
    this.addNewTodo$
      .map((todo: Todo) => ({type: type.ADD_TODO, payload: todo}))
      .subscribe(dispatcher);

    this.updateTodo$
      .map((todo: Todo) => ({
        type: type.EDIT_TODO,
        payload: {id: todo.id, text: todo.text}
      }))
      .subscribe(dispatcher);

    this.removeTodo$
      .map((id: string) => ({
        type: type.REMOVE_TODO,
        payload: id
      }))
      .subscribe(dispatcher);

    this.toggleTodo$
      .map((id: string) => ({
        type: type.TOGGLE_TODO,
        payload: id
      }))
      .subscribe(dispatcher);

    this.clearCompleteTodos$
      .map(() => ({type: type.CLEAR_COMPLETED}))
      .subscribe(dispatcher);

    this.completeAllTodos$
      .map((isChecked: boolean) => ({
        type: type.COMPLETE_ALL,
        payload: isChecked
      }))
      .subscribe(dispatcher);
  }

  createNewTodo(text: string): void {
    this.addNewTodo$.next(new Todo(text));
  }

  toggleTodo(id: string): void {
    this.toggleTodo$.next(id);
  }
  
  updateTodo(todo: Todo): void {
    this.updateTodo$.next(todo);
  }

  removeTodo(id: string): void {
    this.removeTodo$.next(id);
  }

  clearCompleted(): void {
    this.clearCompleteTodos$.next({});
  }

  completeAll(isChecked: boolean): void {
    this.completeAllTodos$.next(isChecked);
  }
}
