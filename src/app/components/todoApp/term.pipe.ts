import {Pipe, PipeTransform} from 'angular2/core';
import {ITodo} from './types/todo.d';

@Pipe({
  name: 'term'
})
export class TermPipe implements PipeTransform {
  transform(todos = [], [term = '']): ITodo[] {
    return todos.filter(todo => todo.text.startsWith(term));
  }
}
