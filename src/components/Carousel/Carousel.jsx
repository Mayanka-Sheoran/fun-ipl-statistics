import React from 'react'
import classes from './Carousel.scss'
import NukaCarousel from 'nuka-carousel'
import {Highlights} from 'fixtures/Highlights'

const Carousel = () => {
  const HighlightList = Highlights.map((data, index) => (<div className={'p1 ' + data.type} key={data.text}>
    <div className=''>{data.text}</div>
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
