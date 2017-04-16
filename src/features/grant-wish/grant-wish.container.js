import React, { Component } from 'react';
import EitherMessage from './../../components/either-message';
 

class GrantWish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minLetterCount: 0,
      isWishGranted: false,
      isWishMade: false,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  attemptWish(){
    console.log('attempting wish');
    const { onWishStatus, wishCount } = this.props;
    this.setState({
      isWishGranted: wishCount >= this.state.minLetterCount,
      isWishMade: true,
    });
    setTimeout(() => {
      onWishStatus(this.state.isWishGranted);
    }, 0);
  }

  handleClick(event) {
    event.preventDefault();
    this.attemptWish();
  }

  getRandomNumber(){
    const min = 25; 
    const max = 80;
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  componentWillMount(){
    this.setState({
      minLetterCount: this.getRandomNumber(),
    });
  }

  componentDidMount(){
    const { onMinLetterCount } = this.props;
    onMinLetterCount(this.state.minLetterCount);
  }

  componentDidUpdate(prevProps) {
    const { isTimeRemaining } = this.props;
    const { isTimeRemaining : prevIsTimeRemaining } = prevProps;
    console.log('here');
    if(isTimeRemaining !== prevIsTimeRemaining && !isTimeRemaining) {
      this.attemptWish();
    }
  }

  render() {
    return (
      <div>
        { this.state.isWishMade
          ? <EitherMessage 
            truthMessage={'Your wish is granted'}
            falseMessage={'Your wish is not granted'}
            isShowTruthMessage={this.state.isWishGranted}
          />
          : <input type="submit" onClick={this.handleClick} value={`Make Wish!`} />
        }
      </div>
    );
  }
}

export default GrantWish;