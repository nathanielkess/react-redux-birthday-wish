
const getRandomNumber = () => {
  const min = 25; 
  const max = 80;
  return Math.floor(Math.random()*(max-min+1)+min);
};

const initialMinLetterState = getRandomNumber();
export const minLetterCount = (state = initialMinLetterState) => {
    return state;
}

const initialIsWishMadeState = false;
export const isWishMade = (state = initialIsWishMadeState, { type }) => {
    switch (type) {
    case 'WISH_MADE' :
    case 'WISH_TIMER_ENDED' :
      return true;
    default:
      return state;
  }
}
