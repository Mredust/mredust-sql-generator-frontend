/**
 * 路由
 * 配置参考：https://umijs.org/docs/max/layout-menu#%E6%89%A9%E5%B1%95%E7%9A%84%E8%B7%AF%E7%94%B1%E9%85%8D%E7%BD%AE
 */
export default [
  {
    name: '代码生成',
    path: '/',
    component: 'index',
  },
  {
    name: '词库管理',
    path: '/dict',
    component: 'dict',
  },
  {
    name: '表管理',
    path: '/table',
    component: 'tableInfo',
  },
];
