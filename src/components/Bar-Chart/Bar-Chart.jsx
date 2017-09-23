import React from 'react'
import Highcharts from 'highcharts'

class BarChart extends React.Component {
  componentDidMount () {
    const {data} = this.props
    this.initializeChart(data)
  }

  render () {
    return (<div id='container' className='scroll' />)
  }
  initializeChart = (data) => {
    Highcharts.chart('container', {
      chart: {
        type: 'column',
        height: data.height
      },
      title: {
        text: null
      },
      plotOptions: {
        column: {
          colorByPoint: true
        },
        series: {
          pointWidth: 20
        }
      },
      xAxis: [
        {
          categories: data.xAxisCategories
        }
      ],
      yAxis: {
        visible: false
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      tooltip: {
        enabled: false
      },
      series: [{
        name: 'Performance Trend',
        data: data.series,
        colors: data.colors
      }]
    })
  }
}

BarChart.propTypes = {
  data: React.PropTypes.object.isRequired
}
export default BarChart
