import { msToTime } from "./consts";

export const getPomodoroParams = state => ({
  btt_server_url: state.settings.btt_server_url,
  btt_widget_uuid: state.settings.btt_widget_uuid,
  btt_server_port: state.settings.btt_server_port,
  round: state.pomodoro.round,
  time: state.pomodoro.time
});

export const getNextModeParams = state => ({
  round: state.pomodoro.round,
  round_number_in_session: state.settings.round_number_in_session,
  short_break_time: state.settings.short_break_time,
  long_break_time: state.settings.long_break_time
});

export const getCurrentTime = state => state.pomodoro.current_time;

export const getTimer = state => state.pomodoro.timer;

export const getDefaultRoundTime = state => state.settings.round_time;

export const getPomodoroCurrentState = state => state.pomodoro.toJS();

export const getPomodoroState = state => state.pomodoro.state;

export const getSettings = state => state.settings.toJS();

export const getState = state => state.pomodoro.state;

export const getNextRoundParams = state => ({
  round: state.pomodoro.round,
  round_time: state.settings.round_time,
  time: msToTime(state.settings.round_time)
});

export const getNextSessionParams = state => ({
  session: state.pomodoro.session,
  round_time: state.settings.round_time,
  time: msToTime(state.settings.round_time)
});