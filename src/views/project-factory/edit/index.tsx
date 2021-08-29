import React, { useEffect, useLayoutEffect } from 'react'
import { Frame } from '@/components'

const Edit = (props) => {
  const { history, match: { url, params: { id } } } = props
  useLayoutEffect(() => {
    window.top.localStorage.setItem('iocInfo', JSON.stringify({ id }))
  }, [])

  useEffect(() => {
    window.top.addEventListener('message', message => {
      const { type } = message.data
      if (type === 'close') {
        history.push(url.split('/').slice(0, -2).join('/'))
      }
    })
  }, [])

  return (
    <Frame
      src={`${window?.top.location.origin}/compose-admin/#/ioc`}
      title="轻量化IOC项目配置"
    />
  )
}

export default Edit
