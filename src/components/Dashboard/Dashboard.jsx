import React from 'react'
import classes from './Dashboard.scss'
import Card from '../Card/Card'
import Carousel from '../Carousel/Carousel'

const Dashboard = () => (
  <div className={classes.container + ' full-size px1 py2'}>
    <Card cardTitle='Automated Highlight'><Carousel /></Card>
  </div>
)

Dashboard.propTypes = {
  sampleMessage: React.PropTypes.func.isRequired
}

export default Dashboard
