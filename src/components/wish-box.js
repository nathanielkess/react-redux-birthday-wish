import React from 'react';
import TextInput from './text-input';

const Wishbox = ({ minLetters, onUpdateCount, currentCount }) => 
    <div className="makeWish">
      <TextInput onNewVaue={(inputEvent) => {
          onUpdateCount(inputEvent.length);
        }} 
        autofocus 
      />
      <p>{ `${currentCount}/${minLetters}`}</p>
    </div>;

export default Wishbox;    
