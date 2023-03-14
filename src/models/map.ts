import { Scene } from '@antv/l7';

type stateType = {
  map: AMap.Map | null;
  loca: any;
  scene: Scene;
};

const mapModel = {
  namespace:'map',
  state: {
    map: null,
    loca: null,
    scene: null,
  },
  effects: {},
  reducers: {
    save(
      state:stateType,
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
