import React from 'react'
import classes from './Header.scss'
import Logo from '../../assets/ipl-logo.png'
import appLogo from '../../assets/app-logo.png'

const Header = (props, context) => {
  const navigate = (link) => () => {
    context.router.push(link)
  }
  return (
    <div className={classes.container + ' full-width'}>
      <img onClick={navigate('/')} className={classes.logo} src={Logo} alt='Home' />
      <img className={classes.appLogo} src={appLogo} />
    </div>
  )
}

Header.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Header

