import {TodoService} from '../../components/todo/services/todo';
import {FilterService} from '../../components/todo/services/filter';

export const APP_SERVICE_PROVIDERS: any[] = [
  TodoService,
  FilterService
];
