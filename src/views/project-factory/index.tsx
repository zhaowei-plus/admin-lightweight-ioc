import React, { useEffect, useState } from 'react'
import { Space, Popover, Modal, message } from 'antd'
import { PlusOutlined, MoreOutlined } from '@ant-design/icons'
import { Route } from 'react-router-dom'
import http from '@/api'
import { useVisible } from '@/hooks'
import { Layout } from '@/components'
import List from './list'
import Edit from './edit'
import AddModal from './components/AddModal'

const { Sider } = Layout

interface IMenu {
  id: number;
  name?: string;
  count?: number;
}

const ProjectFactory = props => {
  const { history, match: { path, url, params: { id } } } = props
  const [menus, setMenus] = useState<Array<IMenu>>([])
  const addModal = useVisible()

  const fetchMenus = () => {
    return http.get('projectFactory/moduleList', { type: 3 }).then((res: any) => {
      setMenus(res.data)
      return res.data
    })
  }
  const handleSelect = menu => {
    history.push(path.replace(':id', menu.id))
  }
  const handleAdd = () => {
    addModal.open({
      title: '新建',
    })
  }
  const handleOk = value => {
    http.post('projectFactory/addCategory', { type: 3, status: 0, ...value }).then(() => {
      addModal.close()
      fetchMenus()
    })
  }
  const handleDelete = (event, menu) => {
    event.stopPropagation()
    Modal.confirm({
      centered: true,
      title: '确认删除吗？',
      content: '删除后，数据不可恢复，确认删除？',
      onOk: () => {
        http.post('projectFactory/moduleDelete', { id: menu.id }).then(() => {
          message.success('删除成功')
          fetchMenus().then(menus => {
            if (menus.length > 1) {
              handleSelect(menus[0])
            }
          })
        })
      },
    })
  }

  useEffect(() => {
    if (!id && menus.length > 0) {
      handleSelect(menus[0])
    }
  }, [menus, id])

  useEffect(() => {
    fetchMenus()
  }, [])

  return (
    <Layout>
      <Sider title="项目工厂">
        <Sider.Menus
          title="分组"
          extra={<PlusOutlined onClick={handleAdd} />}
        >
          {menus.map(menu => (
            <Sider.Menus.Item
              key={menu.id}
              title={menu.name}
              active={Number(id) === menu.id}
              onClick={() => handleSelect(menu)}
              extra={<Space>
                <span>{menu.count}</span>
                <Popover content={(
                  <Space direction="vertical">
                    <a onClick={(event) => handleDelete(event, menu)}>
                      删除
                    </a>
                  </Space>
                )}>
                  <MoreOutlined />
                </Popover>
              </Space>} />

          ))}
        </Sider.Menus>
      </Sider>
      {
        addModal.visible && (
          <AddModal params={addModal.params} onCancel={addModal.close} onOk={handleOk} />
        )
      }
      <Route exact path={path} component={List} />
      <Route exact path={`${url}/edit/:id`} component={Edit} />
    </Layout >
  )
}

export default ProjectFactory
