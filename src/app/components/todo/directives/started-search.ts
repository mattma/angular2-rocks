import { Component } from '@angular/core';
import { TermService } from '../services/term';

@Component({
  selector: 'started-search',
  template: `
    <div>
      <label for="filter">Filter todo</label>
      <input type="text" #started
        (keyup)="filterWord(started.value)" />
    </div>
  `
})
export class StartedSearch {
  constructor(private termService: TermService) { }

  filterWord(term: string): void {
    this.termService.startedLetter(term);
  }
}
