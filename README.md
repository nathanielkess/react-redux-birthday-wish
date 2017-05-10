# Redux the rest

Let's move on to the grant-a-wish feature and apply the redux pattern to it.

Open `src/features/grant-wish.container.js`

We'll do the following:

- pull out each piece of state and move it to the store with a reducer
- convert the component to a dumb component 
- write the necessary actions so the component can send data to the store


- apply stateProps and actionsProps to the component with the `connect()` HOC function from `react-redux`.

First let's add the state to the store.  There are three items: `minLetterCount`, `isWishGranted` and `isWishMade`. 

Create a new file: `src/features/grant-wish/grant-wish.reducers.js`

```jsx
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
      return true;
    default:
      return state;
  }
}
```

Here we created 2 reducers `minLetterCount` and `isWishMade` . 

`minLetterCount` does not listen for any particular action. So it can never update.  It sets it's property on the store to a random number when the state is initialized. 

`isWishMade` listens for the `WISH_MADE` action and sets it's property to true. 

We're leaving out the `isWishGranted` on purpose because that value can be calculated from the contents of the store, so it's not necessary to add a property for it.  You'll see that shortly. 

Next open `src/store.js` import the two reducers and added them to the `rootReducer`. 

```diff
...
+ import { minLetterCount, isWishMade } from './features/grant-wish/grant-wish.reducers';

const logger = createLogger({
  collapsed: true,
});

const rootReducer = combineReducers({
  count,
+  minLetterCount,
+  isWishMade,
});
...
```

If the app is running, have a look at the console to see these new properties added to the store.

Next, we'll make a new dumb component. Cut the JSX from `grant-wish.container.js`

```jsx
<div className="grantWish">
  { this.state.isWishMade
    ? <EitherMessage 
        truthMessage={'Your wish is granted!!!!'}
        falseMessage={'Your wish was not granted'}
        isShowTruthMessage={this.state.isWishGranted}
        />
    : <input type="submit" onClick={this.handleClick} value={`Make Wish!`} />
  }
</div>
```

and create a new dumb component out of it at `src/components/grant-wish.js`

```jsx
import React from 'react';
import EitherMessage from './either-message';

const GrantWish = ({ isWishGranted, onAttemptWish, isWishMade }) =>
    <div className="grantWish">
        { isWishMade
          ? <EitherMessage 
            truthMessage={'Your wish is granted!!!!'}
            falseMessage={'Your wish was not granted'}
            isShowTruthMessage={isWishGranted}
          />
          : <input type="submit" onClick={onAttemptWish} value={`Make Wish!`} />
        }
    </div>;

export default GrantWish;    

```

Now let's create an action for when the user attempts to make a wish. Create a new file at `src/features/grant-wish.actions.js`

```javascript
export const onAttemptWish = () => 
  ({ 
    type: 'WISH_MADE', 
  });
```

Lastely, we'll use the react-redux `connect()` HOC function to compose a new component out of `GrantWish`,  but with properties from the store, and the new action we just created. Open `src/features/grant-wish.container.js` and updated it to match the following:

```jsx
import { connect } from 'react-redux';
import * as actionProps from './grant-wish.actions'
import GrantWish from './../../components/grant-wish';
 
const stateProps = (state) => ({
  minLetterCount: state.minLetterCount,
  isWishMade: state.isWishMade,
  isWishGranted: (state.count >= state.minLetterCount)
})

export default connect(
  stateProps,
  actionProps,
)(GrantWish)

```

That last one was a pretty big change, hu? 

There's one bug here. The `wish-box.js` component is showing 0/0 for:

```jsx
<p>{ `${currentCount}/${minLetters}`}</p>
```

That's because the make-a-wish.container.js file is passing `minLetterCount` from the store to that property.  Let's fix that. Open `src/features/make-a-wish.container.js` and add the missing property off the state:

```diff
const stateProps = (state) => ({
  currentCount: state.count,
+  minLetters: state.minLetterCount,
});
```

That's it for `grant-wish`. To wrap up the entire app, there's one more file that's riddled with local state: `src/app.js` In the next and final branch you'll use what we already added to the store to power app.js. 

