import React, { useEffect, useState } from 'react'
import http from '@/api'
import { Route, useParams } from 'react-router-dom'
import { Layout } from '@/components'
import List from './list'

const { Sider } = Layout

interface IMenu {
  platform: number;
  typeName?: string;
  count?: number;
}

const SampleRoom = props => {
  const {
    history,
    match: { path },
  } = props

  const { id } = useParams()
  const [menus, setMenus] = useState<Array<IMenu>>([])

  const fetchMenus = () => {
    return http.get('templateRoom/moduleList').then((res: any) => {
      setMenus(res.data)
    })
  }
  const handleSelect = menu => {
    history.push(path.replace(':id', menu.platform))
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
      <Sider title="样板间">
        <Sider.Menus title="分组">
          {menus.map(menu => (
            <Sider.Menus.Item
              key={menu.platform}
              title={menu.typeName}
              active={Number(id) === menu.platform}
              onClick={() => handleSelect(menu)}
              extra={<span>{menu.count}</span>}
            />
          ))}
        </Sider.Menus>
      </Sider>
      <Route exact path={path} component={List} />
    </Layout>
  )
}

export default SampleRoom
