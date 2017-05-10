import React, { Component } from 'react';
import './App.css';
import MakeAWish from './features/make-a-wish/make-a-wish.container';
import GrantWish from './features/grant-wish/grant-wish.container';
import Timer from './components/timer';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      wishCount: 0,
      minLetterCount: 0,
      isWishGranted: false,
      isPaused: false,
      isTimeRemaining: true,
    }
    this.handleWishCountChange = this.handleWishCountChange.bind(this);
    this.handleLetterCountChange = this.handleLetterCountChange.bind(this);
    this.handleWishStatus = this.handleWishStatus.bind(this);
    this.handleTimerComplete = this.handleTimerComplete.bind(this);
  }

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

  render() {
    return (
      <div className="App">
          <MakeAWish 
            onWishCountChange={this.handleWishCountChange} 
            minLetters={this.state.minLetterCount} 
          />
          <GrantWish 
            isTimeRemaining={this.state.isTimeRemaining}
            wishCount={this.state.wishCount} 
            onWishStatus={this.handleWishStatus}
            onMinLetterCount={this.handleLetterCountChange} 
          />
          <Timer 
            pause={this.state.isPaused}
            duration={15}
            onTick={(time) => console.log('time remaining', time)}
            onComplete={this.handleTimerComplete}
          />
      </div>
    );
  }
}

export default App;
