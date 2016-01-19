import {Pipe, PipeTransform} from 'angular2/core';
// import {List} from 'immutable';
// import {ITodo} from './types/todo.d';

@Pipe({
  name: 'term'
})
export class TermPipe implements PipeTransform {
  transform(todos = [], [term = '']) {
    return todos.filter(todo => todo.text.startsWith(term));
  }
}
