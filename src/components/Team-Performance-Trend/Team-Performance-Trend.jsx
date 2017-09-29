import React from 'react'
import BarChart from '../Bar-Chart/Bar-Chart'
import LineChart from '../Line-Chart/Line-Chart'
import ColumnChart from '../Column-Chart/Column-Chart'
import COLORS from 'constants/colors.json'
import classes from './Team-Performance-Trend.scss'
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
      columnChartData: {
        title: '% of Matches won batting first',
        name: 'Bat First'
      },
      columnChartSeriesBatFirst: [],
      columnChartSeriesHomeGround: [],
      newcolumnChartSeriesHomeGround: [],
      newcolumnChartSeriesBatFirst: [],
      columnChartDataHomeGround : {
        title: '% of Matches won on home ground',
        name: 'Home ground wins'
      },
      heatMapData: {
        name: 'Average runs per season',
        title: 'Average runs per season'
      },
      heatMapSeries: [],
      xAxisCategories: []
    }
    
  }
  componentWillMount(){
    this.state.options.map(function(team) {
      this.state.seasons.map(function(year) {
        const dataArray = []
        const averageArray = []
        dataArray.push(this.state.options.indexOf(team))
        dataArray.push(this.state.seasons.indexOf(year))
        const groupByMatch = _.groupBy(_.filter(mapping[year], function(match) { 
            return match['batting_team'] == team
         }), 'match_id')
        _.map(groupByMatch, function(match){
           const runsInOneMatch = match.reduce(function (n, match) {
            return n + (parseInt(match.total_runs))
          }, 0)
           averageArray.push(runsInOneMatch)
        })
         const average = _.reduce(averageArray, function(memo, num) {
          return memo + num;
        }, 0) / (averageArray.length === 0 ? 1 : averageArray.length)
         dataArray.push(Math.round(average))
         this.state.heatMapSeries.push(dataArray)
      }, this)
    }, this)

      const newOption = {}
      newOption.name = 'Teams'
      newOption.data = []
    this.state.options.map(function(item) {  
      const totalMatchesWon = matches.reduce(function (n, match) {
        return n + (match.winner == item)
      }, 0)
      const matchesWonBatFirst = matches.reduce(function (n, match) {
        return n + ((match.winner == item && match['toss_winner'] == item && match['toss_decision'] == 'bat')|| (match.winner == item && match['toss_winner'] !== item && match['toss_decision'] == 'field'))
      }, 0)
      const percentage = (matchesWonBatFirst/totalMatchesWon)*100
      newOption.data.push(parseInt(percentage))    
    }, this)
    this.state.columnChartSeriesBatFirst.push(newOption)
    this.state.xAxisCategories = this.state.options

      const newOptionHomeGround = {}
      newOptionHomeGround.name = 'Teams'
      newOptionHomeGround.data = []
     this.state.options.map(function(item) {
      const totalMatchesWon = matches.reduce(function (n, match) {
        return n + (match.winner == item)
      }, 0)
      const matchesWonHomeGround = matches.reduce(function (n, match) {
        return n + (match.winner == item && match.city == homeGrounds[item])
      }, 0)
      const percentage = (matchesWonHomeGround/totalMatchesWon)*100
      newOptionHomeGround.data.push(parseInt(percentage))    
    }, this)
      this.state.columnChartSeriesHomeGround.push(newOptionHomeGround)

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
      oneTeamData.push(_.find(this.state.teamTrajectoryData, {name:item.target.value})) 

      const newcolumnChartSeriesHomeGround = []
      const newOption = {}
      newOption.name = 'Season'
      newOption.data = []
      this.state.seasons.map(function(year) {
        const totalMatchesWon = matches.reduce(function (n, match) {
          return n + (match.winner == item.target.value && match.season == year)
        }, 0)
        const matchesWonHomeGround = matches.reduce(function (n, match) {
          return n + (match.winner == item.target.value && match.season == year && match.city == homeGrounds[item.target.value])
        }, 0)
        const percentage = (matchesWonHomeGround/totalMatchesWon)*100
        newOption.data.push(parseInt(percentage))
       }, this)
        newcolumnChartSeriesHomeGround.push(newOption)

      const newcolumnChartSeriesBatFirst = []
      const newOptionHomeGround = {}
      newOptionHomeGround.name = 'Season'
      newOptionHomeGround.data = []
      this.state.seasons.map(function(year) {
        
        const totalMatchesWon = matches.reduce(function (n, match) {
          return n + (match.winner == item.target.value && match.season == year)
        }, 0)
        const matchesWonBatFirst = matches.reduce(function (n, match) {
          return n + ((match.winner == item.target.value && match['toss_winner'] == item.target.value && match['toss_decision'] == 'bat' && match.season == year)|| (match.winner == item.target.value && match['toss_winner'] !== item.target.value && match['toss_decision'] == 'field' && match.season == year))
        }, 0)
        const percentage = (matchesWonBatFirst/totalMatchesWon)*100
        newOptionHomeGround.data.push(parseInt(percentage))
        
       }, this)
      newcolumnChartSeriesBatFirst.push(newOptionHomeGround)

      this.setState({series: _.map(oneTeamData, _.partial(_.pick, _, ['name', 'data'])) , newcolumnChartSeriesHomeGround: newcolumnChartSeriesHomeGround, newcolumnChartSeriesBatFirst: newcolumnChartSeriesBatFirst, xAxisCategories: this.state.seasons})
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
     <div className = 'flex performace-chart pl1'>
    <ColumnChart data={this.state.columnChartData} xAxisCategories={this.state.xAxisCategories} series={this.state.selectedTeam == 'All' ? this.state.columnChartSeriesBatFirst: this.state.newcolumnChartSeriesBatFirst} container='containercolumn'/>
   </div> 
   <div className = 'flex performace-chart pl1'><ColumnChart xAxisCategories={this.state.xAxisCategories} data={this.state.columnChartDataHomeGround} series={this.state.selectedTeam == 'All' ? this.state.columnChartSeriesHomeGround : this.state.newcolumnChartSeriesHomeGround} container='containercolumn2'/></div>
   </div>
   <HeatMap data={this.state.heatMapData} container='heat-map-runs' xAxis={this.state.options} yAxis={this.state.seasons} series={this.state.heatMapSeries}/>
   </div> 
    </div >
  )
 }
}

TeamPerformanceTrend.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default TeamPerformanceTrend
