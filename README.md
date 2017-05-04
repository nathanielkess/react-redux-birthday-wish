# Add Redux

Now that we have an app. Let's take that state that's all over the place and move it to one spot. Redux! 



Install redux:

```
npm install redux --save
```



Install react-redux

```
npm install react-redux --save
```



Install redux-logger (optional, but just do it)

```
npm install redux-logger --save
```



Now let's tell the app that there is a **redux store**.

Create a new file a for at `src/store.js`

```javascript
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createLogger } from 'redux-logger';

const logger = createLogger({
  collapsed: true,
});

const rootReducer = combineReducers({
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(logger),
  ),
);

export default store;

```

So far this doesn't do anything. You'll have to take the exported `store` and *provide* it to the app.  Later you'll find out what `createLogger`,  `combineReducers` and `comoseEnhancers` is all about.  

Now *provide* the store to the app. Open `src/index.js` and update as follows.

```diff

import React from 'react';
+ import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
+ import store from './store';


ReactDOM.render(
+  <Provider store={store}>
    <App />
+  </Provider>,
  document.getElementById('root'),
);

```

If you run that app, there's no real magical change. Even worse, there's probably a new console error about `reducers`. Which is a perfect segue to the next bit. 

**The First Reducer.**

Switch to branch `02-first-reducer`

