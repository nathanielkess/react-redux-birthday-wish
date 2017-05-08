import React from 'react';
import EitherMessage from './either-message';

const GrantWish = ({ isWishGranted, onAttemptWish, isWishMade }) =>
    <div className="grantWish">
        { isWishMade
          ? <EitherMessage 
            truthMessage={'Your wish is granted!!!!'}
            falseMessage={'Your wish was not granted'}
            isShowTruthMessage={isWishGranted}
          />
          : <input type="submit" onClick={onAttemptWish} value={`Make Wish!`} />
        }
    </div>;

export default GrantWish;    
