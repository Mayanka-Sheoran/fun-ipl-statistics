import React from 'react'
import classes from './Dashboard.scss'
import Card from '../Card/Card'
import Carousel from '../Carousel/Carousel'

const Dashboard = () => (
  <div className={classes.container + ' full-size px1 py2'}>
    <Card cardType='carousal'><Carousel /></Card>
    <div className={classes.bottomCardContainer}>
     <Card cardType='tile' cardDetails='team' cardTitle='Know your favourite team better'></Card>
      <Card cardType='tile' cardDetails='player' cardTitle='Player performances through the last 9 seasons'></Card>
       <Card cardType='tile' cardDetails='ground' cardTitle='Some fun facts about cricket stadiums'></Card>
    </div>   
  </div>
)

Dashboard.propTypes = {

}

export default Dashboard
