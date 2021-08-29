import { registerFormFields, connect } from '@formily/antd'

import ImageUpload from './image-upload'

// 全局批量扩展，请查看帮助文档：https://formilyjs.org/#/0yTeT0/jYSxSwhmHa
registerFormFields({
  'image-upload': connect()(ImageUpload),
})
