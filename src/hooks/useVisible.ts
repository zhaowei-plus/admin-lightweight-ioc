import { useCallback, useState } from 'react'
/**
 * useVisible hook，用于控制弹窗的渲染
 * @param {boolean} initVisible 初始化modal的显示状态
 */
interface IParams {
  [key: string]: number | string | boolean | any
}

export default (initVisible = false) => {
  const [params, setParams] = useState<IParams>()
  const [visible, setVisible] = useState(initVisible)

  const open = useCallback((params?: IParams) => {
    setParams(params)
    setVisible(true)
  }, [])

  const close = useCallback(() => {
    setVisible(false)
    setParams(undefined)
  }, [])

  return {
    params,
    visible,
    open,
    close,
  }
}
