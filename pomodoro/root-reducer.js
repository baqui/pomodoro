import { combineReducers } from 'redux';

import { settings, pomodoro } from './duck/reducers';

export default combineReducers({
  settings,
  pomodoro
});
