import React, { useEffect, useState } from 'react'
import { Route, useParams } from 'react-router-dom'
// import { PlusOutlined } from '@ant-design/icons'
import { Layout } from '@/components'
import http from '@/api'
import { useVisible } from '@/hooks'
import AddModal from '@/views/project-factory/components/AddModal'
import List from './list'

const { Sider } = Layout

interface IMenu {
  platform: number;
  typeName?: string;
  count?: number;
}

const TemplateConfig = props => {
  const {
    history,
    match: { path },
  } = props
  const { id } = useParams()
  const [menus, setMenus] = useState<Array<IMenu>>([])
  const addModal = useVisible()
  const fetchMenus = () => {
    return http.get('templateConfig/moduleList').then((res: any) => {
      setMenus(res.data)
    })
  }
  const handleSelect = menu => {
    history.push(path.replace(':id', menu.platform))
  }
  // const handleAdd = () => {
  //   addModal.open({
  //     title: '新建',
  //   })
  // }
  const handleOk = value => {
    http.post('projectFactory/addCategory', { type: 3, status: 0, ...value }).then(() => {
      addModal.close()
      fetchMenus()
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
      <Sider title="样板设置">
        <Sider.Menus
          title="分组"
        // extra={<PlusOutlined onClick={handleAdd} />}
        >
          {menus.map(menu => (
            <Sider.Menus.Item
              key={menu.platform}
              title={menu.typeName}
              active={Number(id) === menu.platform}
              onClick={() => handleSelect(menu)}
              extra={<div className="menu__extra">{menu.count}</div>}
            />
          ))}
        </Sider.Menus>
      </Sider>
      {addModal.visible && (
        <AddModal params={addModal.params} onCancel={addModal.close} onOk={handleOk} />
      )}
      <Route exact path={path} component={List} />
    </Layout>
  )
}

export default TemplateConfig
