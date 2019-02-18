import { Settings, Pomodoro } from './records';
import types from './types';
import { STATES } from './consts';

export const settings = (state = new Settings(), action) => {
  switch(action.type){
    case types.SETTINGS_TEST:
      return state;
  }

  return state;
}

export const pomodoro = (state = new Pomodoro(), action) => {
  console.log(action.type);
  switch(action.type){
    case types.TOMATO_CURRENT_TIME_SET:
      return state
              .set('time', action.time)
              .set('current_time', action.current_time);
    case types.TOMATO_TIMER_STARTED:
      return state
              .set('timer', action.timer)
              .set('state', STATES.STARTED);
    case types.TOMATO_TIMER_STOPPED:
      return state
              .set('timer', null)
              .set('state', STATES.PAUSED);
    case types.TOMATO_TIME_RESET:
      return state
              .set('time', action.time)
              .set('current_time', action.current_time);
    case types.NEXT_ROUND_SET:
      return state
              .set('mode', action.mode)
              .set('current_time', action.current_time)
              .set('time', action.time);
    case types.NEXT_SESSION_SET:
      return state
              .set('mode', action.mode)
              .set('current_time', action.current_time)
              .set('time', action.time)
              .set('session', action.session)
              .set('round', action.round);
    case types.ROUND_TIME_EXPIRED:
      return state
              .set('mode', action.mode)
              .set('current_time', action.current_time)
              .set('time', action.time)
              .set('round', action.round)
  }

  return state;
}