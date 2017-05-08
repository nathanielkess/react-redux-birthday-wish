import { connect } from 'react-redux';
import * as actionProps from './grant-wish.actions'
import GrantWish from './../../components/grant-wish';
 
const stateProps = (state) => ({
  minLetterCount: state.minLetterCount,
  isWishMade: state.isWishMade,
  isWishGranted: (state.count >= state.minLetterCount)
})

export default connect(
  stateProps,
  actionProps,
)(GrantWish)
