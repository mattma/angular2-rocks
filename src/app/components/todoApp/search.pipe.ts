import {Pipe, PipeTransform} from 'angular2/core';
import {isBlank, isPresent, isArray} from 'angular2/src/facade/lang';
import {BaseException} from 'angular2/src/facade/exceptions';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(todos, args) {
    if (isBlank(args) || args.length === 0) {
      throw new BaseException('VisibleTodos pipe requires one argument');
    }
    if (isPresent(todos) && !isArray(todos)) {
      throw new BaseException('VisibleTodos pipe requires an Array as input');
    }
    return this.getVisibleTodos(todos, args[0]);
  }

  private getVisibleTodos(todos, filter) {
    switch (filter) {
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed);
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed);
      case 'SHOW_ALL':
      default:
        return todos;
    }
  };
}