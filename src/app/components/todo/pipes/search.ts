import { Pipe, PipeTransform } from '@angular2/core';
import { Todo } from '../services/todo-model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(todos: Array<Todo>, status = 'SHOW_ALL'): Array<Todo> {
    return filterTodos(todos, status);
  }
}

function filterTodos(todos: Array<Todo>, status: string): Array<Todo> {
  switch (status) {
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ALL':
      return todos;
    default:
      return todos;
  }
}
