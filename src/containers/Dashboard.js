import Dashboard from 'components/Dashboard/Dashboard'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createAction } from 'redux-actions'

// Actions
const sampleMessage = createAction('SAMPLE_MESSAGE')
const getData = createAction('GET_METADATA')

const mapDispatchToProps = (dispatch) => {
  return {
    getData: bindActionCreators(getData, dispatch),
    sampleMessage: bindActionCreators(sampleMessage, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Dashboard)
