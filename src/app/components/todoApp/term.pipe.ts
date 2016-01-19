import {Pipe, PipeTransform} from 'angular2/core';
import {List} from 'immutable';
import {ITodo} from './types/todo.d';

@Pipe({
  name: 'term'
})
export class TermPipe implements PipeTransform {
  transform(todos: List<ITodo>, [term = '']) {
    return todos.filter((todo: ITodo) => todo.text.startsWith(term)).toList();
  }
}
