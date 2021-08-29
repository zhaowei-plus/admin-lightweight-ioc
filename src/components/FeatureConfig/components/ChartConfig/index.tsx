import React, { useState, useEffect } from 'react'
import { SchemaMarkupField as Field } from '@formily/antd'
import { FormBlock } from '@formily/antd-components'
import http from '@/api'
import { formatFormSchema } from '@/utils'
import { CHART_TYPES } from '@/assets/constant'

const ChartConfig = () => {
  const [cards, setCards] = useState([])

  const fetchCards = () => {
    return http.get('featureConfig/cardList', { modelType: 11 }).then(res => {
      setCards(res.data.list.map(item => ({ label: item.appName, value: item.id })))
    })
  }
  const schema = formatFormSchema({
    chartType: {
      type: 'string',
      title: '图表类型',
      enum: CHART_TYPES,
      'x-props': {
        mode: 'multiple',
        style: {
          width: 300,
        },
      },
    },
    cardId: {
      required: true,
      type: 'string',
      title: '图表样式',
      enum: cards,
      'x-props': {
        style: {
          width: 300,
        },
      },
    },
  })

  useEffect(() => {
    fetchCards()
  }, [])

  return (
    <FormBlock
      name="chartConfig"
      className="chart-config"
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
    </FormBlock>
  )
}

export default ChartConfig
