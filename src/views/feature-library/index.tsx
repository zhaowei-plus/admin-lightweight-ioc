import React, { useEffect, useMemo, useState } from 'react'
import { Route, useParams } from 'react-router-dom'
import http from '@/api'
import { Layout } from '@/components'
import List from './list'
import Detail from './detail'

const { Sider } = Layout

interface IMenu {
  id: number
  name?: string
  count?: number
}

const FeatureLibrary = (props) => {
  const { history, match: { path, url } } = props

  const { id } = useParams()
  const [categories, setCategories] = useState<Array<IMenu>>([])

  const fetchCategories = () => {
    return http.get('featureConfig/category', { type: 2/* 体征指标分类 */ }).then((res: any) => {
      setCategories(res.data)
    })
  }

  const handleSelect = (menu) => {
    history.push(path.replace(':id', menu.id))
  }

  useEffect(() => {
    if (!id && categories.length > 0) {
      handleSelect(categories[0])
    }
  }, [categories, id])

  useEffect(() => {
    fetchCategories()
  }, [])

  const total = useMemo(() => {
    return categories.reduce((total, item) => {
      return total + item.count
    }, 0)
  }, [categories])
  return (
    <Layout>
      <Sider title="体征库">
        <Sider.Menus
          title="全部"
          extra={total}
        >
          {
            categories.map(category => (
              <Sider.Menus.Item
                key={category.id}
                title={category.name}
                active={Number(id) === category.id}
                onClick={() => handleSelect(category)}
              />
            ))
          }
        </Sider.Menus>
      </Sider>
      <Route
        exact
        path={path}
        component={List}
      />
      <Route
        exact
        path={`${url}/detail/:id`}
        component={Detail}
      />
    </Layout>
  )
}

export default FeatureLibrary
