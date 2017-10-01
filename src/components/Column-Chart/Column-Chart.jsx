import React from 'react'
import Highcharts from 'highcharts'

class ColumnChart extends React.Component {
  componentDidMount () {
    const { data, series, xAxisCategories, container } = this.props
    this.initializeChart(data, series, xAxisCategories, container)
  }
  componentDidUpdate () {
    const { data, series, xAxisCategories, container } = this.props
    this.initializeChart(data, series, xAxisCategories, container)
  }
  render () {
    return (< div id={this.props.container}
      className='scroll' / >)
  }
  initializeChart = (data, series, xAxisCategories, container) => {
    Highcharts.chart(container, {
      colors: ['#616b7c'],
      chart: {
        type: 'column',
        backgroundColor: null
      },
      title: {
        text: data.title
      },
      xAxis: {
        categories: xAxisCategories,
        crosshair: true,
        title: {
          text: series[0].name
        }
      },
      tooltip: {
        valueSuffix: '%'
      },
      yAxis: {
        min: 0,
        visible: false
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{y}%'
          }
        }
      },
      legend: {
        enabled: false
      },
      series: series
    })
  }
}

ColumnChart.propTypes = {
  data: React.PropTypes.object.isRequired,
  series: React.PropTypes.array.isRequired,
  xAxisCategories: React.PropTypes.array,
  container: React.PropTypes.string.isRequired
}
export default ColumnChart
