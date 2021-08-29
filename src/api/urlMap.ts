export default {
  loginCheck: '/smallapp/cardCategoryManager/iocList',
  loginOut: '/baas-login/AdminLogin/logout',
  // 体征设置
  featureConfig: {
    category: '/smallapp/cardCategoryManager/iocList',
    categorySave: '/smallapp/cardCategoryManager/save',
    categoryDelete: '/smallapp/cardCategoryManager/delete',
    cardList: '/smallapp/cardManager/list',
    list: {
      list: '/baas-index/admin/physical/index/list',
      delete: '/baas-index/admin/physical/index/delete',
      state: '/baas-index/admin/physical/index/updateState',
    },
    detail: '/baas-index/admin/physical/index/getById',
    save: {
      step1: '/baas-index/admin/physical/index/save',
      step2: '/baas-index/admin/physical/index/saveDataSource',
      step3: '/baas-index/admin/physical/index/updateCardId',
      fieldDataSource: '/baas-index/admin/physical/index/getBySourceTable',
    },
  },
  // 样板管理
  templateConfig: {
    moduleList: '/baas-app/category/platformList',
    list: '/smallapp/cardManager/list',
    status: '/smallapp/cardManager/upOrDown',
  },
  // 样板间
  templateRoom: {
    moduleList: '/baas-app/category/platformList',
    list: '/smallapp/cardManager/list',
    useTemplate: '/smallapp/cardManager/save',

  },
  // 项目工厂
  projectFactory: {
    moduleList: '/smallapp/cardCategoryManager/iocList',
    moduleDelete: '/smallapp/cardCategoryManager/delete',
    list: '/smallapp/cardManager/list',
    addCategory: '/smallapp/cardCategoryManager/save',
    produce: '/smallapp/modelSync/d',
    delete: '/smallapp/cardManager/delete',
  },
}
