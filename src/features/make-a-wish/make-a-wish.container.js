import React, { Component } from 'react';
import TextInput from './../../components/text-input';

class MakeAWish extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count:0
    }
    this.handleWishUpdate = this.handleWishUpdate.bind(this);
  }

  handleWishUpdate(wish) {
    const { onWishCountChange } = this.props;
    this.setState({ 
      count: wish.length 
    });
    onWishCountChange(this.state.count);
  }

  render() {
    const { minLetters } = this.props;
    return (
      <div>
        <TextInput onNewVaue={this.handleWishUpdate} />
        <p>{ `${this.state.count}/${minLetters}`}</p>
      </div>
    );
  }
}

export default MakeAWish;