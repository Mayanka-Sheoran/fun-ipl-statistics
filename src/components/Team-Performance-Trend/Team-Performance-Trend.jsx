import React from 'react'
import BarChart from '../Bar-Chart/Bar-Chart'
import LineChart from '../Line-Chart/Line-Chart'
import COLORS from 'constants/colors.json'
import classes from './Team-Performance-Trend.scss'
import matches from '../../fixtures/matches.json'
import Dropdown from '../Dropdown/Dropdown'
import _ from 'lodash'

const TeamPerformanceTrend = () => {
  const options = _.uniq(_.map(matches, 'team1'))
  const teams = []
  const seasons = _.uniq(_.map(matches, 'season'))
  console.log(seasons)
  const teamTrajectoryData = []
  _.map(options, function(item) {
    const newOption = {}
    newOption.label = item
    newOption.value = item
    teams.push(newOption)
  })
  _.map(options, function(item) {
    const newOption = {}
    newOption.name = item
    newOption.data = []
    _.forEach(seasons, function(season) {
      let numberOfMatchesWon = 0
      _.forEach(matches, function(data) {
        if (data.season == season && data.winner == item) {
          numberOfMatchesWon = numberOfMatchesWon + 1
        }
      })
      newOption.data.push(numberOfMatchesWon)
    })
    teamTrajectoryData.push(newOption)
    console.log(teamTrajectoryData)
  })
  const data = {
    height: 200,
    title: 'Team Trajectory',
    subtitle: '',
    yAxisTitle: 'No of matches won',
    series: teamTrajectoryData
  }
  return ( <div className = { classes.container + ' full-size' } >
    <div className = 'flex performace-chart pl1' >
    <LineChart data = { data }/>
   <div >
    <Dropdown optionList = { teams }/> 
   </div>
   </div> 
    </div >
  )
}

TeamPerformanceTrend.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default TeamPerformanceTrend
