# Reducers

Now that we've added redux, let's make use of it. But first, an explanation of what redux is. There are about a million good explanations on redux, so I'll describe it in the way that I think about it. And I'll try to in 10 sentences. 

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

### Reducer

It looks like we'll need to add a `count` property on the store so that the app can send updates to it (up) and receive updates from it (down).  To define a property on the store you use something called a `reducer`.  You'll get a good understanding of what a reducer is by just creating one. So we'll jump right to it.

Create a new file `src/features/make-a-wish/make-a-wish.reducers.js` with the following.

```javascript
const countInitialState = 0;
export const count = (state = countInitialState, action) => {
  switch (action.type) {
    case 'COUNT_UPDATED' :
      return action.payload;
    default:
      return state;
  }
};
```

Before I explain this, it'd be nice to see what this does. Let's add this reducer to the store, and then log it in the `console` to see what the shape of the store will look after the reducer is added. 

Open `src/index.js` and console log the store as is:

```diff
import store from './store';

+ console.log('The store:', store.getState());
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

Now run the app and open up the console. What do'ya see? Nothing, well pretty much nothing, right? It's just an empty object. This makes sense because haven't _added_ the reducer to the store. Let's do that now.

Open `src/store.js` . Import the `count` reducer from  `make-a-wish.reducers` and added it to the combined reducers:

```diff
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createLogger } from 'redux-logger';
+ import { count } from './features/make-a-wish/make-a-wish.reducers';

const logger = createLogger({
  collapsed: true,
});

const rootReducer = combineReducers({
+  count
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

Save and run the app, let's see the shape of the store now...

Now there's a `count` property. And it's defaulted to `0 ` !

Quick reminder while I got you here: that's the **store**! It's just a plain old JavaScript object. And we can add more properties to it by defining more `reducers`.

Let's go back the `make-a-wish.reducers.js` reducer file for an explanation:

```javascript
const countInitialState = 0;
export const count = (state = countInitialState, action) => {
  switch (action.type) {
    case 'COUNT_UPDATED' :
      return action.payload;
    default:
      return state;
  }
};
```

First line:

```javascript
export const count = (state = countInitialState, action) => {
```

When Redux creates the store, it goes and fires all the `reducers` . Here is what Redux says when it reads *this* reducer:

- `count` will be the property on my store.
- When I fire `count` I will always pass it two properties, `state` and `action` . No one has to worry about that, I'll always pass it those properties so you can count on them being there.
- If I have nothing to give for `state` , I'll use a default property. In this case `countInitialState`.  This way when the app first loads there will be a value for the `count` property on the store. 

If you look at the rest of this snippet, it's just a switch statement. A `reducer` 's job is to figure out when to updated a single property on the store. This switch statement is trying to figure out what `action` was fired. If the action fired was `COUNT_UPDATED` it will update the `count` property with the new returned value: `return action.payload`. Otherwise it will return what was already there `return state`. 

So what's this `action` business? 

Switch to branch `03-Actions`

