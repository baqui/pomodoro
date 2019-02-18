import store from './store';
import { toggle, reset } from './duck/actions';

export default class Pomodoro {

  static reset() {
    store.dispatch(reset());
  }

  static toggle() {
    store.dispatch(toggle());
  }

  static state() {
    return store.getState();
  }
}