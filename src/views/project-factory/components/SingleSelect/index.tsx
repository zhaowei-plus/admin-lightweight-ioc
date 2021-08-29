import React, { useState, useEffect } from 'react'
import { Select, Row, Col } from 'antd'
import { useVisible } from '@/hooks'
import http from '@/api'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import AddModal from '@/views/project-factory/components/AddModal'

const SingleSelect = props => {
  const { value = [], onChange } = props
  const [options, setOptions] = useState([])
  const addModal = useVisible()
  const fetchData = () => {
    http.get('projectFactory/moduleList', { type: 3 }).then(res => {
      setOptions(() => {
        return res.data.map(item => ({
          label: item.name,
          value: item.id,
        }))
      })
    })
  }
  const handleChange = selectedItems => {
    onChange(selectedItems)
  }
  const handleClick = () => {
    addModal.open({
      title: '新建',
    })
  }
  const handleOk = value => {
    http.post('projectFactory/addCategory', { type: 3, status: 0, ...value }).then(() => {
      addModal.close()
      fetchData()
    })
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <Row>
      <Col flex="auto">
        <Select
          // mode="multiple"
          defaultValue={value}
          onChange={handleChange}
          style={{ width: '100%' }}
          clearIcon={<MinusCircleOutlined />}
          options={options}
        />
      </Col>
      <Col
        flex="70px"
        onClick={handleClick}
        style={{
          textAlign: 'right',
          lineHeight: '32px',
          color: 'rgba(57, 147, 243, 1)',
          cursor: 'pointer',
        }}
      >
        <PlusOutlined />
        新建
      </Col>
      {addModal.visible && (
        <AddModal params={addModal.params} onOk={handleOk} onCancel={addModal.close} />
      )}
    </Row>
  )
}
export default SingleSelect
