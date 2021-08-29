import React, { useMemo } from 'react'
import { SchemaMarkupField as Field } from '@formily/antd'
import { FormBlock, FormMegaLayout } from '@formily/antd-components'
import { formatFormSchema } from '@/utils'

// 接口地址：http://10.0.17.202:3000/project/108/interface/api/5287
const BaseInfo = () => {
  const [schemaLeft, schemaRight] = useMemo(() => [
    formatFormSchema({
      signName: {
        required: true,
        type: 'string',
        title: '指标名称',
      },
      signDescription: {
        required: true,
        type: 'textarea',
        title: '指标说明',
      },
      planningRules: {
        type: 'textarea',
        title: '计算规则',
      },
      signTag: {
        type: 'string',
        title: '体征标签',
      },
      classificationId: {
        type: 'string',
        title: '指标类别',
        'x-component': 'FeatureCategory',
      },
      sourceBasis: {
        type: 'textarea',
        title: '来源依据',
      },
      sourceDepart: {
        type: 'string',
        title: '数据来源部门',
      },
      dataSourceSys: {
        type: 'string',
        title: '数据来源系统',
      },
      obtainingMethod: {
        type: 'string',
        title: '常规获取方式',
      },
      sourceArea: {
        type: 'string',
        title: '数据来源地区',
        description: '格式：省/市/区',
      },
    }),
    formatFormSchema({
      thumbnail: {
        type: 'image-upload',
        title: '缩略图',
        'x-props': {
          action: '/sfs/webUpload/file?fileType=1',
        },
      },
      updateFrequency: {
        type: 'number',
        title: '数据常规更新频率',
        'x-props': {
          step: 1,
        },
      },
      unit: {
        type: 'string',
        title: '单位',
      },
      threshold: {
        type: 'string',
        title: '阈值',
      },
      securityLevel: {
        type: 'string',
        title: '安全等级',
      },
    }),
  ], [])
  return (
    <FormBlock
      name="baseInfo"
      className="base-info"
    >
      <FormMegaLayout
        grid
        full
        autoRow
        columns={2}
      >
        <FormMegaLayout columns={1}>
          {
            Object.keys(schemaLeft).map(name => (
              <Field
                key={name}
                name={name}
                {...schemaLeft[name]}
              />
            ))
          }
        </FormMegaLayout>
        <FormMegaLayout columns={1}>
          {
            Object.keys(schemaRight).map(name => (
              <Field
                key={name}
                name={name}
                {...schemaRight[name]}
              />
            ))
          }
        </FormMegaLayout>
      </FormMegaLayout>
    </FormBlock>
  )
}

export default BaseInfo
