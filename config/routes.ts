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
        path: 'cluster',
        title: '产业集群图谱',
        component: '@/pages/clusterMapping',
      },
      {
        path: 'detail',
        title: '公司详情',
        routes: [
          {
            path: 'business',
            title: '业务详情',
            component: '@/pages/businessDetail',
          },
          {
            path: 'technology',
            title: '技术详情',
          },
          {
            path: 'investment',
            title: '投资详情',
          },
        ],
      },
      {
        path: 'search',
        title: '公司搜索',
        component: '@/pages/companySearch',
      },
      {
        path: 'industrialChain',
        title: '产业链分析',
      },
      {
        path: 'policy',
        title: '政策库',
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
