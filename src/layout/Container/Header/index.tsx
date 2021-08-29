import React from 'react'
import cs from 'classnames'
import cookies from 'js-cookie'
import { UserOutlined, CaretDownOutlined } from '@ant-design/icons'
import { useHistory, useLocation } from 'react-router-dom'
import { Avatar, Dropdown, Menu } from 'antd'
import http from '@/api'
import routesConfig from '@/routes/config'

import './index.less'

interface IMenu {
  key?: string
  title: string
  path?: string
  children?: Array<IMenu>
}

const Header = () => {
  const history  = useHistory()
  const { pathname } = useLocation()
  const { myself = {} } = cookies.getJSON()
  const { loginName } = myself

  const checkLogin = () => {
    return http.get('loginCheck')
  }

  const loginOut = () => {
    return http.post('loginOut').then(() => {
      window.location.href = window.location.origin + '/admin/#/logout'
    })
  }

  const onSelect = (path) => {
    history.push(path.replace('/:id', ''))
    checkLogin()
  }

  const handleSubMenuClick = ({ key }) => {
    if (key === 'logout') {
      loginOut()
    } else {
      onSelect(key)
    }
  }

  const renderOverlay = (menus: Array<IMenu>) => {
    return (
      <Menu onClick={handleSubMenuClick}>
        {
          menus.map(menu => (
            <Menu.Item key={menu.path}>
              <div className="sub-menu-item flex ac js active">
                <i className={`sub-menu-item__icon icon-${menu.key}`} />
                <div className="sub-menu-item__title">
                  {menu.title}
                </div>
              </div>
            </Menu.Item>
          ))
        }
      </Menu>
    )
  }

  const renderUserOverlay = () => {
    return (
      <Menu onClick={handleSubMenuClick}>
        <Menu.Item key="logout">
          <div>登出</div>
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <div className="xm-header flex ac js">
      <div className="xm-header__info flex ac jc">
        <div className="xm-company flex ac js">
          <i className="xm-company__icon flex ac jc"/>
          <div className="xm-company__title">
            华为城市指标体征库
          </div>
        </div>
      </div>
      <div className="xm-header__menus flex ac js">
        {
          routesConfig.map((menu: IMenu) => {
            if (Array.isArray(menu.children)) {
              return (
                <Dropdown
                  key={menu.path}
                  overlay={renderOverlay(menu.children)}
                >
                  <div
                    className={
                      cs('menu', {
                        'active': pathname.indexOf(menu.path) > -1,
                      })
                    }
                  >
                    {menu.title}
                  </div>
                </Dropdown>
              )
            }
            return (
              <div
                key={menu.path}
                className={
                  cs('menu', {
                    'active': pathname.indexOf(menu.path) > -1,
                  })
                }
                onClick={() => onSelect(menu.path)}
              >
                {menu.title}
              </div>
            )
          })
        }
      </div>
      <div className="xm-header__user flex ac jsb">
        <Avatar
          size={26}
          icon={<UserOutlined />}
        >
          {loginName}
        </Avatar>
        <div className="user__name">{loginName}</div>
        <Dropdown overlay={renderUserOverlay()}>
          <CaretDownOutlined />
        </Dropdown>
      </div>
    </div>
  )
}

export default Header
