export class BaseStore {
  static initialized = false;

  constructor(private store) {
    if (!store) {
      throw new Error('store cannot be undefined. Make sure to pass' +
        ' the store as the only argument of the constructor.');
    }

    if (BaseStore.initialized) {
      throw new Error('Only one store can exist per application.');
    }

    BaseStore.initialized = true;
  }

  getState(): any {
    return this.store.getState();
  }

  dispatch(action: any): any {
    this.store.dispatch(action);
  }

  subscribe(listener: Function): any {
    this.store.subscribe(() => listener(this.getState()));
  }
}
