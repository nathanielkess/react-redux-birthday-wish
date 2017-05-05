# To the store and back

Now that we've added redux, let's make use of it. But first, an explanation of what redux is. There are about a million good explanations on redux, so I'll describe it in the way that I think about. And I'll try to in 10 sentences. 

**Redux, one million and one:** You have an app, this app. Picture it on the ground. Redux has this thing called a "store" (*it's just a big JavaScript object*). Picture the store in the sky above the app. Anytime your app needs to remember something (state), for example `isUserLoggedIn: true`, then send that information up. To the sky! Aka, the store. Anytime the store changes, it will drop that information down to the app. That's it. What goes up, must come down. 

Let's do that. 

##### Redux-ify the make-a-wish feature.

We'll start with `make-wish-container.js`, let's take all the state out of it and move up, to the store. Just get that garbage right out of there. The first piece of state I see is the `count`.

`src/features/make-a-wish/make-a-wish.container.js`

```diff
constructor(props) {
    super(props);
+    this.state = {
+      count:0
+    }
    this.handleWishUpdate = this.handleWishUpdate.bind(this);
  }
```











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

