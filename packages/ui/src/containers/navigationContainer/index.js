import { connect } from 'react-redux';
import NavigationWidget from '../../components/navigationWidget'
import { resetStore } from './action';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    resetStore: () => {
      return dispatch(resetStore())
    }
  }
}
export default connect(null, mapDispatchToProps)(NavigationWidget);