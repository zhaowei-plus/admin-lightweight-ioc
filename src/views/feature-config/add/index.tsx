import React, { useMemo } from 'react'
import { FeatureConfig } from '@/components'

const Add = (props) => {
  const { location: { pathname } } = props
  // 获取分组ID
  const groupId = useMemo(() => {
    return pathname.split('/').slice(-2)[0]
  }, [pathname])
  return (
    <FeatureConfig
      isAdd
      title="新增体征"
      groupId={groupId}
    />
  )
}

export default Add
