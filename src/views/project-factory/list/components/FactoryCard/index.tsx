import React from 'react'
import { Tag } from 'antd'
import urlMap from '@/api/urlMap'
import { formatTime } from '@/utils'
import './index.less'

const FactoryCard = (props: any) => {
  const {
    onSelect,
    record,
    // handlePreview,
    handleEdit,
    handleDelete,
  } = props
  const { appName, tags, gmtModified, iconUrl, appId } = record

  return (
    <div onClick={onSelect} className="factory-card">
      <div className="factory-card__content">
        <div className="picture">
          <img className="picture__img" src={iconUrl} alt="" />
          <p className="factory-card__operate" onClick={e => e.stopPropagation()}>
            {/* <span onClick={handlePreview}>预览</span> */}
            <span onClick={handleEdit}>编辑</span>
            <span onClick={handleDelete}>删除</span>
            <span>
              <a href={`${urlMap.projectFactory.produce}?appId=${appId}`} download={appName}>
                生成小程序
              </a>
            </span>
          </p>
        </div>
        <div className="factory-card__title" title={appName}>
          {appName}
        </div>
        <div className="info__footer flex">
          <div className="info__footer__tag" title={tags.join(',')}>
            {tags &&
              tags.map(text => {
                return (
                  <Tag key={text} color="rgba(57, 147, 243, 0.69)">
                    {text}
                  </Tag>
                )
              })}
          </div>
          <p className="info__footer__time">
            上次修改：<span>{formatTime(gmtModified)}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default FactoryCard
