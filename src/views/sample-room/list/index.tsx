import React, { useEffect } from 'react'
import { Layout, Search, CardTable } from '@/components'
import { useList, useVisible } from '@/hooks'
import dayjs from 'dayjs'
import TemplateCard from '@/components/TemplateCard'
import CreateModal from '@/views/project-factory/components/CreateModal'
import { getSchema } from './config'

const { Content } = Layout

const List = props => {
  const {
    history,
    match: {
      params: { id },
    },
  } = props
  const createModal = useVisible()
  const staticParam = {
    platformFlag: id,
    status: 0,
    modelType: 12,
  }
  const list = useList('templateRoom/list', { ...staticParam })
  const handleSearch = params => {
    const { startTime, endTime, ...rest } = params
    if (startTime && endTime) {
      rest.startTime = dayjs(startTime).startOf('day').format('YYYY-MM-DD HH:mm:ss')
      rest.endTime = dayjs(endTime).startOf('day').format('YYYY-MM-DD HH:mm:ss')
    }
    list.onSearch({
      ...rest,
      ...staticParam,
    })
  }
  const handleClick = () => { }
  const handleUse = record => {
    createModal.open({
      type: 'create',
      title: '创建',
      record,
    })
  }

  const handleOk = ({ id, categoryId }) => {
    createModal.close()
    history.push(`/cp-manage/project-factory/${categoryId}/edit/${id}`)
  }

  useEffect(() => {
    if (id) {
      list.onRefresh({
        ...staticParam,
      })
    }
  }, [id])
  const schema = getSchema()
  return (
    <Content title="大屏端" loading={list.loading}>
      <Search schema={schema} onSearch={handleSearch} />
      <CardTable
        {...list.table}
        renderRecord={record => (
          <TemplateCard
            cardType="room"
            handleUse={() => handleUse(record)}
            onSelect={() => handleClick()}
            key={record.id}
            record={record}
          />
        )}
      />
      {createModal.visible && (
        <CreateModal
          params={createModal.params}
          onCancel={createModal.close}
          onOk={handleOk}
        />
      )}
    </Content>
  )
}

export default List
