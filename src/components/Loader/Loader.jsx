import React from 'react'
import classes from './Loader.scss'
import { connect } from 'react-redux'

const Loader = ({loaderVisibility = false}) => (
  <div className={classes.container + ' full-size ' + (loaderVisibility ? classes.show : '')}>
   <div className={classes.loaderText}>This might take a while</div>
    <div className='loader' />
  </div>
)

Loader.propTypes = {
  loaderVisibility: React.PropTypes.bool
}

const mapStateToProps = (state) => ({ loaderVisibility: state.commonData.loaderVisibility })

export default connect(mapStateToProps)(Loader)
