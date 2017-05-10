
const isTimeRemainingInitialState = true;
export const isTimeRemaining = (state = isTimeRemainingInitialState, action) => {
  switch (action.type) {
    case 'WISH_TIMER_ENDED' :
      return false;
    default:
      return state;
  }
};

const isTimerPausedInitialState = false;
export const isTimerPaused = (state = isTimerPausedInitialState, action) => {
  switch (action.type) {
    case 'WISH_TIMER_PAUSED' :
    case 'WISH_MADE' :
      return true;
    default:
      return state;
  }
};