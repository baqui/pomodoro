import Mode0 from '../assets/mode-0.png';
import Mode1 from '../assets/mode-1.png';
import Mode2 from '../assets/mode-2.png';
import Mode3 from '../assets/mode-3.png';
import Mode4 from '../assets/mode-4.png';

export const STATES = {
  PRISTINE: 'pristine',
  STARTED: 'started',
  PAUSED: 'paused'
}

export const MODES = {
  ROUND: 'round',
  SHORT_BREAK: 'short_break',
  LONG_BREAK: 'long_break'
}

export const ROUND_ICONS = [
  Mode0.replace('data:image/png;charset=utf-8;base64,', ''),
  Mode1.replace('data:image/png;charset=utf-8;base64,', ''),
  Mode2.replace('data:image/png;charset=utf-8;base64,', ''),
  Mode3.replace('data:image/png;charset=utf-8;base64,', ''),
  Mode4.replace('data:image/png;charset=utf-8;base64,', '')
]

export const BTT_UPDATE_WIDGET_URL = '/update_touch_bar_widget/?uuid=:uuid&text=:text&icon_data=:icon';

export const msToTime = duration => {
  let seconds = parseInt((duration/1000)%60);
  let minutes = parseInt((duration/(1000*60))%60);

  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${seconds}`;
}