import React, { useMemo } from 'react'
import { Modal } from 'antd'
import { formatFormSchema } from '@/utils'
import { SchemaForm, createAsyncFormActions } from '@formily/antd'

const AddModal = props => {
  const { params, onOk, onCancel } = props
  const { title } = params
  const schema = {
    type: 'object',
    properties: formatFormSchema({
      name: {
        type: 'string',
        title: '分类名称',
        required: true,
      },
    }),
  }
  const actions = useMemo(() => createAsyncFormActions(), [])
  const handleSubmit = value => {
    onOk(value)
  }
  return (
    <Modal
      title={title}
      visible
      onOk={() => {
        actions.submit()
      }}
      onCancel={onCancel}
    >
      <SchemaForm
        onSubmit={handleSubmit}
        actions={actions}
        labelCol={4}
        wrapperCol={18}
        schema={schema}
      />
    </Modal>
  )
}
export default AddModal
