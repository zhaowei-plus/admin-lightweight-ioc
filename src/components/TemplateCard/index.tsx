import React from 'react'
import { Button, Popover } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import './index.less'

const TemplateCard = (props: any) => {
  const {
    cardType = 'config',
    publish,
    onSelect,
    handleUse,
    // handlePreview,
    // handleDelete,
    handleStatus,
    record,
  } = props
  const { appName, iconUrl } = record

  const content = (
    <div onClick={e => e.stopPropagation()}>
      {/* <p onClick={handlePreview}>预览</p>
      <p onClick={handleDelete}>删除</p> */}
      <p onClick={handleStatus}>{publish === 0 ? '下线' : '上线'}</p>
    </div>
  )

  return (
    <div onClick={onSelect} className="template-card">
      <div className="template-card__content">
        <div className="picture">
          <img className="picture__img" src={iconUrl} alt="" />
        </div>
        <div className="info__footer flex">
          <div className="info__footer__title" title={appName}>
            {appName}
          </div>
          <p className="info__footer__operate" onClick={event => event.stopPropagation()}>
            {cardType === 'config' ? (
              <>
                {/* <Button
                  type="primary"
                  size="middle"
                  style={{ marginRight: '10px' }}
                  onClick={handlePreview}
                >
                  编辑
                </Button> */}
                <span style={{ cursor: 'pointer' }}>
                  <Popover
                    content={content}
                    placement="rightTop"
                    trigger="hover"
                    overlayClassName="menu__more__tooltip"
                  >
                    <MoreOutlined />
                  </Popover>
                </span>
              </>
            ) : (
              <>
                {/* <Button
                  type="default"
                  size="middle"
                  style={{ marginRight: '10px' }}
                  onClick={handlePreview}
                >
                  预览
                </Button> */}
                <Button
                  type="primary"
                  size="middle"
                  onClick={() => {
                    handleUse(record)
                  }}
                >
                  使用
                </Button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default TemplateCard
