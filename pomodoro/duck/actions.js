import axios from 'axios';

import '../format';
import { ROUND_ICONS, BTT_UPDATE_WIDGET_URL, msToTime, STATES, MODES } from './consts';
import { 
  getPomodoroParams, 
  getCurrentTime, 
  getTimer, 
  getDefaultRoundTime, 
  getPomodoroCurrentState, 
  getPomodoroState, 
  getNextRoundParams,
  getNextSessionParams,
  getNextModeParams
} from './selectors';
import types from './types';

export const toggle = () => (dispatch, getState) => {
  const state = getPomodoroState(getState());
  const START_TIMER = [STATES.PAUSED, STATES.PRISTINE].indexOf(state) > -1;
  const STOP_TIMER = state === STATES.STARTED;

  switch(true) {
    case START_TIMER:
      return dispatch(startTimer());
    case STOP_TIMER:
      return dispatch(stopTimer())
  }
}

export const reset = () => (dispatch, getState) => {
  //TODO set mode to round while reset
  const state = getState();
  const current_time = getDefaultRoundTime(state);
  const time = msToTime(current_time);

  dispatch(stopTimer());

  dispatch({
    type: types.TOMATO_TIME_RESET,
    time,
    current_time
  });
  
  dispatch(updateBtt());
}

const calculateState = () => (dispatch, getState) => {

  const currentState = getState();
  const {
    current_time,
    mode
  } = getPomodoroCurrentState(currentState);

  const ROUND_TIME_EXPIRED = mode === MODES.ROUND && current_time < 1000;
  const LONG_BREAK_TIME_EXPIRED = mode === MODES.LONG_BREAK && current_time < 1000;
  const SHORT_BREAK_TIME_EXPIRED = mode === MODES.SHORT_BREAK && current_time < 1000;

  switch(true) {
    case ROUND_TIME_EXPIRED:
      return dispatch(setNextMode());
    case LONG_BREAK_TIME_EXPIRED:
      return dispatch(setNextSession());
    case SHORT_BREAK_TIME_EXPIRED:
      return dispatch(setNextRound());
  }
}

const setNextRound = () => (dispatch, getState) => {
  const {time, round_time} = getNextRoundParams(getState());
  dispatch({
    type: types.NEXT_ROUND_SET,
    mode: MODES.ROUND,
    current_time: round_time,
    time
  });
}

const setNextSession = () => (dispatch, getState) => {
  const {session, time, round_time} = getNextSessionParams(getState());
  dispatch({
    type: types.NEXT_SESSION_SET,
    mode: MODES.ROUND,
    current_time: round_time,
    time,
    round: 0,
    session: session + 1
  });
}

const setNextMode = () => (dispatch, getState) => {
  const { round, round_number_in_session, short_break_time, long_break_time } = getNextModeParams(getState())
  const nextMode = round + 1 < round_number_in_session ? MODES.SHORT_BREAK : MODES.LONG_BREAK;
  const nextTime = nextMode === MODES.SHORT_BREAK ? short_break_time : long_break_time;

  dispatch({
    type: types.ROUND_TIME_EXPIRED,
    mode: nextMode,
    current_time: nextTime,
    time: msToTime(nextTime),
    round: round + 1
  });
}

const updateTime = () => (dispatch, getState) => {
  const currentTime = getCurrentTime(getState());
  const nextTime = currentTime - 1000;
  dispatch({
    type: types.TOMATO_CURRENT_TIME_SET,
    time: msToTime(nextTime),
    current_time: nextTime
  });
}

const startTimer = () => dispatch => {
  const timer = setInterval( () => {
    dispatch(calculateState());
    dispatch(updateTime());
    dispatch(updateBtt());
  }, 1000);

  dispatch({
    type: types.TOMATO_TIMER_STARTED,
    timer
  });
}

const stopTimer = () => (dispatch, getState) => {
  const timer = getTimer(getState());
  timer && clearInterval(timer);
  dispatch({ type: types.TOMATO_TIMER_STOPPED });
}

const updateBtt = () => (_, getState) => {
  const params = getPomodoroParams(getState());
  axios.get(`${params.btt_server_url}:${params.btt_server_port}${BTT_UPDATE_WIDGET_URL.format({
    uuid: params.btt_widget_uuid,
    text: params.time,
    icon: ROUND_ICONS[params.round]
  })}`);
}