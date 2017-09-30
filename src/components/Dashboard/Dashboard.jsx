import React from 'react'
import classes from './Dashboard.scss'
import Card from '../Card/Card'
import Carousel from '../Carousel/Carousel'

const Dashboard = (props, context) => {
  const navigateToLink = (link) => () => {
    console.log(link)
     context.history.push(link)
  }
  return( <div className={classes.container + ' full-size px1 py2'}>
    <Card cardType='carousal'><Carousel /></Card>
    <div className={classes.bottomCardContainer}>
      <Card onClick={() => {
      context.history.push('/team')
    }} cardType='tile' cardDetails='team' cardTitle='Know your favourite team better' />
      <Card cardType='tile' cardDetails='player' cardTitle='Player performances through the last 9 seasons' />
      <Card cardType='tile' cardDetails='ground' cardTitle='Some fun facts about cricket stadiums' />
    </div>
  </div>)
}

Dashboard.contextTypes = {
 history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  })
}

export default Dashboard
