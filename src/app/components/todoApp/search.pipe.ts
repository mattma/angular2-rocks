import {Pipe, PipeTransform} from 'angular2/core';
import {BaseException} from 'angular2/src/facade/exceptions';
import {List} from 'immutable';
import {ITodo} from './types/todo.d';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(todos: List<ITodo>, [status = 'SHOW_ALL']): List<ITodo> {
    if (!List.isList(todos)) {
      throw new BaseException('search.pipe requires a type "List<ITodo>" as input');
    }

    return FilterTodos(todos, status);
  }
}

function FilterTodos(todos, status: string): List<ITodo> {
  switch (status) {
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ALL':
    default:
      return todos;
  }
}
