import React from 'react';

const TextInput = ({ onNewVaue }) =>
<div>
  <textarea onKeyUp={(event) => onNewVaue(event.target.value)} />
</div>

export default TextInput;