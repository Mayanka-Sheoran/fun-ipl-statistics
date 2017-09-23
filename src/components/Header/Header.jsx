import React from 'react'
import classes from './Header.scss'

class Header extends React.Component {
  render () {
    return (
      <div className={classes.container + ' full-width flex-center-xy'}>
        <span>Dashboard</span>
      </div>
    )
  }
}

export default Header
