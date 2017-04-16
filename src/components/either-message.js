import React from 'react';

const EitherMessage = ({ truthMessage, falseMessage, isShowTruthMessage }) =>
<div>
  {
    isShowTruthMessage 
    ? <p>{truthMessage}</p>
    : <p>{falseMessage}</p>
  }
</div>

export default EitherMessage;