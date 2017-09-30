import React from 'react'
import BarChart from '../Bar-Chart/Bar-Chart'
import PieChart from '../Pie-Chart/Pie-Chart'
import ColumnChart from '../Column-Chart/Column-Chart'
import classes from './Ground-Performance-Trend.scss'
import matches from '../../fixtures/matches.json'
import Dropdown from '../Dropdown/Dropdown'
import _ from 'lodash'

class GroundPerformanceTrend extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedGround : 'All',
      series: [],
      groundOptions: [{'label': 'All', value: 'All'}],
      venues: _.uniq(_.map(matches, 'venue')),
      seasons: _.uniq(_.map(matches, 'season')),
      teamTrajectoryData: [], 
      pieChartData: {
        title: '% of Matches won batting first on the ground',
        name: 'Bat First'
      },
      pieChartSeriesBatFirst: [],
      newpieChartSeriesBatFirst: []
    }
    this.getSelectedGround = this.getSelectedGround.bind(this)
    
  }
  componentWillMount(){
    this.state.venues.map(function(item) {
      const newOption = {}
      newOption.label = item
      newOption.value = item
      this.state.groundOptions.push(newOption)
    }, this)

      const newOption = {}
      newOption.name = 'Bat First Wins'

      const newOptionBall = {}
      newOptionBall.name = 'Ball First Wins'

      const matchesWonBatFirst = matches.reduce(function (n, match) {
        return n + (match.result == 'normal' && (match['toss_winner'] == match['winner'] && match['toss_decision'] == 'bat') || (match['toss_winner'] !== match['winner'] && match['toss_decision'] == 'field'))
      }, 0)

      const totalMatches = matches.reduce(function (n, match) {
        return n + (match.result == 'normal')
      }, 0)

      const percentage = parseInt((matchesWonBatFirst/totalMatches)*100)
      newOption.y = percentage
      newOptionBall.y = 100-percentage
      this.state.pieChartSeriesBatFirst.push(newOption)
      this.state.pieChartSeriesBatFirst.push(newOptionBall)
  }
  getSelectedGround(item){
    this.setState({selectedGround: item.target.value})
    const newpieChartSeriesBatFirst = []
     if(item.target.value !== 'All'){
      const newOption = {}
      newOption.name = 'Bat First Wins'

      const newOptionBall = {}
      newOptionBall.name = 'Ball First Wins'

      const matchesWonBatFirst = matches.reduce(function (n, match) {
        return n + ((match.venue == item.target.value) && ((match['toss_winner'] == match['winner'] && match['toss_decision'] == 'bat') || (match['toss_winner'] !== match['winner'] && match['toss_decision'] == 'field')))
      }, 0)
      const totalMatches = matches.reduce(function (n, match) {
        return n + (match.venue == item.target.value && match.result == 'normal')
      }, 0)
      const percentage = parseInt((matchesWonBatFirst/totalMatches)*100)
      newOption.y = percentage
      newOptionBall.y = 100-percentage
      newpieChartSeriesBatFirst.push(newOption)
      newpieChartSeriesBatFirst.push(newOptionBall)
      this.setState({pieChartSeriesBatFirst: newpieChartSeriesBatFirst})
    }
    else {
      this.componentWillMount()
    }
  }
  render () {
    console.log(this.state)
  return ( <div className = { classes.container + ' full-size' } >
    <Dropdown optionList = { this.state.groundOptions } onChange={this.getSelectedGround}/>
   <div className = 'flex performace-chart pl1'>
   <PieChart data={this.state.pieChartData} series={this.state.pieChartSeriesBatFirst} container='containerPie'/></div>
   </div>
  )
 }
}

GroundPerformanceTrend.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default GroundPerformanceTrend
