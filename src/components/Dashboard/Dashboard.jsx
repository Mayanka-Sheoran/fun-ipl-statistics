import React from 'react'
import classes from './Dashboard.scss'
import Card from '../Card/Card'
import Carousel from '../Carousel/Carousel'

const Dashboard = (props, context) => {
  const navigate = (link) => () => {
    context.router.push(link)
  }
  return (<div className={classes.container + ' full-size px1 py2'}>
    <Card cardType='carousal'><Carousel /></Card>
    <div className={classes.bottomCardContainer}>
      <div onClick={navigate('/team')} >
        <Card cardType='tile' cardDetails='team' cardTitle='Know your favourite team better' /></div>
      <div onClick={navigate('/player')}>
        <Card cardType='tile' cardDetails='player' cardTitle='Player performances through the last 9 seasons' /></div>
      <div onClick={navigate('/ground')}>
        <Card cardType='tile' cardDetails='ground' cardTitle='Fun facts about cricket stadiums' /></div>
    </div>
  </div>)
}

Dashboard.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Dashboard
