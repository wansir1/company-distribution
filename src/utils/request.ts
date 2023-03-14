/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import request, { extend } from 'umi-request';
import { notification } from 'antd';

export function getQueryString(name:any) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

type codeMessageType = {
    [key:number]: string
}

const codeMessage:codeMessageType = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error:any) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }
  return response;
};

async function parseRequest(response: Response) {
  const res = await response.text();
  try {
    const jsonRes = JSON.parse(res);
    return jsonRes.data || jsonRes;
  } catch (err) {
    return res;
  }
}

/**
 * 配置request请求时的默认参数
 */

const prefix = process.env.BASE_URL;

// 权限
request.interceptors.response.use(async (response, options) => {
  if (response.status === 401) {
    // @ts-ignore
    const orgId = getQueryString('_orgId');
    const responseBody = await response.json();
    window.location.href = `${process.env.LOGIN_ADDRESS}&state=${
      responseBody.state
    }&name=${responseBody.name || ''}&_orgId=${orgId}`;
    throw response;
  }
  return response;
});

// 格式
request.interceptors.response.use((response) => {
  return parseRequest(response);
});

export const requestUtils = extend({
  prefix: prefix + '',
  errorHandler,
  credentials: 'include',
});


export const createRequest = extend;

export default extend({
  prefix: '',
  errorHandler,
  credentials: 'include',
});
