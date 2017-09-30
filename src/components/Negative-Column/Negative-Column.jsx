import React from 'react'
import Highcharts from 'highcharts'

class NegativeColumn extends React.Component {
  componentDidMount () {
    const { data, series, container, categories } = this.props
    this.initializeChart(data, series, container, categories)
  }
  componentDidUpdate () {
    const { data, series, container, categories } = this.props
    this.initializeChart(data, series, container, categories)
  }
  render () {
    return (< div id={this.props.container}
      className='scroll' / >)
  }
  initializeChart = (data, series, container, categories) => {
    Highcharts.chart(container, {
      chart: {
        type: 'bar'
      },
      title: {
        text: data.title
      },
      credits: {
        enabled: false
      },
      xAxis: [{
        categories: categories,
        reversed: false,
        labels: {
          step: 1
        }
      }, { // mirror axis on right side
        opposite: true,
        reversed: false,
        categories: categories,
        linkedTo: 0,
        labels: {
          step: 1
        }
      }],
      yAxis: {
        title: {
          text: null
        },
        labels: {
          formatter: function () {
            return Math.abs(this.value) + '%'
          }
        }
      },

      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },

      series: series
    })
  }
}

NegativeColumn.propTypes = {
  data: React.PropTypes.object.isRequired
}
export default NegativeColumn
