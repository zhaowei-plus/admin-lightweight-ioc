import React from 'react'
import { getService } from '../../config'
import './index.less'

const Service = () => {
  const serviceData = getService()
  return (
    <div className="service">
      {serviceData &&
        serviceData.map(item => {
          return (
            <div key={item.key} className="service__item">
              <p className="item__title">{item.title}</p>
              <p className="item__tel">{item.tel}</p>
              <p className="item__time">{item.time}</p>
            </div>
          )
        })}
    </div>
  )
}

export default Service
