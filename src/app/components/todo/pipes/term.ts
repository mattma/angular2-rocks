import {Pipe, PipeTransform} from 'angular2/core';
import {List} from 'immutable';
import {ITodo} from '../redux/actions/todo';

@Pipe({
  name: 'term'
})
export class TermPipe implements PipeTransform {
  transform(todos: List<ITodo>, [term = '']: string[]) {
    return todos.filter((todo: ITodo) => todo.text.startsWith(term)).toList();
  }
}
