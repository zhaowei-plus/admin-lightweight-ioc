import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import './index.less'
import WEATHER_BG from '@/assets/images/weatherBg.png'
import WEATHER_ICON from '@/assets/images/weatherIcon.png'

const Weather = () => {
  const [timeRange, setTimeRange] = useState("上午")
  const controlTimeShow = () => {
    dayjs.extend(isBetween)
    const currentDate = dayjs().format('YYYY-MM-DD')
    const wee = dayjs().isBetween(`${currentDate} 00:00:00`, `${currentDate} 05:00:00`)
    const moring = dayjs().isBetween(`${currentDate} 05:00:00`, `${currentDate} 09:00:00`)
    const forenoon = dayjs().isBetween(`${currentDate} 09:00:00`, `${currentDate} 12:00:00`)
    const midday = dayjs().isBetween(`${currentDate} 12:00:00`, `${currentDate} 14:00:00`)
    const afternoon = dayjs().isBetween(`${currentDate} 14:00:00`, `${currentDate} 18:00:00`)
    const night = dayjs().isBetween(`${currentDate} 18:00:00`, `${currentDate} 24:00:00`)
    if (wee) {
      setTimeRange('凌晨')
    }
    if (moring) {
      setTimeRange('早上')
    }
    if (forenoon) {
      setTimeRange('上午')
    }
    if (midday) {
      setTimeRange('中午')
    }
    if (afternoon) {
      setTimeRange('下午')
    }
    if (night) {
      setTimeRange('晚上')
    }
  }
  useEffect(() => {
    controlTimeShow()
  }, [])
  return (
    <div className="weather">
      <div className="weather__header">
        <img src={WEATHER_ICON} alt="" />
        <span>{timeRange}好!</span>
      </div>
      <div className="weather__img">
        <img src={WEATHER_BG} alt="" />
      </div>
    </div>
  )
}

export default Weather
