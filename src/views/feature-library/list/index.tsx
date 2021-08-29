import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import { Layout, Search, CardTable, FeatureCard } from '@/components'
import { useList } from '@/hooks'
import { getSchema } from './config'

const { Content } = Layout

const List = (props) => {
  const publishType = 1 // 线上
  const { history, match: { url, params: { id } } } = props
  const list = useList('featureConfig/list/list', { publishType, classificationId: id })

  const handleDetail = ({ id }) => {
    history.push(`${url}/detail/${id}`)
  }

  const handleSearch = (params) => {
    const { startTime, endTime, ...rest } = params
    if (startTime && endTime) {
      rest.startTime = dayjs(startTime).startOf('day').format('YYYY-MM-DD HH:mm:ss')
      rest.endTime = dayjs(endTime).startOf('day').format('YYYY-MM-DD HH:mm:ss')
    }
    list.onSearch({
      ...rest,
      classificationId: id,
      publishType,
    })
  }

  useEffect(() => {
    if (id) {
      list.onSearch({
        publishType,
        classificationId: id,
      })
    }
  }, [id])

  const schema = getSchema()
  return (
    <Content
      title="全部体征"
      loading={list.loading}
    >
      <Search
        schema={schema}
        onSearch={handleSearch}
        defaultValue={{ publishType: 1 }}
      />
      <CardTable
        {...list.table}
        renderRecord={record => (
          <FeatureCard
            key={record.id}
            record={record}
            editable={false}
            onClick={() => handleDetail(record)}
          />
        )}
      />
    </Content>
  )
}

export default List
