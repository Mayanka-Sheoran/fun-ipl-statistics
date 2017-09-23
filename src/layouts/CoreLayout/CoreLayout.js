import React from 'react'
import Header from '../../components/Header/Header'
import Loader from '../../components/Loader/Loader'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div className={classes.wrapper + ' full-size'}>
    <Header />
    <Loader />
    <div className='mainContainer full-size'>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
