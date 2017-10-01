import React from 'react'
import classes from './Dashboard.scss'
import Card from '../Card/Card'
import Carousel from '../Carousel/Carousel'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createAction } from 'redux-actions'
import * as commonActions from '../../redux/modules/common'

class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.navigate= this.navigate.bind(this)
  }
  componentWillMount(){
    this.props.actions.getMatches()
  }
  navigate (link) {
    // this.context.router.push(link)
  }
  render(){
  return (<div className={classes.container + ' full-size px1 py2'}>
    <Card cardType='carousal'><Carousel /></Card>
    <div className={classes.bottomCardContainer}>
      <div onClick={this.navigate('/team')} >
        <Card cardType='tile' cardDetails='team' cardTitle='Know your favourite team better' /></div>
      <div onClick={this.navigate('/player')}>
        <Card cardType='tile' cardDetails='player' cardTitle='Player performances through the last 9 seasons' /></div>
      <div onClick={this.navigate('/ground')}>
        <Card cardType='tile' cardDetails='ground' cardTitle='Fun facts about cricket stadiums' /></div>
    </div>
  </div>)
}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commonActions, dispatch)
  }
}

Dashboard.contextTypes = {
  router: React.PropTypes.object.isRequired
}
export default connect(null, mapDispatchToProps)(Dashboard)
