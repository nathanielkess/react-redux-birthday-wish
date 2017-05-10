# Wish timer feature

Alrighty, last bit. We're going to create a 'connected' component out of the `Timer	` component so we can get that `isTimeRemaining` piece of state in our Redux store.

Create a new folder and file at `src/features/wish-timer/wish-timer.reducer.js` For this reducer we'll expect an action, `WISH_TIMER_ENDED`, that updates a bool value on the state to represent no more time:

```javascript
const isTimeRemainingInitialState = true;
export const isTimeRemaining = (state = isTimeRemainingInitialState, action) => {
  switch (action.type) {
    case 'WISH_TIMER_ENDED' :
      return false;
    default:
      return state;
  }
};
```

While we're at it, let's create another reducer here for determaning if the timer is paused. It will default to false.  Under the previous reducer add this one:

```javascript
const isTimerPausedInitialState = false;
export const isTimerPaused = (state = isTimerPausedInitialState, action) => {
  switch (action.type) {
    case 'WISH_TIMER_PAUSED' :
      return true;
    default:
      return state;
  }
};
```

Now open `src/store.js` and add these reducers to the `rootReducer`.

```Diff
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { count } from './features/make-a-wish/make-a-wish.reducers';
import { minLetterCount, isWishMade } from './features/grant-wish/grant-wish.reducers';
+ import { isTimeRemaining, isTimerPaused } from './features/wish-timer/wish-timer.reducer';
```

```Diff
const rootReducer = combineReducers({
  count,
  minLetterCount,
  isWishMade,
+  isTimeRemaining,
+  isTimePaused,
});
```



Now we'll write some actions to commuinicate with these reducers. Create a new file at `src/wish-timer.actions.js`

```javascript
export const onComplete = () => 
  ({ 
    type: 'WISH_TIMER_ENDED', 
  });

export const onPauseTimer = () => 
  ({ 
    type: 'WISH_TIMER_PAUSED', 
  });
```



On to the "connected" component. Create a file at `src/wish-timer.container.js`. So we can leverage the existing timer component, but enhance it with redux state. Import `connect`, the actions, and the timer component:

```javascript
import { connect } from 'react-redux';
import * as actionProps from './wish-timer.actions';
import Timer from './../../components/timer';
```

The Timer component has a `bool` property called `pause` let's pull the new `isTimerPaused` property out of the Redux store so we can add it to the connected component.  

```javascript
const stateProps = (state) => ({
  pause: state.isTimerPaused,
});
```

Now we'll create the connect component out of the actions and state.  Add the following:

```jsx
export default connect(
  stateProps, 
  actionProps,
)(Timer); 
```



We're done with connected component. Now, in `src/App.js` let's replace our dumb `Timer` component with the new smart `WishTimer` component. Open `src/App.js	` and import the `WishTimer` and delete the old one.

```diff
import React, { Component } from 'react';
import './App.css';
import MakeAWish from './features/make-a-wish/make-a-wish.container';
import GrantWish from './features/grant-wish/grant-wish.container';
- import Timer from './components/timer';
+ import WishTimer from './features/wish-timer/wish-timer.container';
```

Replace the older timer with the new one in the JSX. 

```diff
<div className="App">
  <MakeAWish />
  <GrantWish 
    isTimeRemaining={this.state.isTimeRemaining}
  />
- <Timer 
-   pause={this.state.isPaused}
-   duration={15}
-   onTick={(time) => {}}
-   onComplete={this.handleTimerComplete}
- />
+ <WishTimer 
+  onTick={(time) => {}}
+  duration={15} 
+ />
</div>
```



Things are almost done, but there's a bug.  When the timer runs out, the wish status doesn't get set. Try running the app and letting the timer run out.  You'll see that it doesn't change.  

To fix it, we need to listen for the 'WISH_TIMER_ENDED' action and then set the `isWishMade` property to true on the reducer. Open `src/features/grant-wish/grant-wish.reducer.js` and add that case:

```diff
const initialIsWishMadeState = false;
export const isWishMade = (state = initialIsWishMadeState, { type }) => {
    switch (type) {
    case 'WISH_MADE' :
+    case 'WISH_TIMER_ENDED' :
      return true;
    default:
      return state;
  }
}
```

Run the app again and let the timer run out.  You'll see the wish status appear!



Last peice of function: When the user attempts to make a wish we should pause the timer.  To do that we'll listen for the `WISH_MADE` action and set the `isTimerPaused` state to true.  Open `src/features/wish-timer/wish-timer.reducer.js` and add that case:

```diff
const isTimerPausedInitialState = false;
export const isTimerPaused = (state = isTimerPausedInitialState, action) => {
  switch (action.type) {
    case 'WISH_TIMER_PAUSED' :
+    case 'WISH_MADE' :
      return true;
    default:
      return state;
  }
};
```



I think we're done. Let's just clean up `App.js`  and call it a day. Convert `App.js` to a dumb stateless component! It should look like this when you're done:

```jsx
import React, { Component } from 'react';
import './App.css';
import MakeAWish from './features/make-a-wish/make-a-wish.container';
import GrantWish from './features/grant-wish/grant-wish.container';
import WishTimer from './features/wish-timer/wish-timer.container';

const App = () => 
    <div className="App">
        <MakeAWish />
        <GrantWish />
        <WishTimer 
          onTick={(time) => {}}
          duration={15} 
        />
    </div>

export default App;
```

Now you're *done* done. Poink.

