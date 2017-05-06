
const countInitialState = 0;
export const count = (state = countInitialState, action) => {
  switch (action.type) {
    case 'COUNT_UPDATED' :
      return action.payload;
    default:
      return state;
  }
};