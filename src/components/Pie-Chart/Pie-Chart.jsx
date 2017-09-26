import React from 'react'
import Highcharts from 'highcharts'

class PieChart extends React.Component {
  componentDidMount() {
    const { data, series } = this.props
    this.initializeChart(data, series)
  }

  render() {
    return ( < div id = 'containerPie'
      className = 'scroll' / > )
  }
  initializeChart = (data, series) => {
    Highcharts.chart('containerPie', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
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
  data: React.PropTypes.object.isRequired
}
export default PieChart
