import { connect } from 'react-redux';
import * as actionProps from './make-a-wish.actions';
import WishBox from './../../components/wish-box';

const stateProps = (state) => ({
  currentCount: state.count
});

export default connect(
  stateProps, 
  actionProps,
)(WishBox); 