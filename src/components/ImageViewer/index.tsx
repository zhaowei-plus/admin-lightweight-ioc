import React, { ReactNode } from 'react'
import { PhotoProvider, PhotoConsumer } from 'react-photo-view'
import 'react-photo-view/dist/index.css'

interface IProps {
  src: string
  children?: ReactNode | any
}

const ImageViewer = (props: IProps) => {
  const { src, children } = props
  return (
    <PhotoProvider>
      <PhotoConsumer
        src={src}
      >
        {children}
      </PhotoConsumer>
    </PhotoProvider>
  )
}

export default ImageViewer
