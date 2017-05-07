
const getRandomNumber = () => {
  const min = 25; 
  const max = 80;
  return Math.floor(Math.random()*(max-min+1)+min);
};

const initialMinLetterState = getRandomNumber();
export const minLetterCount = (state = initialMinLetterState, action) => {
    return state;
}

const initialIsWishMadeState = false;
export const isWishMade = (state = initialIsWishMadeState, action) => {
    switch (action.type) {
    case 'WISH_MADE' :
      return true;
    default:
      return state;
  }
}