// config/routes.ts

export default [
  {
    path: '/industry',
    component: '@/pages/layouts/index',
    title: '产业分析',
    routes: [
      {
        path: 'distribution',
        title: '地域分布',
        component: '@/pages/companyDistribution/CompanyDistribution',
      },
      {
        path: 'cluster',
        title: '产业集群图谱',
        routes: [
          {
            path: 'panorama',
            title: '全景图谱',
            component: '@/pages/clusterMapping',
          },
          {
            path: 'individuals',
            title: '个体图谱',
            component: '@/pages/individualsMapping',
          },
        ],
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
            component: '@/pages/technologyDetail',
          },
          {
            path: 'investment',
            title: '投资详情',
            component: '@/pages/investmentDetail',
          },
        ],
      },
      {
        path: 'search',
        title: '产业分析',
        component: '@/pages/companySearch',
      },
      {
        path: 'industrialChain',
        title: '产业链分析',
        component: '@/pages/industrialChain',
      },
      {
        path: 'industrialChainPrediction',
        title: '产业预测分析',
      },
      {
        path: 'policy',
        title: '政策库',
        component: '@/pages/policy',
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
