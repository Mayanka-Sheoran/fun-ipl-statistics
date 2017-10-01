import React from 'react'
import Highcharts from 'highcharts'

class BarChart extends React.Component {
  componentDidMount () {
    const { data, series, xAxis, container } = this.props
    this.initializeChart(data, series, xAxis, container)
  }
  componentDidUpdate () {
    const { data, series, xAxis, container } = this.props
    this.initializeChart(data, series, xAxis, container)
  }
  render () {
    return (< div id={this.props.container} className='scroll' / >)
  }
  initializeChart = (data, series, xAxis, container) => {
    Highcharts.chart(container, {
      colors: ['#616b7c'],
      chart: {
        type: 'bar',
        backgroundColor: null
      },
      title: {
        text: data.title
      },
      xAxis: {
        categories: xAxis,
        title: {
          text: null
        },
        tickInterval: 1
      },
      yAxis: {
        tickPixelInterval: 100
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      credits: {
        enabled: false
      },
      series: series
    })
  }
}

BarChart.propTypes = {
  data: React.PropTypes.object.isRequired,
  series: React.PropTypes.array.isRequired,
  xAxis: React.PropTypes.array,
  container: React.PropTypes.string.isRequired
}
export default BarChart
