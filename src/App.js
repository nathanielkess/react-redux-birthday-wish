import React from 'react';
import './App.css';
import MakeAWish from './features/make-a-wish/make-a-wish.container';
import GrantWish from './features/grant-wish/grant-wish.container';
import WishTimer from './features/wish-timer/wish-timer.container';

const App = () => 
    <div className="App">
        <MakeAWish />
        <GrantWish />
        <WishTimer 
          onTick={(time) => {}}
          duration={15} 
        />
    </div>

export default App;
