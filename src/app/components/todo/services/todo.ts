import {Injectable} from 'angular2/core';
import {Dispatcher, Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject'
import {Todo} from './todo-model';

import {ADD_TODO} from '../reducers/constant';

@Injectable()
export class TodoService {
  todos$: Observable<Todo[]>;

  private createTask$: Subject<any> = new Subject();
  private deleteTask$: Subject<any> = new Subject();

  constructor(
    private store: Store<any>,
    dispatcher: Dispatcher<any>
  ) {
    this.todos$ = store.select('todos');

    this.createTask$
      .map((todo: Todo) => ({type: ADD_TODO, payload: todo}))
      .subscribe(dispatcher);
  }

  createTask(text: string): void {
    this.createTask$.next(new Todo(text));
  }
}
