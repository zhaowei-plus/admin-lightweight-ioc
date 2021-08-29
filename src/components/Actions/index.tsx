import React from 'react'
import { Space } from 'antd'
import './index.less'

const Actions = props => {
  const { children } = props
  return (
    <Space className="actions flex ac js">
      {children}
    </Space>
  )
}

export default Actions
