import { connect } from 'react-redux';
import * as actionProps from './wish-timer.actions';
import Timer from './../../components/timer';

const stateProps = (state) => ({
  pause: state.isTimerPaused,
});

export default connect(
  stateProps, 
  actionProps,
)(Timer); 