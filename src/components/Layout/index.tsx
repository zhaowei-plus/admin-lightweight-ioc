import React from 'react'
import { Spin } from 'antd'
import { useHistory } from 'react-router-dom'
import cs from 'classnames'
import './index.less'

// 公用布局组件
interface IProps {
  title?: string
  loading?: boolean
  hidden?: boolean
  back?: boolean
  children?: React.ReactNode
  extra?: React.ReactNode
  wrapperClassName?: string
}

const Layout = (props: IProps) => {
  const { loading = false, wrapperClassName, children } = props
  return (
    <Spin
      spinning={loading}
      wrapperClassName={`xm-layout ${wrapperClassName}`}>
      {children}
    </Spin>
  )
}

const Sider = (props: IProps) => {
  const { title, wrapperClassName, children } = props
  return (
    <div className={`xm-layout__sider flex column ac js ${wrapperClassName}`}>
      <div className="sider-header">
        {title}
      </div>
      <div className="sider-content">
        {children}
      </div>
    </div>
  )
}

const Menus = (props) => {
  const { title, extra, wrapperClassName, children } = props
  return (
    <div className={`menus flex column ac js ${wrapperClassName}`}>
      <div className="menus__header menus__header flex ac jsb">
        <span className="title">{title}</span>
        {
          extra && (
            <div className="extra">{extra}</div>
          )
        }
      </div>
      <div className="menus__content">
        {children}
      </div>
    </div>
  )
}

const Item = (props) => {
  const { title, active, extra, ...rest } = props
  return (
    <div className={cs('menu-item flex ac jsb', { 'active': active })} {...rest}>
      <div className="menu-item__title">{title}</div>
      {
        extra && (
          <div className="menu-item__extra">{extra}</div>
        )
      }
    </div>
  )
}

const Content = (props: IProps) => {
  const {
    loading = false,
    back,
    title,
    extra,
    children,
    wrapperClassName = '',
    ...rest
  } = props
  const history = useHistory()

  const handleBack = () => {
    history.goBack()
  }

  return (
    <div
      {...rest}
      className={`xm-layout__content ${wrapperClassName}`}
    >
      <Spin spinning={loading}>
        <div className="main-header flex ac js">
          {
            back && (<a className="back" onClick={handleBack}>返回</a>)
          }
          {
            title && (<span className="title">{title}</span>)
          }
          {
            extra && (<div className="extra">{extra}</div>)
          }
        </div>
        <div className="main-content">
          {children}
        </div>
      </Spin>
    </div>
  )
}

const Footer = (props: IProps) => {
  const {
    hidden,
    children,
    wrapperClassName = '',
    ...rest
  } = props
  return (
    <div
      {...rest}
      className={cs(`xm-layout__footer ${wrapperClassName}`, { hidden })}
    >
      {children}
    </div>
  )
}
Menus.Item = Item
Sider.Menus = Menus
Layout.Sider = Sider
Layout.Content = Content
Layout.Footer = Footer

export default Layout
