import { lazy } from 'react'

export default [
  {
    title: '首页',
    path: '/home',
    component: lazy(() => import('@/views/home')),
  },
  {
    title: '系统运营管理',
    path: '/so-manage',
    children: [
      {
        key: 'feature-config',
        title: '体征设置',
        path: '/so-manage/feature-config/:id?',
        component: lazy(() => import('@/views/feature-config')),
      },
      {
        key: 'template-config',
        title: '样板设置',
        path: '/so-manage/template-config/:id?',
        component: lazy(() => import('@/views/template-config')),
      },
      {
        key: 'data-cube',
        title: '数据魔方',
        path: '/so-manage/data-cube',
        component: lazy(() => import('@/views/data-cube')),
      },
      {
        key: 'form-engine',
        title: '表单引擎',
        path: '/so-manage/form-engine',
        component: lazy(() => import('@/views/form-engine')),
      },
      {
        key: 'form-center',
        title: '表单中心',
        path: '/so-manage/form-center',
        component: lazy(() => import('@/views/form-center')),
      },
    ],
  },
  {
    title: '客户项目管理',
    path: '/cp-manage',
    children: [
      {
        key: 'feature-library',
        title: '体征库',
        path: '/cp-manage/feature-library/:id?',
        component: lazy(() => import('@/views/feature-library')),
      },
      {
        key: 'sample-room',
        title: '样板间',
        path: '/cp-manage/sample-room/:id?',
        component: lazy(() => import('@/views/sample-room')),
      },
      {
        key: 'project-factory',
        title: '我的项目工厂',
        path: '/cp-manage/project-factory/:id?',
        component: lazy(() => import('@/views/project-factory')),
      },
    ],
  },
]
