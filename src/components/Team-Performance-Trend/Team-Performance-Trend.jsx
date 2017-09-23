import React from 'react'
import BarChart from '../Bar-Chart/Bar-Chart'
import COLORS from 'constants/colors.json'
import classes from './Team-Performance-Trend.scss'

const EfficiencyPerformanceTrend = () => {
  //dummy graph
  const data = {
    height: 200,
    xAxisCategories: ['Baseline', 'Oct\'16', 'Nov\'16', 'Dec\'16', 'TRAGET'],
    series: [70, 50, 60, 90, 80],
    colors: [COLORS.THEME_MAP_BLACK, COLORS.THEME_MAP_RED, COLORS.THEME_MAP_YELLOW,
      COLORS.THEME_MAP_GREEN, COLORS.THEME_LEGEND_GREY ]
  }
  const title = 'Total Efficiency (%) (External)'
  return (
    <div className={classes.container + ' full-size'}>
      <div className='flex performace-chart pl1'>
        <div className='title-block p2 flex'>
          {title}
        </div>
        <BarChart data={data} />
      </div>
    </div>
  )
}

EfficiencyPerformanceTrend.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default EfficiencyPerformanceTrend
