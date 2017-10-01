import React from 'react'
import classes from './Carousel.scss'
import NukaCarousel from 'nuka-carousel'
import {Highlights} from 'fixtures/Highlights'
import trophy from '../../assets/trophy.png'
import best from '../../assets/best.png'
const Carousel = () => {
  const HighlightList = Highlights.map((data, index) => (
    <div key={data.text}>
      <img className={classes.best} src={best} />
      <div className={classes.factContainer}>
        <div className={classes.factText}>{data.text}</div>
        <img src={trophy} className={classes.trophy} />
      </div>
    </div>))
  return (
    <div className={classes.container + ' p1'}>
      <NukaCarousel autoplay wrapAround>
        {HighlightList}
      </NukaCarousel>
    </div>
  )
}

export default Carousel
