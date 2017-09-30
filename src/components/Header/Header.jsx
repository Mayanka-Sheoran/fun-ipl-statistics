import React from 'react'
import classes from './Header.scss'
import Logo from '../../assets/ipl-logo.png'

class Header extends React.Component {
  render () {
    return (
      <div className={classes.container + ' full-width'}>
        <img className={classes.logo} src={Logo} alt='Home'/>
        <div className={classes.headerText}>Everything you need to know</div>
      </div>
    )
  }
}

export default Header
