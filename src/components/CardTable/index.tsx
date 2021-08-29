import React from 'react'
import { Pagination, Empty } from 'antd'
import cs from 'classnames'
import './index.less'

const CardTable = (props) => {
  const { dataSource = [], pagination, renderRecord, onChange } = props
  const isEmpty = dataSource.length === 0
  return (
    <div className="card-table flex column as js">
      <div className={cs('card-table__list flex', { 'empty': isEmpty })}>
        {
          isEmpty ? (
            <Empty description="暂无数据" />
          ) : dataSource.map((item, index) => (
            renderRecord(item, item?.id || index)
          ))
        }
      </div>
      <div className="card-table__pagination flex ac je">
        <Pagination
          {...pagination}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default CardTable
