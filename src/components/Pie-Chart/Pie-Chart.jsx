import React from 'react'
import Highcharts from 'highcharts'

class PieChart extends React.Component {
  componentDidMount () {
    const { data, series, container } = this.props
    this.initializeChart(data, series, container)
  }
  componentDidUpdate () {
    const { data, series, container } = this.props
    this.initializeChart(data, series, container)
  }
  render () {
    return (< div id={this.props.container}
      className='scroll' / >)
  }
  initializeChart = (data, series, container) => {
    Highcharts.chart(container, {
      colors: ['#a82a28', '#478724'],
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        backgroundColor: null
      },
      title: {
        text: data.title
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      },
      series: [{
        name: data.name,
        colorByPoint: true,
        data: series
      }]
    })
  }
}

PieChart.propTypes = {
  data: React.PropTypes.object.isRequired,
  series: React.PropTypes.array.isRequired,
  container: React.PropTypes.string.isRequired
}
export default PieChart
