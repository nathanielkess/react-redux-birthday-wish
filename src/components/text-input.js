import React from 'react';

const TextInput = ({ onNewVaue }) =>
<div>
  <textarea onKeyUp={(event) => onNewVaue(event.target.value)} />
  <div className="cake">
    <div className="topping-1"></div>
    <div className="topping-1"></div>
    <div className="topping-1"></div>
    <div className="layer"></div>
    <div className="layer"></div>
    <div className="layer"></div>
    <div className="plate"></div>
  </div>
</div>

export default TextInput;