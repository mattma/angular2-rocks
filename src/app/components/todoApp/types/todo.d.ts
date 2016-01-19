export interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}

export interface ITodos {
  todos: ITodo[];
  currentFilter: string;
  term: string;
}
