import { CHART_TYPES } from '@/utils/constant'

export const getSchema = () => ({
  cardName: {
    type: 'string',
    title: '样板间名称',
  },
  tag: {
    type: 'string',
    title: '样板间标签',
  },
  chartType: {
    type: 'string',
    title: '图表类型',
    enum: CHART_TYPES,
  },
  // sourceArea: {
  //   type: 'string',
  //   title: '来源地区',
  // },
  // sourceDept: {
  //   type: 'string',
  //   title: '来源部门',
  // },
  // '[startTime,endTime]': {
  //   type: 'daterange',
  //   title: '上线时间',
  // },
})
