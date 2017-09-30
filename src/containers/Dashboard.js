import Dashboard from 'components/Dashboard/Dashboard'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createAction } from 'redux-actions'

// Actions
const getData = createAction('GET_METADATA')

const mapDispatchToProps = (dispatch) => {
  return {
    getData: bindActionCreators(getData, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Dashboard)
