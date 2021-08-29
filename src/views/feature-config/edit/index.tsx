import React from 'react'
import { useParams } from 'react-router-dom'
import { FeatureConfig } from '@/components'

const Edit = () => {
  const { id } = useParams()
  return (
    <FeatureConfig
      isEdit
      id={id}
      title="编辑体征"
    />
  )
}

export default Edit
