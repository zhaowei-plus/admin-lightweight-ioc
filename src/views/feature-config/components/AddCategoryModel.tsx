import React, { useMemo } from 'react'
import { Modal, message } from 'antd'
import { SchemaForm, createAsyncFormActions } from '@formily/antd'
import http from '@/api'
import { formatFormSchema } from '@/utils'

const schema = {
  name: {
    required: true,
    type: 'string',
    title: '名称',
  },
  remark: {
    type: 'textarea',
    title: '备注',
  },
}

const AddCategoryModel = (props) => {
  const { params = {}, onOk, onCancel } = props
  const { title, record } = params

  const actions = useMemo(() => createAsyncFormActions(), [])

  const handleOk = () => {
    return actions.submit().then(({ values }: any) => {
      return http.post('featureConfig/categorySave', {
        ...values,
        status: 0, /* 上架 */
        type: 2, /* 体征指标分类 */
      }).then(() => {
        message.success(`${title}成功`)
        onOk()
      })
    })
  }

  return (
    <Modal
      visible
      centered
      title={title}
      onOk={handleOk}
      onCancel={onCancel}
      maskClosable={false}
    >
      <SchemaForm
        labelCol={6}
        wrapperCol={16}
        schema={{
          type: 'object',
          properties: formatFormSchema(schema),
        }}
        actions={actions}
        initialValues={record}
      />
    </Modal>
  )
}

export default AddCategoryModel

