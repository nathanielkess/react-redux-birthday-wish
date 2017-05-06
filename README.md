# Actions

Remember where the `store ` and the `app` are sitting? The `app` is on the ground and above it, in the sky, is the `store`. We also said that the `app` can send information up the the `store`. To send information *up* you use an `action`. An action is an object with, at least, one property `type`:

```javascript
{
  type: 'SOME_TYPE_OF_ACTION'
}
```

The value of `type` is what the reducers are looking fore.

Consider a button, anytime you click this button, you want to change the value of the `count` property to, oh I dunnno, 58.  To do that you would fire an action, up, every time it's clicked. In our case, you want the action to speak directly to the `count` reducer. So you would set the `type` to `COUNT_UPDATED`.

```javascript
{
  type: 'COUNT_UPDATED'
}
```

Then way Redux sends all the actions through all the reducers, the `count` reducer will find it.

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

