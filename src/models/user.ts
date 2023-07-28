import { LoginType } from '@/pages/home/constants';
export interface UserModel {
  userInfo: LoginType;
  loginRole: number;
}

export default {
  namespace: 'user',
  state: {
    userInfo: {},
    loginRole: void 0,
  },
  reducers: {
    saveUser(
      state: UserModel,
      action: { payload: { userInfo: LoginType; loginRole: number } },
    ) {
      const { userInfo, loginRole } = action.payload;
      return { ...state, userInfo, loginRole };
    },
  },
};
