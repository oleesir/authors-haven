import React, { FunctionComponent } from 'react'
import classes from './Banner.module.css'

const Banner: FunctionComponent = () => {
  return (
    <div className={classes.Banner}>
      <div className={classes.LeftMessage}>
        <p className={classes.TopMessage}>Join a global community of positive people</p>
        <p className={classes.BottomMessage}>Write and share your stories.</p>
      </div>
      <div className={classes.RightMessage}>
        <img src="/images/reading.svg" alt="banner" className={classes.BannerImg} />
      </div>
    </div>
  )
}

export default Banner
