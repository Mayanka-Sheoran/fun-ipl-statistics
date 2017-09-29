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
    this.getSelectedYear = this.getSelectedYear.bind(this)
    this.getInitialState = this.getInitialState.bind(this)
    this.getSelectedPlayer = this.getSelectedPlayer.bind(this)
    this.getInitialState()
  }

  getInitialState(){
      this.state = {
      series: [],
      teams: [{'label': 'All', value: 'All'}],
      options: _.uniq(_.map(matches, 'team1')),
      seasons: _.uniq(_.map(matches, 'season')),
      seasonsOptions: [{'label': 'All', value: 'All'}],
      uniqPlayers: [],
      players: [],
      heatMapData: {
        name: 'Average runs per season',
        title: 'Average runs per season'
      },
      heatMapSeries: [],
      allPlayers: [],
      selectedPlayer : 'LMP Simmons',
      runsBarSeries : [],
      runsBarData : {
        title: 'Runs Scored in every season'
      },
      wicketBarSeries: [],
      wicketsBarData : {
        title: 'Wickets taken in every season'
      },
      boundaryPercentage: 0,
      dotsPercentage: 0,
      dotsGivenPercentage:0,
      extrasGivenPercentage : 0,
      selectedYear: '',
      xAxis: [],
      xAxisWickets: []
    }
  }
  componentWillMount(){
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
    
    this.state.seasons.map(function(item) {
      const newOption = {}
      newOption.label = item
      newOption.value = item
      this.state.seasonsOptions.push(newOption)
    }, this)

    const selectedPlayer = this.state.selectedPlayer
    const runsBarSeries = {}
    const boundarySeries = [] 
    const dotRuns = [] 
    const ballsFaced = [] 
    const dotsgivenArray = []
    const extrasGivenArray = []
    const totalRunsGivenArray =[] 
    const totalBowledArray = []
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
       const dotsGiven =  mapping[year].reduce(function (n, match) {
        return n + (match.bowler == selectedPlayer && (match['total_runs'] == '0'))
      }, 0)
       const totalBowled = mapping[year].reduce(function (n, match) {
        return n + (match.bowler == selectedPlayer)
      }, 0)
       const extrasGiven =  mapping[year].reduce(function (n, match) {
        return n + (match.bowler == selectedPlayer && (match['extra_runs'] !== '0') ? parseInt(match['extra_runs']) : 0)
      }, 0)
       const totalRunsGiven = mapping[year].reduce(function (n, match) {
        return n + (match.batsman == selectedPlayer ? parseInt(match['total_runs']) : 0)
      }, 0)
       dotsgivenArray.push(dotsGiven)
       extrasGivenArray.push(extrasGiven)
       totalRunsGivenArray.push(totalRunsGiven)
       totalBowledArray.push(totalBowled)
       dotRuns.push(totalDots)
       ballsFaced.push(totalBallsFaced)
       boundarySeries.push(totalBoundries)
       runsBarSeries.data.push(totalRunsMade)
    }, this)
    
    this.state.dotsPercentage = Math.round((_.sum(dotRuns)/_.sum(ballsFaced))*100)
    this.state.boundaryPercentage = Math.round((_.sum(boundarySeries)/_.sum(runsBarSeries.data))*100)
    this.state.extrasGivenPercentage = Math.round((_.sum(extrasGivenArray)/_.sum(totalRunsGivenArray))*100)
    this.state.dotsGivenPercentage = Math.round((_.sum(dotsgivenArray)/_.sum(totalBowledArray))*100)
    this.state.runsBarSeries.push(runsBarSeries)
    this.state.xAxis = this.state.seasons
    this.state.xAxisWickets = this.state.seasons

    const wicketBarSeries = {}
    wicketBarSeries.name = 'Wickets'
    wicketBarSeries.data = []
    this.state.seasons.reverse().map(function(year) {
      const totalWicketsTook = _.filter(mapping[year], function(match) { if (match.bowler==selectedPlayer && match['player_dismissed']&& match['dismissal_kind']!=='run out') return match }).length
       wicketBarSeries.data.push(totalWicketsTook)
    }, this)

    this.state.wicketBarSeries.push(wicketBarSeries)
  }

  getSelectedYear(item){
    this.setState({ selectedYear: item.target.value })
    if(item.target.value!='All'){

      const selectedPlayer = this.state.selectedPlayer
      const runsBarSeries = {}
      const wicketBarSeries  = {}
      runsBarSeries.name = 'Runs'
      runsBarSeries.data = []
      wicketBarSeries.name = 'Wickets'
      wicketBarSeries.data = []
      const matchOpponents = []
      const newRunsBarSeries = []
      const matchOpponentsBowling = []
      const newWicketBarSeries = []
      const year = item.target.value
      const deliveresPlayedByPlayer = _.filter(mapping[year], function(match) { 
          return match['batsman'] == selectedPlayer
      });
      const deliveresBowledByPlayer = _.filter(mapping[year], function(match) { 
          return match['bowler'] == selectedPlayer
      });
    
      _.map(_.groupBy(deliveresPlayedByPlayer, 'match_id'), function(item){
         matchOpponents.push(item[0]['bowling_team'])
         const runsMadeByPlayerInMatch = item.reduce(function (n, match) {
          return n + (parseInt(match['total_runs']))
        }, 0)
         runsBarSeries.data.push(runsMadeByPlayerInMatch)
      })
      newRunsBarSeries.push(runsBarSeries)

      _.map(_.groupBy(deliveresBowledByPlayer, 'match_id'), function(item){
        matchOpponentsBowling.push(item[0]['batting_team'])
         const wicketsTakenByPlayerInMatch = _.filter(item, function(match) { if (match['player_dismissed']&& match['dismissal_kind']!=='run out') return match }).length || 0
         console.log(wicketsTakenByPlayerInMatch)
        wicketBarSeries.data.push(wicketsTakenByPlayerInMatch)
      })
      
      newWicketBarSeries.push(wicketBarSeries)

      const totalRunsMade = mapping[year].reduce(function(n, match) {
        return n + (match.batsman == selectedPlayer ? parseInt(match['total_runs']) : 0)
      }, 0)
      const totalBoundries = mapping[year].reduce(function(n, match) {
        return n + (match.batsman == selectedPlayer && (match['batsman_runs'] == '4' || match['batsman_runs'] == '6') ? parseInt(match['batsman_runs']) : 0)
      }, 0)
      const totalDots = mapping[year].reduce(function(n, match) {
        return n + (match.batsman == selectedPlayer && (match['batsman_runs'] == '0'))
      }, 0)
      const totalBallsFaced = mapping[year].reduce(function(n, match) {
        return n + (match.batsman == selectedPlayer)
      }, 0)
      const dotsGiven = mapping[year].reduce(function(n, match) {
        return n + (match.bowler == selectedPlayer && (match['total_runs'] == '0'))
      }, 0)
      const totalBowled = mapping[year].reduce(function(n, match) {
        return n + (match.bowler == selectedPlayer)
      }, 0)
      const extrasGiven = mapping[year].reduce(function(n, match) {
        return n + (match.bowler == selectedPlayer && (match['extra_runs'] !== '0') ? parseInt(match['extra_runs']) : 0)
      }, 0)
      const totalRunsGiven = mapping[year].reduce(function(n, match) {
        return n + (match.batsman == selectedPlayer ? parseInt(match['total_runs']) : 0)
      }, 0)

      this.setState({
        dotsPercentage: Math.round((totalDots / totalBallsFaced) * 100),
        boundaryPercentage: Math.round((totalBoundries / totalRunsMade) * 100),
        extrasGivenPercentage: Math.round((extrasGiven / totalRunsGiven) * 100),
        dotsGivenPercentage: Math.round((dotsGiven / totalBowled) * 100),
        xAxis: matchOpponents,
        xAxisWickets: matchOpponentsBowling,
        runsBarSeries: newRunsBarSeries,
        wicketBarSeries: newWicketBarSeries
      })
    }
    else {
      this.getInitialState()
      this.componentWillMount()
    }
  }
  getSelectedPlayer(item){
    this.setState({selectedPlayer: item.target.value})
    this.getInitialState()
    this.componentWillMount()
  }
  render () {
    console.log(this.state)
  return ( <div className = { classes.container + ' full-size' } >
    <Dropdown optionList = { this.state.players } onChange={this.getSelectedPlayer}/>
    <Dropdown optionList = { this.state.seasonsOptions } onChange={this.getSelectedYear}/>
    <BarChart container='runs' series={this.state.runsBarSeries} xAxis={this.state.xAxis} data={this.state.runsBarData}/>
    <BarChart container='wicktes' series={this.state.wicketBarSeries} xAxis={this.state.xAxisWickets} data={this.state.wicketsBarData}/>
    <div>{this.state.boundaryPercentage || 0}% boundaries</div><span>{this.state.dotsPercentage || 0}% dots</span>
    <div>{this.state.extrasGivenPercentage || 0}% extras</div><span>{this.state.dotsGivenPercentage || 0}% dots bowled</span>
    </div >
  )
 }
}

PlayerPerformanceTrend.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default PlayerPerformanceTrend
