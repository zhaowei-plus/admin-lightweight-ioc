import React from 'react'
import { SchemaMarkupField as Field } from '@formily/antd'
import { FormBlock } from '@formily/antd-components'
import { formatFormSchema } from '@/utils'
import './index.less'

const SourceMean = () => {
  const schema = formatFormSchema({
    dataSource: {
      required: true,
      type: 'string',
      title: '数据类型',
      enum: [
        { label: '数据魔方', value: 1 },
        // { label: '华为Roma', value: 2 },
      ],
      'x-props': {
        style: {
          width: 300,
        },
      },
    },
    dataSourceTable: {
      required: true,
      type: 'string',
      title: '字段来源表',
      enum: [],
      'x-props': {
        style: {
          width: 300,
        },
      },
    },
  })

  return (
    <FormBlock
      name="sourceMean"
      className="source-mean"
    >
      {
        Object.keys(schema).map(name => (
          <Field
            key={name}
            name={name}
            {...schema[name]}
          />
        ))
      }
      <Field
        title="用户列表"
        name="outerParams"
        type="array"
        editable={false}
        x-component="ArrayTable"
      >
        <Field type="object">
          <Field
            type='string'
            title="指标细项"
            name="label"
            editable={false}
          />
          <Field
            type='string'
            name="value"
            title="对应数据来源"
            editable={false}
          />
        </Field>
      </Field>
    </FormBlock>
  )
}

export default SourceMean
