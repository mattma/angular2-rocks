import {
  it,
  inject,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';
import {Title} from './title';

interface ITitle {
  value: string;
}

describe('Title', () => {
  let title: ITitle;

  beforeEach(() => {
    title = new Title();
  });

  it('should return the list of names', () => {
    expect(title.value).toEqual('Angular 2');
  });
});
