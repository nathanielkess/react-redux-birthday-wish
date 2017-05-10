# Tour of the app

This is the birthday wish app.  It's a contrived example of an app that is riddle with local state.  Try and run it.

```
npm install
```

```
npm start
```

http://localhost:3000/

Try and enter a wish before the timer runs out. Did you get it? I told you it wasn't rediculouse. 

#### The code

Open up `src/App.js` you can see that this app is made up of three components.

- MakeAWish
- GrantWish
- Timer

These three components need to comunitcate with one another. Which is what all these handlers are doing:

```javascript
 handleWishCountChange(count){
    this.setState({
      wishCount: count,
    });
  }

  handleLetterCountChange(count) {
    this.setState({
      minLetterCount: count,
    });
  }

  handleWishStatus(isWishGranted){
    this.setState({
      isPaused: true,
      isWishGranted
    });
  }

  handleTimerComplete(){
    this.setState({
      isTimeRemaining: false,
    })
  }
```

Those handlers are updating a bunch of local state

```javascript
this.state = {
      wishCount: 0,
      minLetterCount: 0,
      isWishGranted: false,
      isPaused: false,
      isTimeRemaining: true,
    }
```

Within each of the components there's more state and lifecycle hooks necessary for the inter-app communication. For example `src/features/grant-wish/grant-wish.container.js` has all this state:

```javascript
this.state = {
      minLetterCount: 0,
      isWishGranted: false,
      isWishMade: false,
    }
```

Most of this is duplicated on App.js above. We'll get rid of that redundancy by applying the Redux pattern to this app. We'll convert most of the components to dumb compontent and cut add a great deal of their code.

If you look back at `src/app.js` here's the flow of what's going on:

- `MakeAWish`  renders an input box. Everytime you enter a charcater it updates a peice of state `wishCount` It also requires a `minLetters` property to render the **00/48** counter under the text box
- `GrantWish` is used to determine whether or not your wish is granted.  It needs to know the following:
  - Is there time remaining?
  - How many letters have been entered in the wishbox
  - the current status of the wish (attempted/or not)
  - The minimum amount of letters
- `Timer` renders the amount of time remaining
  - It needs to tell the rest of the app when it's complete
  - It needs to pause if the user has attempted to make a wish

Pretty simple app, but a lot going on in order to comunicate all this information between one another. You'll see at the end, by moving all the state to one location (Redux store) that most of the code gets cut out and the redundancies get eliminated. 

Shall we get to it? Is that what she said?

Checkout the next branch: `01-Add-Redux`

