// config/config.ts
import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  define: {
    'process.env': {
      BASE_URL: 'http://211.149.128.139:7777/',
    },
  },
  headScripts: [
    {
      type: 'text/javascript',
      src: 'https://webapi.amap.com/maps?v=2.0&key=05dcb28907a494ff96ee4b77843c2843&plugin=AMap.PlaceSearch,AMap.AutoComplete,AMap.DistrictSearch',
    },
    {
      type: 'text/javascript',
      src: 'https://webapi.amap.com/loca?v=2.0.0&key=05dcb28907a494ff96ee4b77843c2843',
    },
  ],
  fastRefresh: {},
  //   mfsu: {},
  routes: routes,
});
