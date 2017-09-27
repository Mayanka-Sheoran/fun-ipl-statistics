import React from 'react'
import BarChart from '../Bar-Chart/Bar-Chart'
import LineChart from '../Line-Chart/Line-Chart'
import COLORS from 'constants/colors.json'
import classes from './Player-Performance-Trend.scss'
import matches from '../../fixtures/matches.json'
import Dropdown from '../Dropdown/Dropdown'
import _ from 'lodash'
import homeGrounds from '../../fixtures/Home-Ground.json'
import HeatMap from '../Heat-Map/Heat-Map'
import deliveries2008 from '../../fixtures/2008.json'
import deliveries2009 from '../../fixtures/2009.json'
import deliveries2010 from '../../fixtures/2010.json'
import deliveries2011 from '../../fixtures/2011.json'
import deliveries2012 from '../../fixtures/2012.json'
import deliveries2013 from '../../fixtures/2013.json'
import deliveries2014 from '../../fixtures/2014.json'
import deliveries2015 from '../../fixtures/2015.json'
import deliveries2016 from '../../fixtures/2016.json'

const mapping = {
  2008: deliveries2008,
  2009: deliveries2009,
  2010: deliveries2010,
  2011: deliveries2011,
  2012: deliveries2012,
  2013: deliveries2013,
  2014: deliveries2014,
  2015: deliveries2015,
  2016: deliveries2016
}
class PlayerPerformanceTrend extends React.Component {
  constructor(props) {
    super(props)
    this.getSelectedTeam = this.getSelectedTeam.bind(this)
    this.state = {
      selectedTeam : 'All',
      series: [],
      teams: [{'label': 'All', value: 'All'}],
      options: _.uniq(_.map(matches, 'team1')),
      seasons: _.uniq(_.map(matches, 'season')),
      uniqPlayers: [],
      players: [],
      heatMapData: {
        name: 'Average runs per season',
        title: 'Average runs per season'
      },
      heatMapSeries: [],
      allPlayers: [],
      selectedPlayer : 'V Kohli',
      runsBarSeries : [],
      runsBarData : {
        title: 'Runs Scored in every season'
      },
      wicketsBarSeries: [],
      wicketsBarData : {
        title: 'Wickets taken in every season'
      },
      boundaryPercentage: 0,
      dotsPercentage: 0
    }
    
    this.state.seasons.map(function(year){
      const allPlayers = []
      const uniqBatsmenInASeason = _.uniq(_.map(mapping[year], 'batsman'))
      const uniqBowlersInASeason = _.uniq(_.map(mapping[year], 'bowler'))
      this.state.allPlayers = uniqBatsmenInASeason.concat(uniqBowlersInASeason)
    }, this)

  
    this.state.uniqPlayers = _.uniq(this.state.allPlayers)

    this.state.uniqPlayers.map(function(item) {
      const newOption = {}
      newOption.label = item
      newOption.value = item
      this.state.players.push(newOption)
    }, this)

    const selectedPlayer = this.state.selectedPlayer
    const runsBarSeries = {}
    const boundarySeries = []
    const dotRuns = []
    const ballsFaced = []
    runsBarSeries.name = 'Runs'
    runsBarSeries.data = []
    this.state.seasons.reverse().map(function(year) {
       const totalRunsMade = mapping[year].reduce(function (n, match) {
        return n + (match.batsman == selectedPlayer ? parseInt(match['total_runs']) : 0)
      }, 0)
       const totalBoundries = mapping[year].reduce(function (n, match) {
        return n + (match.batsman == selectedPlayer && (match['batsman_runs'] == '4' || match['batsman_runs'] == '6') ? parseInt(match['batsman_runs']) : 0)
      }, 0)
       const totalDots = mapping[year].reduce(function (n, match) {
        return n + (match.batsman == selectedPlayer && (match['batsman_runs'] == '0'))
      }, 0)
       const totalBallsFaced =  mapping[year].reduce(function (n, match) {
        return n + (match.batsman == selectedPlayer)
      }, 0)
       dotRuns.push(totalDots)
       ballsFaced.push(totalBallsFaced)
       boundarySeries.push(totalBoundries)
       runsBarSeries.data.push(totalRunsMade)
    }, this)
    
    console.log(dotRuns, ballsFaced)
    this.state.dotsPercentage = Math.round((_.sum(dotRuns)/_.sum(ballsFaced))*100)
    this.state.boundaryPercentage = Math.round((_.sum(boundarySeries)/_.sum(runsBarSeries.data))*100)
    this.state.runsBarSeries.push(runsBarSeries)

    const wicketBarSeries = {}
    wicketBarSeries.name = 'Wickets'
    wicketBarSeries.data = []
    this.state.seasons.reverse().map(function(year) {
      const totalWicketsTook = _.filter(mapping[year], function(match) { if (match.bowler==selectedPlayer && match['player_dismissed']&& match['dismissal_kind']!=='run out') return match }).length
       wicketBarSeries.data.push(totalWicketsTook)
    }, this)

    this.state.wicketsBarSeries.push(wicketBarSeries)
    // this.state.seasons.map(function(year) {
    //    const totalWicketsTook = _.filter(mapping[year], function(match) { if (match.bowler==selectedPlayer && match['player_dismissed']&& match['dismissal_kind']!=='run out') return match }).length
    //    negativeColumnBowlers.data.push(totalWicketsTook)
    // }, this)
    // this.state.negativeColumnSeries.push(negativeColumnBowlers)
    // this.state.negativeColumnSeries.push(negativeColumnBatsmen)

  }
  getSelectedTeam(item){
    this.setState({selectedTeam: item.target.value})
    //  if(item.target.value !== 'All'){
    //   const oneTeamData = []
    //   oneTeamData.push(_.find(this.state.teamTrajectoryData, {name:item.target.value})) 

    //   const newPieChartSeriesHomeGround = []
    //   this.state.seasons.map(function(year) {
    //     const newOption = {}
    //     newOption.name = year
    //     const totalMatchesWon = matches.reduce(function (n, match) {
    //       return n + (match.winner == item.target.value && match.season == year)
    //     }, 0)
    //     const matchesWonHomeGround = matches.reduce(function (n, match) {
    //       return n + (match.winner == item.target.value && match.season == year && match.city == homeGrounds[item.target.value])
    //     }, 0)
    //     const percentage = (matchesWonHomeGround/totalMatchesWon)*100
    //     newOption.y = percentage
    //     newPieChartSeriesHomeGround.push(newOption)
    //    }, this)

    //   const newpieChartSeriesBatFirst = []
    //   this.state.seasons.map(function(year) {
    //     const newOption = {}
    //     newOption.name = year
    //     const totalMatchesWon = matches.reduce(function (n, match) {
    //       return n + (match.winner == item.target.value && match.season == year)
    //     }, 0)
    //     const matchesWonBatFirst = matches.reduce(function (n, match) {
    //       return n + ((match.winner == item.target.value && match['toss_winner'] == item.target.value && match['toss_decision'] == 'bat' && match.season == year)|| (match.winner == item.target.value && match['toss_winner'] !== item.target.value && match['toss_decision'] == 'field' && match.season == year))
    //     }, 0)
    //     const percentage = (matchesWonBatFirst/totalMatchesWon)*100
    //     newOption.y = percentage
    //     newpieChartSeriesBatFirst.push(newOption)
    //    }, this)

    //   this.setState({series: _.map(oneTeamData, _.partial(_.pick, _, ['name', 'data'])) , newpieChartSeriesHomeGround: newPieChartSeriesHomeGround, newpieChartSeriesBatFirst: newpieChartSeriesBatFirst})
    // }
    // else{
    //   this.setState({series: this.state.teamTrajectoryData})
    // }

  }
  render () {
    console.log(this.state)
  return ( <div className = { classes.container + ' full-size' } >
    <Dropdown optionList = { this.state.players } onChange={this.getSelectedTeam}/>
    <BarChart container='runs' series={this.state.runsBarSeries} xAxis={this.state.seasons} data={this.state.runsBarData}/>
    <BarChart container='wicktes' series={this.state.wicketsBarSeries} xAxis={this.state.seasons} data={this.state.wicketsBarData}/>
    <div>{this.state.boundaryPercentage}% boundaries</div><span>{this.state.dotsPercentage}% dots</span>
    </div >
  )
 }
}

PlayerPerformanceTrend.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default PlayerPerformanceTrend
