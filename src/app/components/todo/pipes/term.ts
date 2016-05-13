import {Pipe, PipeTransform} from 'angular2/core';
import {Todo} from '../services/todo-model';

@Pipe({
  name: 'term'
})
export class TermPipe implements PipeTransform {
  transform(todos: Array<Todo>, term = ''): Array<Todo> {
    return todos.filter((todo: Todo) => todo.text.startsWith(term));
  }
}
