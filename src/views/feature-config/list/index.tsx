import React, { useEffect, useMemo, useState } from 'react'
import { Button, Checkbox, Space, Radio, Modal, message } from 'antd'
import dayjs from 'dayjs'
import http from '@/api'
import { useList } from '@/hooks'
import { PUBLISH_TYPES } from '@/assets/constant'
import { Layout, Search, Actions, CardTable, FeatureCard } from '@/components'
import { getSchema } from './config'

const { Content } = Layout

const List = (props) => {
  const { history, match: { url, params: { id } } } = props
  const [publishType, setPublishType] = useState(PUBLISH_TYPES[0].value)
  const [selectedRows, setSelectedRows] = useState([])
  const [batchOperation, setBatchOperation] = useState(false)
  const { loading, table, onSearch, onRefresh } = useList('featureConfig/list/list', { publishType, classificationId: id })

  const handleAdd = () => {
    history.push(`${url}/add`)
  }

  const handleEdit = ({ id }) => {
    history.push(`${url}/edit/${id}`)
  }

  const handleSearch = (params) => {
    const { startTime, endTime, ...rest } = params
    if (startTime && endTime) {
      rest.startTime = dayjs(startTime).startOf('day').format('YYYY-MM-DD HH:mm:ss')
      rest.endTime = dayjs(endTime).startOf('day').format('YYYY-MM-DD HH:mm:ss')
    }
    onSearch({
      ...rest,
      classificationId: id,
      publishType,
    })
  }

  const handleDelete = (ids = []) => {
    Modal.confirm({
      centered: true,
      title: '提示',
      content: '确认要删除吗？',
      onOk: () => http.post('featureConfig/list/delete', { ids }).then(() => {
        message.success('删除成功')
        setSelectedRows([])
        onRefresh()
      }),
    })
  }

  const handleUpdateState = (ids = [], publishType, title) => {
    return http.post('featureConfig/list/state', { ids, publishType }).then(() => {
      message.success(`${title}成功`)
      setSelectedRows([])
      onRefresh()
    })
  }

  const handleSelect = (record, checked) => {
    if (checked) {
      setSelectedRows(selectedRows.concat([record]))
    } else {
      setSelectedRows(selectedRows.filter(item => item.id !== record.id))
    }
  }

  const handleBatchDelete = () => {
    if (selectedRows.length > 0) {
      handleDelete(selectedRows.map(item => item.id))
    }
  }

  const handleBatchSetStatus = (sourceStatus, publishType, title) => {
    handleUpdateState(
      selectedRows.filter(item => item.signStatus === Number(sourceStatus)).map(item => item.id),
      publishType,
      title,
    )
  }

  const handleBatchOperation = (event) => {
    setBatchOperation(event.target.checked)
    setSelectedRows([])
  }

  const handleSelectAll = () => {
    if (selectedRows.length !== table.dataSource.length) {
      setSelectedRows(table.dataSource)
    } else {
      setSelectedRows([])
    }
  }

  const handleChangePublishType = (event) => {
    setSelectedRows([])
    setPublishType(event.target.value)
    onSearch({
      classificationId: id,
      publishType: event.target.value,
    })
  }

  useEffect(() => {
    if (id) {
      onSearch({
        publishType,
        classificationId: id,
      })
    }
  }, [id])

  const enableCheckedAll = batchOperation && table.dataSource.length > 0
  const enableBatchDelete = batchOperation && selectedRows.length > 0
  const { enableBatchPublish, enableBatchRetract } = useMemo(() => {
    const enableBatchOperation = selectedRows.length > 0
    const enableBatchPublish = enableBatchOperation ? selectedRows.every(item => item.signStatus === 0) : false
    const enableBatchRetract = enableBatchOperation ? selectedRows.some(item => item.signStatus === 1) : false
    return {
      enableBatchOperation,
      enableBatchPublish,
      enableBatchRetract,
    }
  }, [selectedRows])
  const schema = getSchema()
  return (
    <Content
      title="全部体征"
      extra={(
        <Button
          type="primary"
          onClick={handleAdd}
        >
          新增体征
        </Button>
      )}
      loading={loading}
    >
      <Radio.Group
        optionType="button"
        buttonStyle="solid"
        value={publishType}
        options={PUBLISH_TYPES}
        className="xm-radio-buttons"
        onChange={handleChangePublishType}
      />
      <Search
        schema={schema}
        onSearch={handleSearch}
      />
      <Actions>
        <Checkbox
          checked={batchOperation}
          onClick={handleBatchOperation}
        >
          批量选择:
        </Checkbox>
        <Button
          type="link"
          size="small"
          onClick={handleSelectAll}
          disabled={!enableCheckedAll}
        >
          全选
        </Button>
        <Button
          type="link"
          size="small"
          onClick={handleBatchDelete}
          disabled={!enableBatchDelete}
        >
          删除
        </Button>
        {
          enableBatchPublish && (
            <Button
              type="link"
              size="small"
              onClick={() => handleBatchSetStatus(0, 1, '发布')}
            >
              发布
            </Button>
          )
        }
        {
          enableBatchRetract && (
            <Button
              type="link"
              size="small"
              onClick={() => handleBatchSetStatus(1, 0, '撤回')}
            >
              撤回
            </Button>
          )
        }
      </Actions>
      <CardTable
        {...table}
        renderRecord={record => (
          <FeatureCard
            key={record.id}
            record={record}
            enableChecked={batchOperation}
            onClick={() => handleEdit(record)}
            onSelect={(checked) => handleSelect(record, checked)}
            checked={selectedRows.findIndex(item => item.id === record.id) > -1}
            extra={(
              <Space direction="vertical">
                <a onClick={() => handleDelete([record.id])}>删除</a>
                {
                  record.signStatus === 0 && (
                    <a onClick={() => handleUpdateState([record.id], 1, '发布')}>
                      发布
                    </a>
                  )
                }
              </Space>
            )}
          />
        )}
      />
    </Content>
  )
}

export default List
