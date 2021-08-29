import React, { useEffect, useState } from 'react'
import { Select } from 'antd'
import { PreviewText } from '@formily/react-shared-components'
import http from '@/api'
import { useVisible } from '@/hooks'
import { eventBus } from '@/common'
import AddCategoryModel from '@/views/feature-config/components/AddCategoryModel'

interface IOption {
  label: string
  value: number
}

const FeatureCategory = (props) => {
  const { value, editable, mutators } = props
  const addCategoryModal = useVisible()
  const [options, setOptions] = useState<Array<IOption>>([])

  const fetchOptions = () => {
    return http.get('featureConfig/category', { type: 2/* 体征指标分类 */ }).then((res: any) => {
      setOptions(res.data.map(item => ({
        label: item.name,
        value: item.id,
      })))
      return res.data
    })
  }

  const handleAdd = ()=> {
    addCategoryModal.open({
      title: '新增体征分组',
    })
  }

  const handleChange = value => {
    mutators.change(value)
  }

  const handleOk = () => {
    addCategoryModal.close()
    fetchOptions().then(dataSource => {
      eventBus.emit('reloadFeatureCategories', dataSource)
    })
  }

  useEffect(() => {
    fetchOptions()
  }, [])

  if (!editable) {
    return options.find(item => item.value === value)?.label || <PreviewText />
  }

  return (
    <div className="feature-category flex ac jsb" style={{ width: '100%' }}>
      <Select
        value={value}
        options={options}
        onChange={handleChange}
        style={{ flex: 1, marginRight: 8 }}
      />
      <a onClick={handleAdd}>+新建</a>
      {
        addCategoryModal.visible && (
          <AddCategoryModel
            params={addCategoryModal.params}
            onCancel={addCategoryModal.close}
            onOk={handleOk}
          />
        )
      }
    </div>
  )
}

FeatureCategory.isFieldComponent = true

export default FeatureCategory
