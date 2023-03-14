// config/routes.ts

export default [
  {
    path: '/industry',
    component: '@/pages/layouts/index',
    title: '产业分析',
    routes: [
      {
        path: 'distribution',
        title: '公司分布',
        component: '@/pages/companyDistribution/CompanyDistribution',
      },
      {
        path: 'search',
        title: '公司搜索',
        component: '@/pages/companySearch',
      },
      //   { path: 'test', title: '测试', component: '@/pages/index' },
      //   {
      //     path: 'user',
      //     title: '测试2',
      //     component: '@/pages/user',
      //     wrappers: ['@/wrappers/auth'],
      //   },
      //   {
      //     title: '公司',
      //     path: 'userInfo',
      //     component: '@/pages/user/map',
      //   },
      {
        path: '*',
        redirect: 'distribution',
      },
    ],
  },
  {
    path: '*',
    redirect: '/industry/default',
  },
];
