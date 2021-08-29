import React from 'react'
import cs from 'classnames'
import { Checkbox, Tag, Popover, Tooltip } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'
import './index.less'

interface IProps {
  id?: number
  record?: any
  checked?: boolean
  editable?: boolean
  enableChecked?: boolean
  extra?: React.ReactNode
  onClick?: () => void
  onSelect?: (checked: boolean) => void
}

const FeatureCard = (props: IProps) => {
  const { checked, enableChecked, extra, record = {}, editable = true, onClick, onSelect } = props

  const handleStopPropagation = event => {
    event.stopPropagation()
  }

  return (
    <div
      onClick={onClick}
      className="feature-card flex column ac js active"
    >
      <div className="feature-card__header flex ac jsb">
        <span className="title">
          <Tooltip title={record.signName}>
            {record.signName}
          </Tooltip>
        </span>
        <div
          className={cs('extra flex ac jc', { hidden: !editable })}
          onClick={handleStopPropagation}
        >
          {enableChecked ? (
            <Checkbox
              checked={checked}
              onClick={event => onSelect(event.target?.checked)}
            />
          ) : (
            <Popover
              trigger="click"
              content={extra}
              placement="rightBottom"
              overlayClassName="menu__more__tooltip"
            >
              <div className="extra__more">
                <EllipsisOutlined />
              </div>
            </Popover>
          )}
        </div>
      </div>
      <div className="feature-card__content flex ac jsb">
        <div className="info flex column as jsb">
          <div className="info__content flex column jsb">
            <Tooltip title={record.signDescription}>
              <div className="title">{record.signDescription}</div>
            </Tooltip>
            <div className="tips flex ac js">
              {
                record.sourceArea && (
                  <div className="item">地区：{record.sourceArea}</div>
                )
              }
              {
                record.sourceArea && (
                  <div className="item">部门：{record.sourceDepart}</div>
                )
              }
            </div>
          </div>
          <div className="info__footer flex ac jsb">
            {record.signTag && record.signTag.split(',').map(tag => <Tag key={tag} color="rgba(57, 147, 243, 0.69)">{tag}</Tag>)}
          </div>
        </div>
        <div className="picture flex ac jc">
          {
            record.thumbnail && (
              <img src={record.thumbnail} alt="缩略图" />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default FeatureCard
