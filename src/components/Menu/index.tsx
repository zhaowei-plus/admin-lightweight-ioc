import React from 'react'
import './index.less'
import { Button } from 'antd'

const Menu = (props) => {
  const { menus = [], renderMenu } = props
  return (
    <div className="menus flex column ac js">
      <div className="menus__header flex ac jsb">
        <div className="title">
          分组
        </div>
        <div className="extra">
          <Button>+</Button>
        </div>
      </div>
      <div className="menus__list flex column ac js">
        {
          menus.map(menu => (
            renderMenu(menu)
          ))
        }
      </div>
    </div>
  )
}

export default Menu
