# Remove remaining state

On to the last bit.  In `App.js` there's a bunch of local state the we can take out and replace with what we've added to the Redux store.

Open `src/App.js`.  In the `constructor()` we can see a bunch of state:

```Jsx
this.state = {
      wishCount: 0,
      minLetterCount: 0,
      isWishGranted: false,
      isPaused: false,
      isTimeRemaining: true,
    }
```

Let's cut that out starting with `wishCount`.  Remove `wishCount` from the constructor:

```Diff
constructor(props){
    super(props);
    this.state = {
-      wishCount: 0,
      minLetterCount: 0,
      isWishGranted: false,
      isPaused: false,
      isTimeRemaining: true,
    }
-    this.handleWishCountChange = this.handleWishCountChange.bind(this);
    this.handleLetterCountChange = this.handleLetterCountChange.bind(this);
    this.handleWishStatus = this.handleWishStatus.bind(this);
    this.handleTimerComplete = this.handleTimerComplete.bind(this);
  }
```

Remove the count change handler since that's already being taken care of by Redux

```diff
- handleWishCountChange(count){
-    this.setState({
-      wishCount: count,
-    });
-  }
```

Remove `wishCount` from the GrantWish component:

```diff
<GrantWish 
  isTimeRemaining={this.state.isTimeRemaining}
-  wishCount={this.state.wishCount} 
  onWishStatus={this.handleWishStatus}
  onMinLetterCount={this.handleLetterCountChange} 
/>
```

And `MakeAWish` component.

```diff
<MakeAWish 
-	onWishCountChange={this.handleWishCountChange} 
/>
```



Next we'll do the same to `minLetterCount`. Remove it from the following spots:

```diff
constructor(props){
    super(props);
    this.state = {
-      minLetterCount: 0,
      isWishGranted: false,
      isPaused: false,
      isTimeRemaining: true,
    }
-    this.handleLetterCountChange = this.handleLetterCountChange.bind(this);
    this.handleWishStatus = this.handleWishStatus.bind(this);
    this.handleTimerComplete = this.handleTimerComplete.bind(this);
  }
```

```Diff
- handleLetterCountChange(count) {
-    this.setState({
-      minLetterCount: count,
-    });
-  }
```

```diff
 <GrantWish 
  isTimeRemaining={this.state.isTimeRemaining}
  onWishStatus={this.handleWishStatus}
-  onMinLetterCount={this.handleLetterCountChange} 
 />
```

Moving on to the next peice of state, we'll get rid of `isWishGranted` and `isPaused`.

```Diff
this.state = {
-  isWishGranted: false,
-  isPaused: false,
  isTimeRemaining: true,
}
- this.handleWishStatus = this.handleWishStatus.bind(this);
 this.handleTimerComplete = this.handleTimerComplete.bind(this);
```

```diff
-  handleWishStatus(isWishGranted){
-    this.setState({
-      isPaused: true,
-      isWishGranted
-    });
-  }
```

```diff
<GrantWish 
  isTimeRemaining={this.state.isTimeRemaining}
-  onWishStatus={this.handleWishStatus}
/>
```

Okay, looking a lot better. What's left? `isTimeRemaining`. Ahh crapy garbage, we didn't add that one to Redux. Alright, one more exercise. Move on to `06-wish-timer`.

