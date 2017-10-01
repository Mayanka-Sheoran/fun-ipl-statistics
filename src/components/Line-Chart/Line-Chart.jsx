import React from 'react'
import Highcharts from 'highcharts'

class LineChart extends React.Component {
  componentDidMount () {
    const { data, series } = this.props
    this.initializeChart(data, series)
  }
  componentDidUpdate () {
    const { data, series } = this.props
    this.initializeChart(data, series)
  }
  render () {
    return (< div id='container'
      className='scroll' / >)
  }
  initializeChart = (data, series) => {
    Highcharts.chart('container', {
      chart: {
        type: 'line',
        backgroundColor: null
      },
      title: {
        text: data.title
      },
      credits: {
        enabled: false
      },
      subtitle: {
        text: data.subTitle
      },
      yAxis: {
        title: {
          text: data.yAxisTitle
        }
      },
      plotOptions: {
        series: {
          pointStart: 2008
        }
      },
      series: series
    })
  }
}

LineChart.propTypes = {
  data: React.PropTypes.object.isRequired,
  series: React.PropTypes.array.isRequired
}
export default LineChart
