import React, { Component } from 'react';
import './App.css';
import MakeAWish from './features/make-a-wish/make-a-wish.container';
import GrantWish from './features/grant-wish/grant-wish.container';
import Timer from './components/timer';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      isTimeRemaining: true,
    }
    this.handleTimerComplete = this.handleTimerComplete.bind(this);
  }

  handleTimerComplete(){
    this.setState({
      isTimeRemaining: false,
    })
  }

  render() {
    return (
      <div className="App">
          <MakeAWish />
          <GrantWish 
            isTimeRemaining={this.state.isTimeRemaining}
          />
          <Timer 
            pause={this.state.isPaused}
            duration={15}
            onTick={(time) => {}}
            onComplete={this.handleTimerComplete}
          />
      </div>
    );
  }
}

export default App;
