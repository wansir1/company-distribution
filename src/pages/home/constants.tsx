export interface LoginFormType {
  password: string;
  phone: string;
  role: number;
}

export interface LoginType {
  companyId: string;
  name: string;
  phone: string;
  role: number;
  sex: number;
  state: number;
  token: string;
  userId: number;
}

export interface RegCompanyType {
  companyId: string;
  name: string;
}

// 在登录成功后保存 Token
export const handleLoginSuccess = (userInfo: LoginType) => {
  localStorage.clear();
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  localStorage.setItem('token', userInfo.token);
};
