import {Pipe, PipeTransform} from 'angular2/core';
import {ITodos, ITodo} from '../redux/actions/todo';

@Pipe({
  name: 'term'
})
export class TermPipe implements PipeTransform {
  transform(todos: ITodos, [term = '']: string[]) {
    return todos.filter((todo: ITodo) => todo.text.startsWith(term)).toList();
  }
}
