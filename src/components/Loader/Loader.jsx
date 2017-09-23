import React from 'react'
import classes from './Loader.scss'
import { connect } from 'react-redux'

const Loader = ({loaderVisibility = false}) => (
  <div className={classes.container + ' full-size ' + (loaderVisibility ? classes.show : '')}>
    <div className='loader' />
  </div>
)

Loader.propTypes = {
  loaderVisibility: React.PropTypes.bool
}

const mapStateToProps = (state) => ({ loaderVisibility: state.loaderVisibility })

export default connect(mapStateToProps)(Loader)
