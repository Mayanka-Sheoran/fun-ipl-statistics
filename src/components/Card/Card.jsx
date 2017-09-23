import React from 'react'
import classes from './Card.scss'

const Card = ({cardTitle, children}) => (
  <div className={classes.container + ' full-width'}>
    <div className='card-title flex items-center px2'>{cardTitle}</div>
    <div>{children}</div>
  </div>
  )

Card.propTypes = {
  cardTitle: React.PropTypes.string.isRequired,
  children: React.PropTypes.element
}
export default Card
