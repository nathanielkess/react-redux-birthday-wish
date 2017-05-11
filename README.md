# Actions

Remember where the `store ` and the `app` are sitting? The `app` is on the ground and above it, in the sky, is the `store`. We also said that the `app` can send information up the the `store`. To send information *up* you use an `action`. An action is an object with, at least, one property `type`:

```javascript
{
  type: 'SOME_TYPE_OF_ACTION'
}
```

The value of `type` is what the reducers are looking for.

Consider a button, anytime you click this button, you want to change the value of the `count` property to, oh I dunnno, 58.  To do that you would fire an action, up, every time it's clicked. In our case, you want the action to speak directly to the `count` reducer. So you would set the `type` to `COUNT_UPDATED`.

```javascript
{
  type: 'COUNT_UPDATED'
}
```

Then way Redux sends the action through all the reducers, the `count` reducer will find it.

```diff
const countInitialState = 0;
export const count = (state = countInitialState, action) => {
  switch (action.type) {
+    case 'COUNT_UPDATED' :
      return action.payload;
    default:
      return state;
  }
};
```

Last detail on actions: How do I pass data to the store? What about the number 58?  Well, we said that an action is an object with, at least, one property `type`. But you can add others. Any property that you want:

```diff
{
  type: 'COUNT_UPDATED',  
+  newNumber: '58',
+  color: 'poink'
}
```

A typical pattern you'll find is that people add a property called `payload`, to send around their data. So we'll follow that in this hypothetical example:

```javascript
{
  type: 'COUNT_UPDATED',
  payload: 58,
}
```



Now let's implement:

Add a new file: `src/features/make-a-wish/make-a-wish.actions.js`. Here we'll create an action to update the count. So write a function that returns an object that has a type and payload.

```javascript
export const onUpdateCount = newNumber => 
  ({ 
    type: 'COUNT_UPDATED', 
    payload: newNumber,
  });
```

Next, we'll wire this action up to the make-a-wish component. Open `src/make-a-wish.container.js `  

```diff
+ import { connect } from 'react-redux';
- import React, { Component } from 'react';
import TextInput from './../../components/text-input';
+ import * as actionProps from './make-a-wish.actions';

+ const MakeAWish = props => {
+ const { minLetters, onUpdateCount } = props;
- class MakeAWish extends Component {
- class MakeAWish extends Component {

-  constructor(props) {
-   super(props);
-    this.state = {
-      count:0
-    }
-    this.handleWishUpdate = this.handleWishUpdate.bind(this);
-  }

-  handleWishUpdate(wish) {
-    const { onWishCountChange } = this.props;
-    this.setState({ 
-      count: wish.length 
-    });
-    onWishCountChange(this.state.count);
-  }

-  render() {
-    const { minLetters } = this.props;
+	return (
+   <div className="makeWish">
+     <TextInput onNewVaue={(inputEvent) => {
+         onUpdateCount(inputEvent.length);
+       }} 
+       autofocus 
+     />
+     <p>{ `XX/${minLetters}`}</p>
+   </div>
+ );
-}
}
- export default MakeAWish;
+ export default connect(
+  null, 
+  actionProps
+ )(MakeAWish);
```

Gross. Let's look at that again, but without the diff this time.

```jsx
import { connect } from 'react-redux';
import TextInput from './../../components/text-input';
import * as mapDispatchToProps from './make-a-wish.actions';

const MakeAWish = props => {
  const { minLetters, onUpdateCount } = props;
  return (
    <div className="makeWish">
      <TextInput onNewVaue={(inputEvent) => {
          onUpdateCount(inputEvent.length);
        }} 
        autofocus 
      />
      <p>{ `XX/${minLetters}`}</p>
    </div>
  );
}

export default connect(
  null, 
  actionProps
)(MakeAWish);
```

So what's going here? We've actually created 2 components. The first one is the `MakeAWish` component. It's no longer a class (therefore it's a dumb component. Hooray!) All the state and functionality has been taken out. And the second component is that weird `export default connect(...)` thing. We'll come back to that in a sec, but first, the two components written this way is unusual. So let's fix that by moving it into it's own file under the components directory.

Create a new file `src/components/wish-box.js` and move the MakeAWish component in there. 

```jsx
import React from 'react';
import TextInput from './text-input';

const MakeAWish = props => {
  const { minLetters, onUpdateCount } = props;
  return (
    <div className="makeWish">
      <TextInput onNewVaue={(inputEvent) => {
          onUpdateCount(inputEvent.length);
        }} 
        autofocus 
      />
      <p>{ `XX/${minLetters}`}</p>
    </div>
  );
}

export default MakeAWish;
```

Let's also rename it to `Wishbox` , destructor the parameters, and make use of the implied `return` on arrow functions to save a few lines. So change `wish-box.js` it to this:

```jsx
import React from 'react';
import TextInput from './text-input';

const Wishbox = ({ minLetters, onUpdateCount }) => 
    <div className="makeWish">
      <TextInput onNewVaue={(inputEvent) => {
          onUpdateCount(inputEvent.length);
        }} 
        autofocus 
      />
      <p>{ `XX/${minLetters}`}</p>
    </div>;

export default Wishbox;    
```

Now this really feels like a dumb component. It takes in two parameters `minLetters` and `onUpdateCount` .  It doesn't care or know where that comes from, it just make use of them. 

Let's see what's left of `src/features/make-a-wish/make-a-wish.container.js`

```jsx
import { connect } from 'react-redux';
import * as actionProps from './make-a-wish.actions';
import WishBox from './../../components/wish-box';

export default connect(
  null, 
  actionProps,
)(WishBox); 
```

So that `connect()` is a high-order-component from `react-redux` .  It's job is to give components new properties. Specifically, two *types* of properties.  The first type of properties is **state-properties** which we have it set to `null` and the second type is **action-properties**. 

This connect functions reads like this:

- I'm going to create a new component out of the `WishBox` component.
- I'm not going to pass it any state from my store (`null`).  (We'll change that in just a moment)
- But I will pass it some actions so this component can speak up to the store (`actionProps` ). 

Have you run the app in a while? Try it out. Type something in the text box and look at the console. Those are the actions. You you can open up each action in the console and see what the state (store) looked like before. What the action payload was. And what the state (store) looked like after. Great for debugging. 

##### Send state down

Okay, one last topic to wrap up this sections. This isn't exactly an *actions* topic, but the segue here form the `connect()` function is too good to pass up. 

The next goal is to send state from the store down to the app. We can do that right in the `connect()` function on the state-properties side.  Right now it's `null` so let's change that to the `count` property from the store. 

Open `src/features/make-a-wish/make-a-wish.container.js` and make the following change:

```diff
import { connect } from 'react-redux';
import * as actionProps from './make-a-wish.actions';
import WishBox from './../../components/wish-box';

+ const stateProps = (state) => ({
+  currentCount: state.count
+});


export default connect(
+  stateProps, 
  actionProps,
)(WishBox); 
```

The connect function takes function as it's first param for the **state-properties** and implicitly passes that stores entire state to it. Which the function then should return an object with key value pairs.  In this case `count: state.count` .  The last step is to update the `WishBox` to make use of this new `currentCount` property that we just created.

Open `src/components/wish-box.js` and make use of the the count prop.

```diff
import React from 'react';
import TextInput from './text-input';

+ const Wishbox = ({ minLetters, onUpdateCount, currentCount }) => 
    <div className="makeWish">
      <TextInput onNewVaue={(inputEvent) => {
          onUpdateCount(inputEvent.length);
        }} 
        autofocus 
      />
+      <p>{ `${currentCount}/${minLetters}`}</p>
    </div>;

export default Wishbox;    

```

Run the app new and you can see the count property is getting update from the store as it changes!

That's it! Okay, that was a lot, but that's actually it. That should be enough to get you going with redux. I won't go over anymore new concepts.  The rest of this will be just updating the the other components to use Redux. The goal, if you look `src/app.js` is to get rid of all the ugly state and turn that into a dumb component.

Checkout the next branch: `04-grant-wish-redux`