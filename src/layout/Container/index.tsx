import React from 'react'
import { Layout } from 'antd'
import Header from './Header'

import './index.less'

interface IProps {
  children?: React.ReactNode
}
const { Content } = Layout

export default (props: IProps) => {
  const { children } = props
  return (
    <Layout className="xm-container flex column">
      <Header />
      <Content className="xm-container__content">
        {children}
      </Content>
    </Layout>
  )
}

