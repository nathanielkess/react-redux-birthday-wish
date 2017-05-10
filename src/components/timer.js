import React, { Component } from 'react';

class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: null,
    }
  } 

  startTimer({duration, onComplete, onTick, pause}) {
    if(pause) return;
    let timer = duration, minutes, seconds;
    setTimeout(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        this.setState({
          time : minutes + ":" + seconds
        });

        onTick(this.state.time);

        if (--timer >= 0) {
            this.startTimer({
              ...this.props,
              duration: duration - 1,
            });
            return
        }
        onComplete();
    }, 1000);
  }

  componentDidMount() {
    this.startTimer(this.props);
  }

  componentDidUpdate(prevProps){
    //console.log('prev props', prevProps);
  }

  render() {
    return (
      <div className="timer">
        { this.state.time }
      </div>
    );
  }
}

export default Timer;