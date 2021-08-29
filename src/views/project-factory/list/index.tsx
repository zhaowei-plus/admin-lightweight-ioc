import React, { useEffect } from 'react'
import { Modal, message } from 'antd'
import http from '@/api'
import { useList, useVisible } from '@/hooks'
import { Layout, CardTable, Frame } from '@/components'
import PHONE from '@/assets/images/PHONE.png'
import PC from '@/assets/images/PC.png'
import TV from '@/assets/images/TV.png'
import CreateModal from '../components/CreateModal'
import FactoryCard from './components/FactoryCard'
import './index.less'

const { Content } = Layout

const List = props => {
  const { history, match: { params: { id } } } = props
  const editorFrame = useVisible()
  const createModal = useVisible()
  const list = useList('projectFactory/list', { categoryId: id }, { modelType: 13 })

  const handleHeaderClick = () => { }

  const handlePreview = e => {
    e.stopPropagation()
  }

  const handleEdit = (record) => {
    createModal.open({
      title: '编辑',
      type: 'edit',
      record,
    })
  }

  const handleDelete = ({ id }) => {
    Modal.confirm({
      centered: true,
      title: '确认删除吗？',
      content: '删除后，数据不可恢复，确认删除？',
      onOk: () => {
        http.post('projectFactory/delete', { id }).then(() => {
          message.success('删除成功')
          list.onRefresh()
        })
      },
    })
  }
  const handleOk = ({ id, categoryId }) => {
    createModal.close()
    history.push(`/cp-manage/project-factory/${categoryId}/edit/${id}`)
  }
  const headerData = [
    { icon: TV, text: '创建TV端', type: 'TV' },
    { icon: PC, text: '创建PC端', type: 'PC' },
    { icon: PHONE, text: '创建APP端', type: 'APP' },
  ]

  const HeaderOperate = () => {
    return (
      <ul className="flex factory-header">
        {headerData.map(item => {
          return (
            <li
              key={item.text}
              className="factory-header__item"
              onClick={() => {
                handleHeaderClick()
              }}
            >
              <img alt='' src={item.icon} />
              <span>{item.text}</span>
            </li>
          )
        })}
      </ul>
    )
  }

  useEffect(() => {
    if (id) {
      list.onSearch({ categoryId: id })
    }
  }, [id])
  const frameUrl = `${window?.top.location.origin}/compose-admin/#/ioc`
  return (
    <>
      <Content title="全部项目" extra={HeaderOperate()} loading={list.loading}>
        <CardTable
          {...list.table}
          renderRecord={record => (
            <FactoryCard
              // onSelect={() => handleEdit(record)}
              handlePreview={handlePreview}
              handleEdit={() => handleEdit(record)}
              handleDelete={() => handleDelete(record)}
              key={record.id}
              record={record}
            />
          )}
        />
      </Content>
      {createModal.visible && (
        <CreateModal params={createModal.params} onCancel={createModal.close} onOk={handleOk} />
      )}
      {editorFrame.visible && <Frame src={frameUrl} title="轻量化IOC" />}
    </>
  )
}

export default List
