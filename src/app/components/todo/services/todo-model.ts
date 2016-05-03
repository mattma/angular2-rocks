const cuid = require('cuid');

export class Todo {
  completed: boolean = false;
  id: string;
  text: string;

  constructor(title: string) {
    this.text = title;
    this.id = cuid();
  }
}
