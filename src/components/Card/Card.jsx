import React from 'react'
import classes from './Card.scss'
import ground from '../../assets/ground.jpeg'
import team from '../../assets/team.jpeg'
import player from '../../assets/player-squad.jpg'

const image = {
  team: team,
  player: player,
  ground: ground
}
const Card = ({cardTitle, children, cardType, cardDetails, click}) => (
  <div>
    {cardType === 'carousal' && <div className={classes.container + ' full-width '}>
      <div>{children}</div>
    </div>}
    {cardType === 'selector' && <div className={classes.selectorCardContainer + ' full-width '}>
      <div>{children}</div>
    </div>}
    {cardType === 'tile' && <div className={classes.tileContainer} onClick={() => click(`/${cardDetails}`)}>
      <div className={classes.tile}><img className={classes.tileImages} onClick={() => click(`/${cardDetails}`)} src={image[cardDetails]} />
        <div className={classes.cardText}>{cardTitle}</div>
      </div>
    </div>}
  </div>)

Card.propTypes = {
  cardType: React.PropTypes.string,
  cardTitle: React.PropTypes.string,
  cardDetails: React.PropTypes.string,
  children: React.PropTypes.element,
  click: React.PropTypes.func
}
export default Card
