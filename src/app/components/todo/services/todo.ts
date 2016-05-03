import {Injectable} from 'angular2/core';
import {Dispatcher, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject'
import {Todo} from './todo-model';

import * as type from '../reducers/constant';

@Injectable()
export class TodoService {
  todos$: Observable<Todo[]>;

  private addNewTodo$: Subject<any> = new Subject();
  private deleteTodo$: Subject<any> = new Subject();
  private updateTodo$: Subject<any> = new Subject();

  constructor(
    private store: Store<any>,
    dispatcher: Dispatcher<any>
  ) {
    this.todos$ = store.select('todos');

    this.addNewTodo$
      .map((todo: Todo) => ({type: type.ADD_TODO, payload: todo}))
      .subscribe(dispatcher);

    this.updateTodo$
      .map((todo: Todo) => ({
        type: type.EDIT_TODO,
        payload: {id: todo.id, text: todo.text}
      }))
      .subscribe(dispatcher);
  }

  createNewTodo(text: string): void {
    this.addNewTodo$.next(new Todo(text));
  }
  
  updateTodo(todo: Todo): void {
    this.updateTodo$.next(todo);
  }
}
