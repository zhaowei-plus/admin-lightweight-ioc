import React, { useEffect, useState } from 'react'
import { Space, Popover, Modal, message } from 'antd'
import { Route } from 'react-router-dom'
import { MoreOutlined, PlusOutlined } from '@ant-design/icons'
import http from '@/api'
import { useVisible } from '@/hooks'
import { eventBus } from '@/common'
import { Layout } from '@/components'
import Add from './add'
import List from './list'
import Edit from './edit'
import AddCategoryModel from './components/AddCategoryModel'

const { Sider } = Layout

interface IMenu {
  id: number
  name?: string
  count?: number
}

const FeatureConfig = (props) => {
  const { history, match: { path, url, params: { id } } } = props
  const addCategoryModel = useVisible()
  const [categories, setCategories] = useState<Array<IMenu>>([])

  const fetchCategories = () => {
    return http.get('featureConfig/category', { type: 2/* 体征指标分类 */ }).then((res: any) => {
      setCategories(res.data)
      return res.data
    })
  }

  const handleSelect = (menu) => {
    history.push(path.replace(':id', menu.id))
  }

  const handleAdd = () => {
    addCategoryModel.open({
      title: '新增体征分组',
    })
  }

  const handleAction = (event, type, record) => {
    event.stopPropagation()
    if (type === 'edit') {
      addCategoryModel.open({
        title: '编辑体征分组',
        record,
      })
    }

    if (type === 'delete') {
      Modal.confirm({
        centered: true,
        title: '提示',
        content: '确定要删除吗？',
        onOk: () => http.post('featureConfig/categoryDelete', record).then(() => {
          message.success('删除成功')
          fetchCategories().then(categories => {
            if (categories.length > 0) {
              handleSelect(categories[0])
            }
          })
        }),
      })
    }
  }

  useEffect(() => {
    if (!id && categories.length > 0) {
      handleSelect(categories[0])
    }
  }, [categories, id])

  useEffect(() => {
    fetchCategories()
    const listener = eventBus.on('reloadFeatureCategories', () => {
      fetchCategories()
    })
    return () => {
      eventBus.off('reloadFeatureCategories', listener)
    }
  }, [])

  return (
    <Layout wrapperClassName="feature-config">
      <Sider title="体征设置">
        <Sider.Menus
          title="分组"
          extra={(
            <a onClick={handleAdd}>
              <PlusOutlined />
            </a>
          )}
        >
          {
            categories.map(category => (
              <Sider.Menus.Item
                key={category.id}
                title={category.name}
                active={Number(id) === category.id}
                onClick={() => handleSelect(category)}
                extra={
                  category?.id !== 1 && (
                    <Space>
                      <Popover content={(
                        <Space direction="vertical">
                          <a onClick={(event) => handleAction(event, 'edit', category)}>
                            编辑
                          </a>
                          <a onClick={(event) => handleAction(event, 'delete', category)}>
                            删除
                          </a>
                        </Space>
                      )}>
                        <MoreOutlined />
                      </Popover>
                    </Space>
                  )
                }
              />
            ))
          }
        </Sider.Menus>
        {
          addCategoryModel.visible && (
            <AddCategoryModel
              params={addCategoryModel.params}
              onCancel={addCategoryModel.close}
              onOk={() => {
                addCategoryModel.close()
                fetchCategories()
              }}
            />
          )
        }
      </Sider>
      <Route exact path={path} component={List}/>
      <Route exact path={`${url}/add`} component={Add}/>
      <Route exact path={`${url}/edit/:id`} component={Edit}/>
    </Layout>
  )
}

export default FeatureConfig
