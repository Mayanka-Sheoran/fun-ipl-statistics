import React from 'react'
import classes from './Dashboard.scss'
import Card from '../Card/Card'
import Carousel from '../Carousel/Carousel'

const Dashboard = (props, context) => {
  return( <div className={classes.container + ' full-size px1 py2'}>
    <Card cardType='carousal'><Carousel /></Card>
    <div className={classes.bottomCardContainer}>
      <div onClick={() => {
      context.history.push('/team')
    }} ><Card cardType='tile' cardDetails='team' cardTitle='Know your favourite team better' /></div>
       <div onClick={() => {
      context.history.push('/player')
    }} ><Card cardType='tile' cardDetails='player' cardTitle='Player performances through the last 9 seasons' /></div>
       <div onClick={() => {
      context.history.push('/ground')
    }} ><Card cardType='tile' cardDetails='ground' cardTitle='Some fun facts about cricket stadiums' /></div>
    </div>
  </div>)
}

Dashboard.contextTypes = {
 history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  })
}

export default Dashboard
