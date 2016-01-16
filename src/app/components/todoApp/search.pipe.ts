import {Pipe, PipeTransform} from 'angular2/core';
import {isPresent, isArray} from 'angular2/src/facade/lang';
import {BaseException} from 'angular2/src/facade/exceptions';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(todos, [status = 'SHOW_ALL']) {
    if (isPresent(todos) && !isArray(todos)) {
      throw new BaseException('search.pipe requires an Array as input');
    }

    return FilterTodos(todos, status);
  }
}

function FilterTodos(todos, status) {
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
