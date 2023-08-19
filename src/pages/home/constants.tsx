import { requestCheckPhone, CheckParamType } from '@/services/search';

export type LoginType = {
  companyId: string;
  name: string;
  phone: string;
  role: number;
  sex: number;
  state: number;
  token: string;
  userId: number;
  companyName: string;
};

// 在登录成功后保存 Token
export const handleLoginSuccess = (userInfo: LoginType, loginRole: number) => {
  localStorage.clear();
  const userAllInfo = { ...userInfo, loginRole };
  localStorage.setItem('userInfo', JSON.stringify(userAllInfo));
  localStorage.setItem('token', userInfo.token);
};

export const checkPhone = async (params: CheckParamType) => {
  // 定义一个异步函数来调用 checkPhone 接口
  try {
    const data = await requestCheckPhone(params); // 解析响应数据
    if (typeof data === 'object' && 'code' in data) {
      return false;
    }
    return data; // 返回数据
  } catch (error) {
    console.error(error); // 处理错误
    return null;
  }
};
