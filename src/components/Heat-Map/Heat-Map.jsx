import React from 'react'
import Highcharts from 'highcharts'
import Highmaps from 'highcharts/Highmaps.src'

class HeatMap extends React.Component {
  componentDidMount() {
    const { data, series, container, xAxis, yAxis } = this.props
    this.initializeChart(data, series, container, xAxis, yAxis)
  }
  componentDidUpdate () {
    const { data, series, container, xAxis, yAxis } = this.props
    this.initializeChart(data, series, container, xAxis, yAxis)
  }
  render() {
    return ( < div id = {this.props.container}
      className = 'scroll' / > )
  }
  initializeChart = (data, series, container, xAxis, yAxis) => {
    Highmaps.chart(container, {
      chart: {
        type: 'heatmap'
      },
      title: {
        text: data.title
      },
      credits: {
        enabled: false
      },
      tooltip: {
        enabled: false
      },
      xAxis: {
        categories: xAxis
      },

      yAxis: {
        categories: yAxis,
        title: null
      },

      colorAxis: {
        min: 0,
        minColor: '#FFFFFF',
        maxColor: Highcharts.getOptions().colors[0]
      },
    
      legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 0,
        symbolHeight: 280
      },

      series: [{
        name: data.name,
        borderWidth: 1,
        data: series,
        dataLabels: {
          enabled: true,
          color: '#000000'
        }
      }]
    })

  }
}

HeatMap.propTypes = {
  data: React.PropTypes.object.isRequired
}
export default HeatMap
