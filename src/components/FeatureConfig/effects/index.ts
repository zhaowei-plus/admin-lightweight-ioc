import { createFormActions, FormEffectHooks } from '@formily/antd'
import http from '@/api'

const {
  onFormInit$,
  onFieldInputChange$,
  onFieldValueChange$,
} = FormEffectHooks

export default () => {
  const { setFieldState } = createFormActions()

  onFormInit$().subscribe(() => {
    // 初始化请求数据
    http.get('featureConfig/save/fieldDataSource').then(res => {
      setFieldState('sourceMean.dataSourceTable', state => {
        state.props.enum = res.data
      })
    })

    http.get('featureConfig/cardList', { modelType: 11 }).then(res => {
      const dataSource = res.data.list.map(item => ({ label: item.appName, value: item.id }))
      setFieldState('baseInfo.cardId', state => {
        state.props.enum = dataSource
      })
    })
  })

  // 数据类型发生修改
  onFieldInputChange$('sourceMean.dataSource').subscribe(({ value }) => {
    if (value) {
      return http.get('featureConfig/save/fieldDataSource').then(res => {
        setFieldState('sourceMean.dataSourceTable', state => {
          state.props.enum = res.data
        })
      })
    }
  })

  // 字段来源表发生修改
  onFieldValueChange$('sourceMean.dataSourceTable').subscribe(({ value, props }) => {
    const dataSource = props.enum.find(item => item.value === value) || {}
    setFieldState('sourceMean.outerParams', state => {
      state.value = dataSource.children || []
    })
    return http.get('featureConfig/cardList', { modelType: 11, cardName: dataSource.label }).then(res => {
      const dataSource = res.data.list.map(item => ({ label: item.appName, value: item.appId }))
      setFieldState('chartConfig.cardId', state => {
        state.props.enum = dataSource
      })
    })
  })
}
