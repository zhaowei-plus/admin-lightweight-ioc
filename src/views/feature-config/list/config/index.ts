// import { CHART_TYPES } from '@/assets/constant'

export const getSchema = () => ({
  signName: {
    type: 'string',
    title: '体征名称',
  },
  signTag: {
    type: 'string',
    title: '体征标签',
  },
  '[startTime,endTime]': {
    type: 'daterange',
    title: '上线时间',
  },
  // chartType: {
  //   type: 'string',
  //   title: '图表类型',
  //   enum: CHART_TYPES,
  // },
  // sourceArea: {
  //   type: 'string',
  //   title: '来源地区',
  // },
  // sourceDepart: {
  //   type: 'string',
  //   title: '来源部门',
  // },
})
