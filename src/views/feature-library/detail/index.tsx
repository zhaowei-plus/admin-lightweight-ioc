import React from 'react'
import { useParams } from 'react-router-dom'
import { FeatureConfig } from '@/components'

const Detail = () => {
  const { id } = useParams()
  return (
    <FeatureConfig
      id={id}
      isDetail
      title="体征详情"
    />
  )
}

export default Detail
