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
        path: 'industrial-chain',
        title: '产业链分析',
        component: '@/pages/industrialChain',
      },
      {
        path: 'industrial-chain-prediction',
        title: '产业预测分析',
        component: '@/pages/industrialChainPrediction',
      },
      {
        path: 'policy',
        title: '政策库',
        component: '@/pages/policy',
      },
    ],
  },
  {
    path: '/administration',
    name: '管理中心',
    component: '@/pages/centralAdministration',
    routes: [
      {
        path: 'person-central',
        name: '个人中心',
        component: '@/pages/personCentral',
      },
      {
        path: 'company-central',
        name: '企业中心',
        component: '@/pages/companyCentral',
      },
      {
        path: 'user-management',
        name: '用户管理',
        component: '@/pages/userManagement',
      },
      {
        path: 'company-management',
        name: '企业管理',
        component: '@/pages/companyManagement',
      },
      {
        path: 'data-center',
        title: '数据中心',
        routes: [
          {
            path: 'investment',
            name: '对外投资',
            component: '@/pages/dataCenter/investment',
          },
          {
            path: 'finance',
            name: '融资信息',
            component: '@/pages/dataCenter/finance',
          },
          {
            path: 'high-tech',
            name: '高新科技',
            component: '@/pages/dataCenter/highTech',
          },
          {
            path: 'patent',
            name: '专利信息',
            component: '@/pages/dataCenter/patent',
          },
          {
            path: 'software',
            name: '软著信息',
            component: '@/pages/dataCenter/software',
          },
          {
            path: 'qualification',
            name: '企业资质',
            component: '@/pages/dataCenter/qualification',
          },
          {
            path: 'layout-info',
            name: 'TBI信息',
            component: '@/pages/dataCenter/layoutInfo',
          },
          {
            path: 'industry-type',
            name: '产业类型',
            component: '@/pages/dataCenter/industryType',
          },
          {
            path: 'model',
            name: '产业类型',
            component: '@/pages/dataCenter/model',
          },
          {
            path: 'predictionInfo',
            name: '预测信息',
            component: '@/pages/dataCenter/predictionInfo',
          },
          {
            path: 'welcome',
            name: '欢迎',
            component: '@/pages/dataCenter/welcome',
          },
          {
            path: '*',
            redirect: 'welcome',
          },
        ],
      },
    ],
  },
  { path: '/home', component: '@/pages/home' },
  // { path: '/home', component: '@/pages/personCentral' },
  {
    path: '*',
    redirect: '/home',
  },
];
