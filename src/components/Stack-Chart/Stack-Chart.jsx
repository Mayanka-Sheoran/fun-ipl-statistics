import React from 'react'
import Highcharts from 'highcharts'

class StackChart extends React.Component {
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
        height: data.height,
        backgroundColor: null
      },
      plotOptions: {
        column: {
          stacking: 'normal'
        },
        series: {
          pointWidth: 30
        }
      },
      title: {
        text: null
      },
      xAxis: {
        categories: data.xAxisCategories,
        labels: {
          align: 'center',
          useHTML: true,
          style: {
            width: '50px'
          }
        }
      },
      yAxis: {
        visible: false
      },
      legend: {
        enabled: false
      },
      tooltip: {
        enabled: false
      },
      series: data.series
    })
  }
}

StackChart.propTypes = {
  data: React.PropTypes.object.isRequired
}
export default StackChart
