import React, { useMemo } from 'react'
import { Modal } from 'antd'
import { SchemaForm, createAsyncFormActions } from '@formily/antd'
import http from '@/api'
import SingleSelect from '../SingleSelect'
import { getSchema } from './config'

const CreateModal = props => {
  const { params, onCancel, onOk } = props
  const {
    title,
    type,
    record: {
      appName,
      tags,
      categoryId,
      config: { introduce },
    },
  } = params
  const actions = useMemo(() => createAsyncFormActions(), [])
  const initialValue = useMemo(() => {
    return {
      appName,
      tags,
      categoryId,
      introduce,
      type: 13,
    }
  }, [])
  const handleSubmit = values => {
    const { id = '', appSecret = '', appId = '', ...rest } = { ...params.record, ...values }
    let sendData = {
      ...rest,
    }
    if (type === 'edit') {
      sendData = {
        ...params.record,
        ...values,
      }
    }
    sendData.config.introduce = values.introduce
    return http.post('templateRoom/useTemplate', sendData).then(res => {
      if (res.success) {
        onOk({
          id: res.data,
          categoryId: values.categoryId,
        })
      }
    })
  }
  return (
    <Modal visible centered title={title} onCancel={onCancel} onOk={() => actions.submit()}>
      <SchemaForm
        labelCol={4}
        wrapperCol={18}
        actions={actions}
        onSubmit={handleSubmit}
        initialValues={initialValue}
        components={{
          SingleSelect,
        }}
        schema={{
          type: 'object',
          properties: getSchema(),
        }}
      />
    </Modal>
  )
}

export default CreateModal
