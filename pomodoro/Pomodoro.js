import store from './store';
import { toggle, reset } from './duck/actions';
import { getCurrentState } from './duck/selectors';

export default class Pomodoro {

  static reset() {
    store.dispatch(reset());
  }

  static toggle() {
    store.dispatch(toggle());
  }

  static state() {
    return getCurrentState(store.getState());
  }
}