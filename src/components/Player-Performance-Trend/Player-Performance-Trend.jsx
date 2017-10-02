import React from 'react'
import BarChart from '../Bar-Chart/Bar-Chart'
import classes from './Player-Performance-Trend.scss'
import Dropdown from '../Dropdown/Dropdown'
import _ from 'lodash'
import Card from '../Card/Card'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { connect } from 'react-redux'

class PlayerPerformanceTrend extends React.Component {
  constructor (props) {
    super(props)
    this.getSelectedYear = this.getSelectedYear.bind(this)
    this.getInitialState = this.getInitialState.bind(this)
    this.getSelectedPlayer = this.getSelectedPlayer.bind(this)
    this.calculateStats = this.calculateStats.bind(this)
    this.state = {
      series: [],
      teams: [{'label': 'All', value: 'All'}],
      options: _.uniq(_.map(this.props.matches, 'team1')),
      seasons: _.uniq(_.map(this.props.matches, 'season')),
      seasonsOptions: [{'label': 'All', value: 'All'}],
      uniqPlayers: [],
      players: [{'label': 'None', value: 'None'}],
      heatMapData: {
        name: 'Average runs per season',
        title: 'Average runs per season'
      },
      heatMapSeries: [],
      allPlayers: [],
      selectedPlayer: 'None',
      runsBarSeries: [],
      runsBarData: {
        title: 'Runs Scored in every season against the team on y axis'
      },
      wicketBarSeries: [],
      wicketsBarData: {
        title: 'Wickets taken in every season against the team on y axis'
      },
      boundaryPercentage: 0,
      dotsPercentage: 0,
      dotsGivenPercentage: 0,
      extrasGivenPercentage: 0,
      selectedYear: 'All',
      xAxis: [],
      xAxisWickets: []
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

  getInitialState () {
    this.state = {
      series: [],
      teams: [{'label': 'All', value: 'All'}],
      options: _.uniq(_.map(this.props.matches, 'team1')),
      seasons: _.uniq(_.map(this.props.matches, 'season')),
      seasonsOptions: [{'label': 'All', value: 'All'}],
      uniqPlayers: [],
      players: [{'label': 'None', value: 'None'}],
      heatMapData: {
        name: 'Average runs per season',
        title: 'Average runs per season'
      },
      heatMapSeries: [],
      allPlayers: [],
      selectedPlayer: this.state.selectedPlayer ? this.state.selectedPlayer : 'None',
      runsBarSeries: [],
      runsBarData: {
        title: 'Runs Scored in every season'
      },
      wicketBarSeries: [],
      wicketsBarData: {
        title: 'Wickets taken in every season'
      },
      boundaryPercentage: 0,
      dotsPercentage: 0,
      dotsGivenPercentage: 0,
      extrasGivenPercentage: 0,
      selectedYear: this.state.selectedYear ? this.state.selectedYear : 'All',
      xAxis: [],
      xAxisWickets: []
    }
  }
  componentWillMount () {
    this.state.seasons.map(function (year) {
      const uniqBatsmenInASeason = _.uniq(_.map(this.mapping[year], 'batsman'))
      const uniqBowlersInASeason = _.uniq(_.map(this.mapping[year], 'bowler'))
      this.state.allPlayers = uniqBatsmenInASeason.concat(uniqBowlersInASeason)
    }, this)

    this.state.uniqPlayers = _.uniq(this.state.allPlayers)

    this.state.uniqPlayers.map(function (item) {
      const newOption = {}
      newOption.label = item
      newOption.value = item
      this.state.players.push(newOption)
    }, this)

    this.state.seasons.map(function (item) {
      const newOption = {}
      newOption.label = item
      newOption.value = item
      this.state.seasonsOptions.push(newOption)
    }, this)
  }

  calculateStats (year, player) {
    if (year === 'All') {
      const selectedPlayer = player
      const runsBarSeries = {}
      const boundarySeries = []
      const dotRuns = []
      const ballsFaced = []
      const dotsgivenArray = []
      const extrasGivenArray = []
      const totalRunsGivenArray = []
      const totalBowledArray = []
      runsBarSeries.name = 'Runs'
      runsBarSeries.data = []
      this.state.seasons.map(function (year) {
        const totalRunsMade = this.mapping[year].reduce(function (n, match) {
          return n + (match.batsman === selectedPlayer ? match['batsman_runs'] : 0)
        }, 0)
        const totalBoundries = this.mapping[year].reduce(function (n, match) {
          return n + (match.batsman === selectedPlayer &&
            (match['batsman_runs'] === 4 || match['batsman_runs'] === 6) ? match['batsman_runs'] : 0)
        }, 0)
        const totalDots = this.mapping[year].reduce(function (n, match) {
          return n + (match.batsman === selectedPlayer && (match['batsman_runs'] === 0))
        }, 0)
        const totalBallsFaced = this.mapping[year].reduce(function (n, match) {
          return n + (match.batsman === selectedPlayer)
        }, 0)
        const dotsGiven = this.mapping[year].reduce(function (n, match) {
          return n + (match.bowler === selectedPlayer && (match['total_runs'] === 0))
        }, 0)
        const totalBowled = this.mapping[year].reduce(function (n, match) {
          return n + (match.bowler === selectedPlayer)
        }, 0)
        const extrasGiven = this.mapping[year].reduce(function (n, match) {
          return n + (match.bowler === selectedPlayer &&
            (match['extra_runs'] !== 0) ? match['extra_runs'] : 0)
        }, 0)
        const totalRunsGiven = this.mapping[year].reduce(function (n, match) {
          return n + (match.bowler === selectedPlayer ? match['total_runs'] : 0)
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

      this.state.dotsPercentage = Math.round((_.sum(dotRuns) / _.sum(ballsFaced)) * 100)
      this.state.boundaryPercentage = Math.round((_.sum(boundarySeries) / _.sum(runsBarSeries.data)) * 100)
      this.state.extrasGivenPercentage = Math.round((_.sum(extrasGivenArray) / _.sum(totalRunsGivenArray)) * 100)
      this.state.dotsGivenPercentage = Math.round((_.sum(dotsgivenArray) / _.sum(totalBowledArray)) * 100)
      this.state.runsBarSeries.push(runsBarSeries)
      this.state.xAxis = this.state.seasons
      this.state.xAxisWickets = this.state.seasons

      const wicketBarSeries = {}
      wicketBarSeries.name = 'Wickets'
      wicketBarSeries.data = []
      this.state.seasons.map(function (year) {
        const totalWicketsTook = _.filter(this.mapping[year], function (match) {
          if (match.bowler === selectedPlayer && match['player_dismissed'] !== '' &&
            match['dismissal_kind'] !== 'run out') return match
        }).length
        wicketBarSeries.data.push(totalWicketsTook)
      }, this)

      this.state.wicketBarSeries.push(wicketBarSeries)
    }
    if (year !== 'All') {
      const selectedPlayer = player
      const runsBarSeries = {}
      const wicketBarSeries = {}
      runsBarSeries.name = 'Runs'
      runsBarSeries.data = []
      wicketBarSeries.name = 'Wickets'
      wicketBarSeries.data = []
      const matchOpponents = []
      const newRunsBarSeries = []
      const matchOpponentsBowling = []
      const newWicketBarSeries = []
      const deliveresPlayedByPlayer = _.filter(this.mapping[year], function (match) {
        return match['batsman'] === selectedPlayer
      })
      const deliveresBowledByPlayer = _.filter(this.mapping[year], function (match) {
        return match['bowler'] === selectedPlayer
      })

      _.map(_.groupBy(deliveresPlayedByPlayer, 'match_id'), function (item) {
        matchOpponents.push(item[0]['bowling_team'])
        const runsMadeByPlayerInMatch = item.reduce(function (n, match) {
          return n + (match['total_runs'])
        }, 0)
        runsBarSeries.data.push(runsMadeByPlayerInMatch)
      })
      newRunsBarSeries.push(runsBarSeries)

      _.map(_.groupBy(deliveresBowledByPlayer, 'match_id'), function (item) {
        matchOpponentsBowling.push(item[0]['batting_team'])
        const wicketsTakenByPlayerInMatch = _.filter(item, function (match) {
          if (match['player_dismissed'] !== '' && match['dismissal_kind'] !== 'run out') { return match }
        }).length || 0
        wicketBarSeries.data.push(wicketsTakenByPlayerInMatch)
      })

      newWicketBarSeries.push(wicketBarSeries)

      const totalRunsMade = this.mapping[year].reduce(function (n, match) {
        return n + (match.batsman === selectedPlayer ? match['batsman_runs'] : 0)
      }, 0)
      const totalBoundries = this.mapping[year].reduce(function (n, match) {
        return n + (match.batsman === selectedPlayer &&
          (match['batsman_runs'] === 4 || match['batsman_runs'] === 6)
          ? match['batsman_runs'] : 0)
      }, 0)
      const totalDots = this.mapping[year].reduce(function (n, match) {
        return n + (match.batsman === selectedPlayer && (match['batsman_runs'] === 0))
      }, 0)
      const totalBallsFaced = this.mapping[year].reduce(function (n, match) {
        return n + (match.batsman === selectedPlayer)
      }, 0)
      const dotsGiven = this.mapping[year].reduce(function (n, match) {
        return n + (match.bowler === selectedPlayer && (match['total_runs'] === 0))
      }, 0)
      const totalBowled = this.mapping[year].reduce(function (n, match) {
        return n + (match.bowler === selectedPlayer)
      }, 0)
      const extrasGiven = this.mapping[year].reduce(function (n, match) {
        return n + (match.bowler === selectedPlayer && (match['extra_runs'] !== 0)
          ? match['extra_runs'] : 0)
      }, 0)
      const totalRunsGiven = this.mapping[year].reduce(function (n, match) {
        return n + (match.bowler === selectedPlayer ? match['total_runs'] : 0)
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
  }
  getSelectedYear (item) {
    this.setState({ selectedYear: item.target.value })
    if (item.target.value !== 'All') {
      this.getInitialState()
      this.componentWillMount()
      this.calculateStats(item.target.value, this.state.selectedPlayer)
    } else {
      this.getInitialState()
      this.componentWillMount()
      this.calculateStats('All', this.state.selectedPlayer)
    }
  }
  getSelectedPlayer (item) {
    this.setState({selectedPlayer: item.target.value})
    this.getInitialState()
    this.componentWillMount()
    this.calculateStats(this.state.selectedYear, item.target.value)
  }
  render () {
    return (<div className={classes.container + ' full-size'} >
      <Card cardType='selector'>
        <div className={classes.teamSelectorContainer}>
          <div className={classes.dropDownContainer}>
            <div className={classes.selectText}>Select a player</div>
            <Dropdown optionList={this.state.players} onChange={this.getSelectedPlayer} />
          </div>
          {this.state.selectedPlayer !== 'None' && <div className={classes.dropDownContainer}>
            <div className={classes.selectText}>Select an IPL season</div>
            <Dropdown optionList={this.state.seasonsOptions} onChange={this.getSelectedYear} />
          </div>}
        </div>
      </Card>
      {this.state.selectedPlayer !== 'None' && <div className={classes.flexAround + ' full-width'}>
        <div className='full-size'>
          <Tabs>
            <TabList>
              <Tab>Runs</Tab>
              <Tab>Wickets</Tab>
            </TabList>
            <TabPanel>
              <div className='full-size' >
                <BarChart container='runs' series={this.state.runsBarSeries}
                  xAxis={this.state.xAxis} data={this.state.runsBarData} />
              </div>
            </TabPanel>
            <TabPanel>
              <div className='full-size'>
                <BarChart container='wicktes' series={this.state.wicketBarSeries}
                  xAxis={this.state.xAxisWickets} data={this.state.wicketsBarData} />
              </div>
            </TabPanel>
          </Tabs>
        </div>
        <div className='full-size'>
          <div className='flex-center-xy full-width'><div>
            <div className={classes.number}>{this.state.boundaryPercentage || 0}%</div>
            <div className={classes.mediumText}> Runs scores in boundaries </div></div>
            <div>
              <div className={classes.number}>{this.state.dotsPercentage || 0}%</div>
              <div className={classes.mediumText}> Dot balls faced</div></div></div>
          <div className='flex-center-xy full-width'><div>
            <div className={classes.number}>{this.state.extrasGivenPercentage || 0}%</div>
            <div className={classes.mediumText}> Extras conceded</div></div>
            <div><div className={classes.number}>{this.state.dotsGivenPercentage || 0}%</div>
              <div className={classes.mediumText}>Dot balls bowled</div></div></div>
        </div>
      </div>}
    </div >
    )
  }
}

PlayerPerformanceTrend.propTypes = {
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

export default connect(mapStateToProps)(PlayerPerformanceTrend)
