import React from 'react';

const EitherMessage = ({ truthMessage, falseMessage, isShowTruthMessage }) =>
<div>
  {
    isShowTruthMessage 
    ? <p className="good">{truthMessage}</p>
    : <p className="bad">{falseMessage}</p>
  }
</div>

export default EitherMessage;