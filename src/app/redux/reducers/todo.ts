import * as TodoActions from '../actions/todo';

const initialState = {
  todos: [],
  currentFilter: 'SHOW_ALL'
};

interface Reducer {
  todos: any[];
  currentFilter: string;
}

// After dispatching the action the rootReducer will be called
// by the store passing the currentState (initialState if undefined)
// and the user action.
export function TodoReducer (state = initialState, action): Reducer {
  switch (action.type) {
    case TodoActions.ADD_TODO:
      return {
        todos: state.todos.concat({
          id: action.id,
          text: action.text,
          completed: action.completed
        }),
        currentFilter: state.currentFilter
      };
    case TodoActions.TOGGLE_TODO:
      return {
        todos: toggleTodo(state.todos, action),
        currentFilter: state.currentFilter
      };
    case TodoActions.REMOVE_TODO:
      return {
        todos: state.todos.filter(todo => todo.id !== action.id),
        currentFilter: state.currentFilter
      };
    case TodoActions.SET_CURRENT_FILTER:
      return {
        todos: state.todos.map(todo => todo),
        currentFilter: action.filter
      };
    default:
      return state;
  }
};

// creates a new array toggling the todo matching
// the action.id being dispatched and maintaining the rest.
function toggleTodo(todos, action) {
  // map returns new array
  return todos.map(todo => {
    // skip other items
    if (todo.id !== action.id)
      return todo;
    // toggle
    return {
      id: todo.id,
      text: todo.text,
      completed: !todo.completed
    };
  });
}
