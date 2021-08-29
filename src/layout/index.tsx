import React, { Suspense } from 'react'
import ReactDom from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { ConfigProvider, Skeleton } from 'antd'
import { setup } from '@formily/antd-components'
import zhCN from 'antd/es/locale/zh_CN'
import '@/form'
import Routes from '@/routes'
import Container from './Container'
import './index.less'

// formily 注册表单
setup()

ReactDom.render(
  <ConfigProvider locale={zhCN}>
    <HashRouter>
      <Container>
        <Suspense fallback={<Skeleton />}>
          <Routes />
        </Suspense>
      </Container>
    </HashRouter>
  </ConfigProvider>,
  document.getElementById('root'),
)
