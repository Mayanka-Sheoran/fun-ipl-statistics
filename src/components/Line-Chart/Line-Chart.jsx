import React from 'react'
import Highcharts from 'highcharts'

class LineChart extends React.Component {
  componentDidMount () {
    const { data } = this.props
    this.initializeChart(data)
  }

  render () {
    return (< div id='container'
      className='scroll' / >)
  }
  initializeChart = (data) => {
    Highcharts.chart('container', {
      chart: {
        type: 'line'
      },
      title: {
        text: data.title
      },
      subtitle: {
        text: data.subTitle
      },
      yAxis: {
        title: {
          text: data.yAxisTitle
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      plotOptions: {
        series: {
          pointStart: 2008
        }
      },
      series: data.series
    })
  }
}

LineChart.propTypes = {
  data: React.PropTypes.object.isRequired
}
export default LineChart
