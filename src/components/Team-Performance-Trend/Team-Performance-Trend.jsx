import React from 'react'
import LineChart from '../Line-Chart/Line-Chart'
import ColumnChart from '../Column-Chart/Column-Chart'
import classes from './Team-Performance-Trend.scss'
import Dropdown from '../Dropdown/Dropdown'
import _ from 'lodash'
import homeGrounds from '../../fixtures/Home-Ground.json'
import HeatMap from '../Heat-Map/Heat-Map'
import Card from '../Card/Card'
import logo from '../../assets/white-ipl-logo.jpg'
import Kolkata from '../../assets/KKR logo.png'
import Chennai from '../../assets/CSK logo.png'
import Rajasthan from '../../assets/RR logo.png'
import Mumbai from '../../assets/MI logo.png'
import Deccan from '../../assets/DC logo.png'
import Kings from '../../assets/KXIP logo.png'
import Royal from '../../assets/RBC logo.png'
import Delhi from '../../assets/DD logo.png'
import Kochi from '../../assets/KTK logo.png'
import Pune from '../../assets/PWI logo.png'
import Sunrisers from '../../assets/SH logo.jpg'
import Supergiants from '../../assets/RPS logo.png'
import Lions from '../../assets/GL logo.png'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { connect } from 'react-redux'

const imageMapping = {
  'All Teams': logo,
  'Kolkata Knight Riders': Kolkata,
  'Chennai Super Kings': Chennai,
  'Rajasthan Royals': Rajasthan,
  'Mumbai Indians': Mumbai,
  'Deccan Chargers': Deccan,
  'Kings XI Punjab': Kings,
  'Royal Challengers Bangalore': Royal,
  'Delhi Daredevils': Delhi,
  'Kochi Tuskers Kerala': Kochi,
  'Pune Warriors': Pune,
  'Sunrisers Hyderabad': Sunrisers,
  'Rising Pune Supergiants': Supergiants,
  'Gujarat Lions': Lions
}

class TeamPerformanceTrend extends React.Component {
  constructor (props) {
    super(props)
    this.getSelectedTeam = this.getSelectedTeam.bind(this)
    this.state = {
      selectedTeam: 'All Teams',
      series: [],
      teams: [{'label': 'All Teams', value: 'All Teams'}],
      options: _.uniq(_.map(this.props.matches, 'team1')),
      seasons: _.uniq(_.map(this.props.matches, 'season')),
      teamTrajectoryData: [],
      columnChartData: {
        title: '% of Matches won batting first',
        name: 'Bat First'
      },
      columnChartSeriesBatFirst: [],
      columnChartSeriesHomeGround: [],
      newcolumnChartSeriesHomeGround: [],
      newcolumnChartSeriesBatFirst: [],
      columnChartDataHomeGround: {
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
    this.mapping = {
      2008: this.props['2008'],
      2009: this.props['2009'],
      2010: this.props['2010'],
      2011: this.props['2011'],
      2012: this.props['2012'],
      2013: this.props['2013'],
      2014: this.props['2014'],
      2015: this.props['2015'],
      2016: this.props['2016']
    }
  }
  componentWillMount () {
    this.state.options.map(function (team) {
      this.state.seasons.map(function (year) {
        const dataArray = []
        const averageArray = []
        dataArray.push(this.state.options.indexOf(team))
        dataArray.push(this.state.seasons.indexOf(year))
        const groupByMatch = _.groupBy(_.filter(this.mapping[year], function (match) {
          return match['batting_team'] === team
        }), 'match_id')
        _.map(groupByMatch, function (match) {
          const runsInOneMatch = match.reduce(function (n, match) {
            return n + (parseInt(match['total_runs']))
          }, 0)
          averageArray.push(runsInOneMatch)
        })
        const average = _.reduce(averageArray, function (memo, num) {
          return memo + num
        }, 0) / (averageArray.length === 0 ? 1 : averageArray.length)
        dataArray.push(Math.round(average))
        this.state.heatMapSeries.push(dataArray)
      }, this)
    }, this)

    const newOption = {}
    newOption.name = 'Teams'
    newOption.data = []
    this.state.options.map(function (item) {
      const totalMatchesWon = this.props.matches.reduce(function (n, match) {
        return n + (match.winner === item)
      }, 0)
      const matchesWonBatFirst = this.props.matches.reduce(function (n, match) {
        return n + ((match.winner === item && match['toss_winner'] === item &&
          match['toss_decision'] === 'bat') ||
        (match.winner === item && match['toss_winner'] !== item && match['toss_decision'] === 'field'))
      }, 0)
      const percentage = (matchesWonBatFirst / totalMatchesWon) * 100
      newOption.data.push(parseInt(percentage))
    }, this)
    this.state.columnChartSeriesBatFirst.push(newOption)
    this.state.xAxisCategories = this.state.options

    const newOptionHomeGround = {}
    newOptionHomeGround.name = 'Teams'
    newOptionHomeGround.data = []
    this.state.options.map(function (item) {
      const totalMatchesWon = this.props.matches.reduce(function (n, match) {
        return n + (match.winner === item)
      }, 0)
      const matchesWonHomeGround = this.props.matches.reduce(function (n, match) {
        return n + (match.winner === item && match.city === homeGrounds[item])
      }, 0)
      const percentage = (matchesWonHomeGround / totalMatchesWon) * 100
      newOptionHomeGround.data.push(parseInt(percentage))
    }, this)
    this.state.columnChartSeriesHomeGround.push(newOptionHomeGround)

    this.state.options.map(function (item) {
      const newOption = {}
      newOption.label = item
      newOption.value = item
      this.state.teams.push(newOption)
    }, this)

    this.state.options.map(function (item) {
      const newOption = {}
      newOption.name = item
      newOption.data = []
      this.state.seasons.forEach(function (season) {
        let numberOfMatchesWon = 0
        _.forEach(this.props.matches, function (data) {
          if (data.season === season && data.winner === item) {
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
  getSelectedTeam (item) {
    this.setState({selectedTeam: item.target.value})
    if (item.target.value !== 'All Teams') {
      const oneTeamData = []
      oneTeamData.push(_.find(this.state.teamTrajectoryData, {name: item.target.value}))

      const newcolumnChartSeriesHomeGround = []
      const newOption = {}
      newOption.name = 'Season'
      newOption.data = []
      this.state.seasons.map(function (year) {
        const totalMatchesWon = this.props.matches.reduce(function (n, match) {
          return n + (match.winner === item.target.value && match.season === year)
        }, 0)
        const matchesWonHomeGround = this.props.matches.reduce(function (n, match) {
          return n + (match.winner === item.target.value &&
           match.season === year && match.city === homeGrounds[item.target.value])
        }, 0)
        const percentage = (matchesWonHomeGround / totalMatchesWon) * 100
        newOption.data.push(parseInt(percentage))
      }, this)
      newcolumnChartSeriesHomeGround.push(newOption)

      const newcolumnChartSeriesBatFirst = []
      const newOptionHomeGround = {}
      newOptionHomeGround.name = 'Season'
      newOptionHomeGround.data = []
      this.state.seasons.map(function (year) {
        const totalMatchesWon = this.props.matches.reduce(function (n, match) {
          return n + (match.winner === item.target.value && match.season === year)
        }, 0)
        const matchesWonBatFirst = this.props.matches.reduce(function (n, match) {
          return n + ((match.winner === item.target.value &&
            match['toss_winner'] === item.target.value &&
             match['toss_decision'] === 'bat' &&
              match.season === year) || (match.winner === item.target.value &&
              match['toss_winner'] !== item.target.value && match['toss_decision'] === 'field' &&
              match.season === year))
        }, 0)
        const percentage = (matchesWonBatFirst / totalMatchesWon) * 100
        newOptionHomeGround.data.push(parseInt(percentage))
      }, this)
      newcolumnChartSeriesBatFirst.push(newOptionHomeGround)

      this.setState({series: _.map(oneTeamData,
       _.partial(_.pick, _, ['name', 'data'])),
        newcolumnChartSeriesHomeGround: newcolumnChartSeriesHomeGround,
        newcolumnChartSeriesBatFirst: newcolumnChartSeriesBatFirst, xAxisCategories: this.state.seasons})
    } else {
      this.setState({series: this.state.teamTrajectoryData})
    }
  }
  render () {
    return (<div className={classes.container + ' full-size'} >
      <Card cardType='selector'>
        <div className={classes.teamSelectorContainer}>
          <img className={classes.whiteLogo} src={imageMapping[this.state.selectedTeam]} />
          <div className={classes.dropDownContainer}>
            <div className={classes.selectText}>Select a team</div>
            <Dropdown optionList={this.state.teams} onChange={this.getSelectedTeam} />
          </div>
        </div>
      </Card>
      <Tabs>
        <TabList>
          <Tab>Team Trajectory</Tab>
          <Tab>Bat First Wins</Tab>
          <Tab>Home Ground Wins</Tab>
          <Tab>Average Runs</Tab>
        </TabList>

        <TabPanel>
          <div className='flex performace-chart pl1' >
            <LineChart data={this.data}
              series={this.state.series.length > 0 ? this.state.series : this.state.teamTrajectoryData} />
          </div>
        </TabPanel>
        <TabPanel>
          <div className='flex performace-chart pl1'>
            <ColumnChart data={this.state.columnChartData}
              xAxisCategories={this.state.xAxisCategories}
              series={this.state.selectedTeam === 'All Teams'
            ? this.state.columnChartSeriesBatFirst : this.state.newcolumnChartSeriesBatFirst}
              container='containercolumn' />
          </div>
        </TabPanel>
        <TabPanel>
          <div className='flex performace-chart pl1'>
            <ColumnChart xAxisCategories={this.state.xAxisCategories}
              data={this.state.columnChartDataHomeGround}
              series={this.state.selectedTeam === 'All Teams'
           ? this.state.columnChartSeriesHomeGround : this.state.newcolumnChartSeriesHomeGround}
              container='containercolumn2' /></div>
        </TabPanel>
        <TabPanel>
          <HeatMap data={this.state.heatMapData} container='heat-map-runs'
            xAxis={this.state.options} yAxis={this.state.seasons} series={this.state.heatMapSeries} />
        </TabPanel>

      </Tabs>
    </div >
    )
  }
}

TeamPerformanceTrend.propTypes = {
  params: React.PropTypes.object.isRequired,
  matches: React.PropTypes.array,
  '2008': React.PropTypes.array,
  '2009': React.PropTypes.array,
  '2010': React.PropTypes.array,
  '2011': React.PropTypes.array,
  '2012': React.PropTypes.array,
  '2013': React.PropTypes.array,
  '2014': React.PropTypes.array,
  '2015': React.PropTypes.array,
  '2016': React.PropTypes.array
}

const mapStateToProps = (state) => ({
  matches: state.commonData.matches.data,
  '2008': state.commonData['2008'],
  '2009': state.commonData['2009'],
  '2010': state.commonData['2010'],
  '2011': state.commonData['2011'],
  '2012': state.commonData['2012'],
  '2013': state.commonData['2013'],
  '2014': state.commonData['2014'],
  '2015': state.commonData['2015'],
  '2016': state.commonData['2016']
})

export default connect(mapStateToProps)(TeamPerformanceTrend)
