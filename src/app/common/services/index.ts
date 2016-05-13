import {TodoService} from '../../components/todo/services/todo';
import {FilterService} from '../../components/todo/services/filter';
import {TermService} from '../../components/todo/services/term';

export const APP_SERVICE_PROVIDERS: any[] = [
  TodoService,
  FilterService,
  TermService
];
