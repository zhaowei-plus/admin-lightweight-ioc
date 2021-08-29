import { formatFormSchema } from '@/utils'

export const getSchema = () => {
  return formatFormSchema({
    appName: {
      type: 'string',
      title: '名称',
      required: true,
    },
    tags: {
      type: 'string',
      title: '标签',
      enum: [],
      required: true,
      'x-props': {
        placeholder: '请输入',
        mode: 'tags',
      },
    },
    categoryId: {
      required: true,
      title: '分类',
      'x-component': 'SingleSelect',
    },
    introduce: {
      type: 'textarea',
      title: '描述',
    },
  })
}
