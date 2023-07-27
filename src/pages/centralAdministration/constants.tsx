import {
  ChromeFilled,
  CrownFilled,
  BankFilled,
  DatabaseFilled,
  IdcardFilled,
  TabletFilled,
} from '@ant-design/icons';

export default {
  route: {
    path: '/administration ',
    name: '管理中心',
    routes: [
      {
        path: '/administration/person-central',
        name: '个人中心',
        icon: <IdcardFilled rev={undefined} />,
      },
      {
        path: '/administration/company-central',
        name: '企业中心',
        icon: <BankFilled rev={undefined} />,
      },
      {
        path: '/administration/user-management',
        name: '用户管理',
        icon: <CrownFilled rev={undefined} />,
      },
      {
        name: '数据中心',
        icon: <DatabaseFilled rev={undefined} />,
        path: '/administration/data-center',
        routes: [
          {
            path: 'investment',
            name: '对外投资',
            icon: <CrownFilled rev={undefined} />,
            component: './Welcome',
          },
          {
            path: 'finance',
            name: '融资信息',
            icon: <CrownFilled rev={undefined} />,
            component: './Welcome',
          },
          {
            path: 'high-tech',
            name: '高新科技',
            icon: <CrownFilled rev={undefined} />,
            component: './Welcome',
          },
          {
            path: 'patent',
            name: '专利信息',
            icon: <CrownFilled rev={undefined} />,
            component: './Welcome',
          },
          {
            path: 'software',
            name: '软著信息',
            icon: <CrownFilled rev={undefined} />,
            component: './Welcome',
          },
          {
            path: 'qualification',
            name: '企业资质',
            icon: <CrownFilled rev={undefined} />,
            component: './Welcome',
          },
          {
            path: 'layout-info',
            name: 'TBI信息',
            comment: '技术、业务、产业布局信息',
            icon: <CrownFilled rev={undefined} />,
            component: './Welcome',
          },
        ],
      },
    ],
  },
  //   location: {
  //     pathname: '/administration',
  //   },

  appList: [
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
      title: 'ECUT',
      desc: '东华理工大学',
      //   url: '',
    },
  ],
};
