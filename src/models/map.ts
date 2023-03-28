import { Scene } from '@antv/l7';

type StateType = {
  map: AMap.Map | null;
  loca: any;
  scene: Scene;
};

const mapModel = {
  namespace: 'map',
  state: {
    map: null,
    loca: null,
    scene: null,
  },
  effects: {},
  reducers: {
    save(
      state: StateType,
      {
        payload,
      }: { payload: { map?: AMap.Map | null; loca?: any; scene?: Scene } },
    ) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default mapModel;
