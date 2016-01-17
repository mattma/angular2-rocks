import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({
  name: 'term'
})
export class TermPipe implements PipeTransform {
  transform(todos = [], [term = '']) {
    return todos.filter(todo => todo.text.startsWith(term));
  }
}
