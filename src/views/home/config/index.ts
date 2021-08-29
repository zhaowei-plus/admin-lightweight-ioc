import { lazy } from 'react'
import CUSTOMER from '@/assets/images/customer.png'
import SYSTEM from '@/assets/images/system.png'


export const getProject = () => [
  {
    key: 'system',
    title: '系统运营管理',
    description: '管理、运营底层内容',
    icon: SYSTEM,
    children: [
      {
        key: 'system-b1',
        title: '体征设置',
        description: '对体征数据进行编辑、上线、分类',
        path: '/so-manage/feature-config',
        icon: '',
      },
      {
        key: 'system-b2',
        title: '样板设置',
        description: '对样板间进行创建、编辑、上线、分类',
        path: '/so-manage/template-config',
        component: lazy(() => import('@/views/template-config')),
      },
      {
        key: 'system-b3',
        title: '数据魔方',
        description: '对数据进行导入、管理、编辑、查询',
        path: '/so-manage/data-cube',
        component: lazy(() => import('@/views/data-cube')),
      },
      {
        key: 'system-b4',
        title: '表单引擎',
        description: '对体征数据进行编辑、上线、分类',
        path: '/so-manage/form-engine',
        component: lazy(() => import('@/views/form-engine')),
      },
      {
        key: 'system-b5',
        title: '表单中心',
        description: '支持将表单引擎嵌入 支持可视化配置图表',
        path: '/so-manage/form-center',
        component: lazy(() => import('@/views/form-center')),
      },
    ],
  },
  {
    key: 'project',
    title: '客户项目管理',
    description: '根据客户、项目需求定制管理',
    icon: CUSTOMER,
    children: [
      {
        key: 'project-b1',
        title: '体征库',
        description: '查看数据体征的详细信息',
        path: '/cp-manage/feature-library',
        component: lazy(() => import('@/views/form-center')),
      },
      {
        key: 'project-b2',
        title: '样板间',
        description: '查看样板间内容，可直接通过样板生成项目',
        path: '/cp-manage/sample-room',
        component: lazy(() => import('@/views/form-center')),
      },
      {
        key: 'project-b3',
        title: '我的项目工厂',
        description: '对项目创建、编辑、上线、分类',
        path: '/cp-manage/project-factory',
        component: lazy(() => import('@/views/form-center')),
      },
    ],
  },
]

export const getService = () => {
  return [
    { key: 'service_a', title: '演示支持', tel: "400-103-2828", time: '周一到周日 08:00-21:30', img: '' },
    { key: 'service_b', title: '客服热线', tel: "400-103-2828", time: '周一到周日 08:00-21:30', img: '' },
  ]
}
