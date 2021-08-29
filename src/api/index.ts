import { Http } from 'esc-ui'
import { message } from 'antd'
import urlMap from './urlMap'

export default new Http({
  baseUrl: '/',
  urlMap,
  notify: res => {
    message.destroy()
    message.error(res)
  },
  contentType: 'application/json',
  beforeCatch: (res: any) => {
    if ([-702].includes(res.code)) {
      const isDev = window.location.host.startsWith('local')
      setTimeout(() => {
        if (!isDev) {
          window.location.href = window.location.origin + '/admin/#/logout'
        }
      }, 500)
    }
    return res
  },
})
