import React from 'react'
import Weather from './components/Weather'
import Service from './components/Service'
import Project from './components/Project'
import './index.less'

const Home = () => {
  return (
    <div className="home flex as js">
      <Weather />
      <Project />
      <Service />
    </div>
  )
}

export default Home
