import { Record } from 'immutable';
import { STATES, MODES } from './consts';

const ROUND_TIME = 25 * 60 * 1000; //25m in milliseconds
const SHORT_BREAK_TIME = 5 * 60 * 1000; //5m in milliseconds
const LONG_BREAK_TIME = 15 * 60 * 1000; //15m in milliseconds

export const Settings = Record({
  btt_widget_uuid: '4FB70D65-DB91-45AD-A604-E772C2BBB540',
  btt_server_port: 12345,
  btt_server_url: 'http://127.0.0.1',
  round_time: ROUND_TIME, 
  short_break_time: SHORT_BREAK_TIME,
  long_break_time: LONG_BREAK_TIME,
  round_number_in_session: 4
});

export const Pomodoro = Record({
  state: STATES.PRISTINE,
  time: '00:00',
  current_time: ROUND_TIME,
  timer: null,
  mode: MODES.ROUND,
  round: 0,
  session: 1
});