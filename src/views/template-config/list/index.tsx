import React, { useEffect, useState } from 'react'
import { Radio, Modal } from 'antd'
import { Layout, Search, CardTable } from '@/components'
import { useList } from '@/hooks'
import dayjs from 'dayjs'
import http from '@/api'
import { PUBLISH_TYPES } from '@/utils/constant'
import TemplateCard from '@/components/TemplateCard'
import { getSchema } from './config'

const { Content } = Layout

const List = props => {
  const {
    match: {
      params: { id },
    },
  } = props
  const [publish, setPublish] = useState(PUBLISH_TYPES[0].value)
  const staticParam = {
    platformFlag: id,
    status: publish,
    modelType: 12,
  }
  const list = useList('templateConfig/list', { ...staticParam })
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

  const handleClick = () => {
    // history.push(`${url}/${id}`);
  }
  // const handleAdd = () => {}
  const handlePreview = () => {

  }
  const handleDelete = () => {
    Modal.confirm({
      centered: true,
      title: '确认删除吗？',
      content: '删除后，数据不可恢复，确认删除？',
      onOk: () => { },
    })
  }
  const handleStatus = id => {
    Modal.confirm({
      centered: true,
      title: `确认${publish === 0 ? '下线' : '上线'}吗？`,
      onOk: () => {
        http
          .post('templateConfig/status', { status: publish === 0 ? 1 : 0, cardIds: [id] })
          .then(res => {
            if (res.success) {
              list.onRefresh({ ...staticParam })
            }
          })
      },
    })
  }
  useEffect(() => {
    if (id) {
      list.onRefresh({
        ...staticParam,
      })
    }
  }, [id])
  const handleChangeType = event => {
    setPublish(() => {
      list.onRefresh({
        ...staticParam,
        status: event.target.value,
      })
      return event.target.value
    })
  }
  const schema = getSchema()
  return (
    <Content
      title="大屏端"
      // extra={
      //   <Button type="primary" onClick={handleAdd}>
      //     新增样板
      //   </Button>
      // }
      loading={list.loading}
    >
      <Radio.Group
        options={PUBLISH_TYPES}
        optionType="button"
        buttonStyle="solid"
        defaultValue={publish}
        onChange={handleChangeType}
        className="xm-radio-buttons"
      />
      <Search schema={schema} onSearch={handleSearch} />
      <CardTable
        {...list.table}
        renderRecord={record => (
          <TemplateCard
            cardType="config"
            publish={publish}
            onSelect={() => handleClick()}
            key={record.id}
            record={record}
            handlePreview={() => handlePreview()}
            handleDelete={() => handleDelete()}
            handleStatus={() => handleStatus(record.id)}
          />
        )}
      />
    </Content>
  )
}

export default List
