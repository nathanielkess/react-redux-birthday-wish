import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { count } from './features/make-a-wish/make-a-wish.reducers';
import { minLetterCount, isWishMade } from './features/grant-wish/grant-wish.reducers';

const logger = createLogger({
  collapsed: true,
});

const rootReducer = combineReducers({
  count,
  minLetterCount,
  isWishMade,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(logger),
  ),
);

export default store;