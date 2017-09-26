import React from 'react'
import BarChart from '../Bar-Chart/Bar-Chart'
import LineChart from '../Line-Chart/Line-Chart'
import PieChart from '../Pie-Chart/Pie-Chart'
import COLORS from 'constants/colors.json'
import classes from './Team-Performance-Trend.scss'
import matches from '../../fixtures/matches.json'
import Dropdown from '../Dropdown/Dropdown'
import _ from 'lodash'

class TeamPerformanceTrend extends React.Component {
  constructor(props) {
    super(props)
    this.getSelectedTeam = this.getSelectedTeam.bind(this)
    this.state = {
      selectedTeam : 'All',
      series: [],
      teams: [{'label': 'All', value: 'All'}],
      options: _.uniq(_.map(matches, 'team1')),
      seasons: _.uniq(_.map(matches, 'season')),
      teamTrajectoryData: [], 
      pieChartData: {
        title: '% of Matches won batting first',
        name: 'Bat First'
      },
      pieChartSeries: []
    }
    
    this.state.options.map(function(item) {
      const newOption = {}
      newOption.name = item
      const totalMatchesWon = matches.reduce(function (n, match) {
        return n + (match.winner == item)
      }, 0)
      const matchesWonBatFirst = matches.reduce(function (n, match) {
        return n + ((match.winner == item && match['toss_winner'] == item && match['toss_decision'] == 'bat')|| (match.winner == item && match['toss_winner'] !== item && match['toss_decision'] == 'field'))
      }, 0)
      const percentage = (matchesWonBatFirst/totalMatchesWon)*100
      newOption.y = percentage
      console.log(percentage)
      this.state.pieChartSeries.push(newOption)
    }, this)
    this.state.options.map(function(item) {
      const newOption = {}
      newOption.label = item
      newOption.value = item
      this.state.teams.push(newOption)
    }, this)
    
    this.state.options.map(function(item) {
      const newOption = {}
      newOption.name = item
      newOption.data = []
      this.state.seasons.forEach(function(season) {
        let numberOfMatchesWon = 0
        _.forEach(matches, function(data) {
          if (data.season == season && data.winner == item) {
            numberOfMatchesWon = numberOfMatchesWon + 1
          }
        })
        newOption.data.push(numberOfMatchesWon)
     }, this)
      this.state.teamTrajectoryData.push(newOption)
    }, this)  

    this.data = {
        height: 200,
        title: 'Team Trajectory',
        subtitle: '',
        yAxisTitle: 'No of matches won'
    }
  }
  getSelectedTeam(item){
    this.setState({selectedTeam: item.target.value})
     if(item.target.value !== 'All'){
      const oneTeamData = []
      console.log(_.find(this.state.teamTrajectoryData, {name:item.target.value}))
      oneTeamData.push(_.find(this.state.teamTrajectoryData, {name:item.target.value}))
      this.setState({series: _.map(oneTeamData, _.partial(_.pick, _, ['name', 'data']))})
    }
    else{
      this.setState({series: this.state.teamTrajectoryData})
    }

  }
  render () {
    console.log(this.state)
  return ( <div className = { classes.container + ' full-size' } >
    <div className = 'flex performace-chart pl1' >
    <LineChart data={this.data} series={this.state.series.length > 0 ? this.state.series : this.state.teamTrajectoryData}/>
   <div >
    <Dropdown optionList = { this.state.teams } onChange={this.getSelectedTeam}/>
     <div>
    <PieChart data={this.state.pieChartData} series={this.state.pieChartSeries}/>
   </div> 
   </div>
   </div> 
    </div >
  )
 }
}

TeamPerformanceTrend.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default TeamPerformanceTrend
