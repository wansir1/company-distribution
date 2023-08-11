import {
  ChromeFilled,
  CrownFilled,
  BankFilled,
  DatabaseFilled,
  IdcardFilled,
  TabletFilled,
  PieChartOutlined,
  MoneyCollectOutlined,
  SketchOutlined,
  RadarChartOutlined,
  CopyrightOutlined,
  VerifiedOutlined,
  GlobalOutlined,
} from '@ant-design/icons';

export const defaultProps = (role: number) => {
  const routes = [
    {
      path: '/administration/person-central',
      name: '个人中心',
      icon: <IdcardFilled rev={undefined} />,
    },
    {
      path: `/administration/${
        role === 2 ? 'company-central' : 'company-management'
      }`,
      name: `${role === 2 ? '企业中心' : '企业管理'}`,
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
          icon: <PieChartOutlined rev={undefined} />,
          component: './Welcome',
        },
        {
          path: 'finance',
          name: '融资信息',
          icon: <MoneyCollectOutlined rev={undefined} />,
          component: './Welcome',
        },
        {
          path: 'high-tech',
          name: '高新科技',
          icon: <SketchOutlined rev={undefined} />,
          component: './Welcome',
        },
        {
          path: 'patent',
          name: '专利信息',
          icon: <RadarChartOutlined rev={undefined} />,
          component: './Welcome',
        },
        {
          path: 'software',
          name: '软著信息',
          icon: <CopyrightOutlined rev={undefined} />,
          component: './Welcome',
        },
        {
          path: 'qualification',
          name: '企业资质',
          icon: <VerifiedOutlined rev={undefined} />,
          component: './Welcome',
        },
        {
          path: 'layout-info',
          name: 'TBI信息',
          comment: '技术、业务、产业布局信息',
          icon: <GlobalOutlined rev={undefined} />,
          component: './Welcome',
        },
      ],
    },
  ];
  if (role === 3) {
    const addRoute = {
      path: 'industry-type',
      name: '产业类型',
      icon: <GlobalOutlined rev={undefined} />,
      component: './Welcome',
    };
    routes[3].routes?.push(addRoute);
    routes.shift();
  }
  return {
    route: {
      path: '/administration ',
      name: '管理中心',
      routes,
    },
    appList: [
      {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
        title: 'ECUT',
        desc: '东华理工大学',
        //   url: '',
      },
    ],
  };
};
