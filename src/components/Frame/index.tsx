import React from 'react'
import './index.less'

interface IProps {
  name?: string
  src?: string
  title?: string
}

const Frame = (props: IProps) => {
  const { src, name } = props

  if (!src) {
    return null
  }

  return (
    <iframe
      src={src}
      title={name}
      width="100%"
      height="100%"
      frameBorder={0}
      className="frame"
    />
  )
}

export default Frame
