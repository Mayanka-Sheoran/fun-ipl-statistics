import React from 'react'
import classes from './Header.scss'
import Logo from '../../assets/ipl-logo.png'


const Header = (props, context) => {
    return (
      <div className={classes.container + ' full-width'}>
        <img onClick={() => {
      context.history.push('/')
    }} className={classes.logo} src={Logo} alt='Home' />
        <div className={classes.headerText}>Everything you need to know</div>
      </div>
    )
  }

Header.contextTypes = {
 history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  })
}

export default Header

