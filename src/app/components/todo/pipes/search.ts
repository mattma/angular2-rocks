import {Pipe, PipeTransform} from 'angular2/core';
import {BaseException} from 'angular2/src/facade/exceptions';
import {List} from 'immutable';
import {ITodos} from '../redux/actions/todo';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(todos: ITodos, [status = 'SHOW_ALL']): ITodos {
    if (!List.isList(todos)) {
      throw new BaseException('search.pipe requires a type "ITodos" as input');
    }

    return filterTodos(todos, status);
  }
}

function filterTodos(todos: ITodos, status: string): ITodos {
  switch (status) {
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed).toList();
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed).toList();
    case 'SHOW_ALL':
      return todos;
    default:
      return todos;
  }
}
