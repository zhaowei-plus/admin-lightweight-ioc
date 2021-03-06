import { useState } from 'react'
import http from '@/api'

interface IParams {
  [key: string]: number | string | boolean | any
}

interface IPagination {
  current: number
  pageSize: number
  total: number
  showQuickJumper: boolean
  showSizeChanger: boolean
  showTotal: (total: number) => string
}

interface IResponse {
  data: {
    list: Array<any>
    count: number
  }
  success: boolean
  msg?: string
}

/**
 * useList hook，用于Table列表数据搜索
 *
 * @param {string} url 请求地址
 * @param {object} initialParams 初始化参数，初始化时需要有搜索参数，在后续搜索中会被覆盖的参数
 * @param {object} staticParams 静态参数，每次搜索都固定不变的参数
 * */
export default (
  url: string,
  initialParams: IParams = {},
  staticParams: IParams = {},
) => {
  const [params, setParams] = useState<IParams>(initialParams)
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [pagination, setPagination] = useState<IPagination>({
    // hideOnSinglePage: true,
    current: 1,
    pageSize: 10,
    total: 0,
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: (total: number) => `共${total}条`,
  })

  // 刷新，默认参数不变
  const onRefresh = (_params = params, _pagination = pagination) => {
    const {
      current,
      pageSize,
    } = _pagination
    setLoading(true)
    return http
      .get(url, {
        pageIndex: current,
        pageSize,
        ..._params,
        ...staticParams,
      })
      .then((res: IResponse) => {
        const { list = [], count = 0 } = res.data ?? {}
        setDataSource(list)
        setParams(_params)
        setPagination({
          ..._pagination,
          total: count,
          current,
        })
        return res.data
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const onSearch = (_params?: IParams) => {
    onRefresh(_params, { ...pagination, current: 1 })
  }

  const onChange = (current, pageSize) => {
    onRefresh(params, { ...pagination, current, pageSize })
  }

  return {
    loading,
    params: {
      ...params,
      ...staticParams,
    },
    onSearch,
    onRefresh,

    table: {
      onChange,
      pagination,
      dataSource,
    },
  }
}
