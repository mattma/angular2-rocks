export class Store {
  static initialized = false;

  constructor(private store) {
    if (!store) {
      throw new Error('store cannot be undefined. Make sure to pass' +
        ' the store as the only argument of the constructor.');
    }

    if (Store.initialized) {
      throw new Error('Only one store can exist per application.');
    }

    Store.initialized = true;
  }

  getState() {
    return this.store.getState();
  }

  dispatch(action) {
    this.store.dispatch(action);
  }

  subscribe(listener: Function) {
    this.store.subscribe(() => listener(this.getState()));
  }
}
