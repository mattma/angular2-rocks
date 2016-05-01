import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({
  name: 'trim'
})
export class TrimPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.trim();
  }
}
