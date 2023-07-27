import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Button, message, Form, Input, Select } from 'antd';
import {
  requestRegCompany,
  requestLogin,
  requestRegister,
  RegisterParam,
  LoginParam,
} from '@/services/search';
import { history } from 'umi';
import {
  handleLoginSuccess,
  LoginType,
  RegCompanyType,
  checkPhone,
} from './constants';
import lockAlt from '@/assets/images/lockAlt.svg';
import phone from '@/assets/images/phone.svg';
import user from '@/assets/images/user.svg';
import userCheck from '@/assets/images/userCheck.svg';
const { Option } = Select;
const Home: React.FC = () => {
  const [companyList, setCompanyList] = useState<RegCompanyType[]>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const onLogFinish = async (values: LoginParam) => {
    try {
      setLoading(true);
      const res: LoginType = await requestLogin(values);
      console.log(res);
      setLoading(false);
      if ('code' in res) {
        message.error('登录信息输入错误，请重新登录');
      } else {
        handleLoginSuccess(res);
        values.role === 1
          ? history.push(`/industry/distribution`, { userInfo: res })
          : history.push(`/administration/personCentral`);
        message.success('登录成功');
      }
      console.log(res, '--login');
    } catch (err) {
      console.log(err);
      message.warning('页面修复中，请稍后登录');
    }
    console.log('Received values of form: ', values);
  };
  useEffect(() => {
    getCompanyList();
  }, []);

  const getCompanyList = async () => {
    try {
      const res: RegCompanyType[] = await requestRegCompany();
      if (Array.isArray(res)) {
        setCompanyList(res);
      } else {
        setCompanyList([]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onRegFinish = async (values: RegisterParam) => {
    try {
      setLoading(true);
      const res = await requestRegister(values);
      console.log(res);
      setLoading(false);

      if (typeof res === 'string') {
        message.success('注册成功，审核通过后可登陆');
      } else {
        message.error('注册失败，请重新注册');
      }
      form.resetFields();
      console.log(res, '--login');
    } catch (err) {
      console.log(err);
      message.warning('页面修复中，请稍后注册');
    }
    console.log('Received values of form: ', values);
  };
  return (
    <>
      <a href="https://front.codes/" className={styles.logo} target="_blank">
        <img src="https://assets.codepen.io/1462889/fcy.png" alt="" />
      </a>

      <div className={styles.section}>
        <div className={styles.fullHeight}>
          <div className={styles.firstDiv}>
            <div className={styles.section}>
              <h6 style={{ paddingBottom: '0.75rem', marginBottom: '0' }}>
                <span>Log In </span>
                <span>Sign Up</span>
              </h6>
              <input
                className={styles.checkbox}
                type="checkbox"
                id="regLog"
                name="regLog"
              />
              <label htmlFor="regLog"></label>
              <div
                className={styles.card3dWrap}
                style={{ marginLeft: 'auto', marginRight: 'auto' }}
              >
                <div className={styles.card3dWrapper}>
                  <div className={styles.cardFront}>
                    <div className={styles.centerWrap}>
                      <div
                        className={styles.section}
                        style={{ textAlign: 'center' }}
                      >
                        <h4
                          style={{
                            marginBottom: '1.5rem',
                            paddingBottom: '1rem',
                          }}
                        >
                          Log In
                        </h4>
                        <Form onFinish={onLogFinish}>
                          <div className={styles.formGroup}>
                            <Form.Item
                              name="phone"
                              rules={[
                                {
                                  required: true,
                                  message: '请输入您的手机号!',
                                },
                                {
                                  pattern: /^[0-9]{11}$/,
                                  message: '请输入正确的手机号码!',
                                },
                              ]}
                            >
                              <Input
                                type="tel"
                                className={styles.formStyle}
                                placeholder="Your Phone"
                              />
                            </Form.Item>
                            <img
                              className={styles.inputIcon}
                              src={phone}
                              alt=""
                            />
                          </div>
                          <div
                            className={styles.formGroup}
                            style={{ marginTop: '0.5rem' }}
                          >
                            <Form.Item
                              name="password"
                              rules={[
                                {
                                  required: true,
                                  message: '请输入您的密码',
                                },
                              ]}
                            >
                              <Input
                                type="password"
                                className={styles.formStyle}
                                placeholder="Your Password"
                              />
                            </Form.Item>
                            <img
                              className={styles.inputIcon}
                              src={lockAlt}
                              alt=""
                            />
                          </div>
                          <div
                            className={styles.formGroup}
                            style={{ marginTop: '0.5rem' }}
                          >
                            <Form.Item
                              name="role"
                              rules={[
                                { required: true, message: '请选择角色' },
                              ]}
                            >
                              <Select
                                placeholder="选择角色"
                                className={styles.formStyle}
                                bordered={false}
                              >
                                <Option value={1}>普通用户</Option>
                                <Option value={2}>普通管理员</Option>
                                <Option value={3}>超级管理员</Option>
                              </Select>
                            </Form.Item>
                            <img
                              className={styles.inputIcon}
                              src={userCheck}
                              alt=""
                            />
                          </div>
                          <Form.Item>
                            <Button
                              htmlType="submit"
                              className={styles.btn}
                              loading={loading}
                              style={{ marginTop: '1.5rem', cursor: 'pointer' }}
                            >
                              登录
                            </Button>
                          </Form.Item>
                          <p
                            style={{
                              marginBottom: '0',
                              marginTop: '1.5rem',
                              textAlign: 'center',
                            }}
                          >
                            <a href="#0" className={styles.link}>
                              Forgot your password?
                            </a>
                          </p>
                        </Form>
                      </div>
                    </div>
                  </div>
                  <div className={styles.cardBack}>
                    <div className={styles.centerWrap}>
                      <div
                        className={styles.section}
                        style={{ textAlign: 'center' }}
                      >
                        <h4>Sign Up</h4>
                        <Form onFinish={onRegFinish} form={form}>
                          <div className={styles.formGroup}>
                            <Form.Item
                              name="name"
                              rules={[
                                {
                                  required: true,
                                  message: '请输入您的姓名!',
                                },
                              ]}
                            >
                              <Input
                                type="text"
                                className={styles.formStyle}
                                placeholder="Your Full Name"
                              />
                            </Form.Item>
                            <img
                              className={styles.inputIcon}
                              src={user}
                              alt=""
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <Form.Item
                              name="phone"
                              rules={[
                                {
                                  required: true,
                                  message: '请输入您的手机号!',
                                },
                                {
                                  pattern: /^[0-9]{11}$/,
                                  message: '请输入正确的手机号码!',
                                },
                                {
                                  validator: async (_, value) => {
                                    const pattern = /^[0-9]{11}$/;
                                    if (!pattern.test(value))
                                      return Promise.resolve();
                                    const notExitPhone = await checkPhone(
                                      value,
                                    );
                                    if (!value || notExitPhone) {
                                      return Promise.resolve();
                                    }
                                    return Promise.reject(
                                      new Error('手机号码已存在，请重新输入!'),
                                    );
                                  },
                                },
                              ]}
                            >
                              <Input
                                type="tel"
                                className={styles.formStyle}
                                placeholder="Your Phone"
                              />
                            </Form.Item>
                            <img
                              className={styles.inputIcon}
                              src={phone}
                              alt=""
                            />
                          </div>
                          <div
                            className={styles.formGroup}
                            style={{ marginTop: '0.5rem' }}
                          >
                            <Form.Item
                              name="password"
                              rules={[
                                {
                                  required: true,
                                  message: '请输入您的密码',
                                },
                              ]}
                            >
                              <Input
                                type="password"
                                className={styles.formStyle}
                                placeholder="Your Password"
                              />
                            </Form.Item>
                            <img
                              className={styles.inputIcon}
                              src={lockAlt}
                              alt=""
                            />
                          </div>
                          <div
                            className={styles.formGroup}
                            style={{ marginTop: '0.5rem' }}
                          >
                            <Form.Item
                              name="companyId"
                              rules={[
                                { required: false, message: '请选择所属公司' },
                              ]}
                            >
                              <Select
                                placeholder="选择所属公司"
                                className={styles.formStyle}
                                bordered={false}
                                showSearch
                                allowClear
                                optionFilterProp={'name'}
                                options={companyList}
                                fieldNames={{
                                  label: 'name',
                                  value: 'companyId',
                                }}
                              />
                            </Form.Item>
                            <img
                              className={styles.inputIcon}
                              src={userCheck}
                              alt=""
                            />
                          </div>
                          <div
                            className={styles.formGroup}
                            style={{ marginTop: '0.5rem' }}
                          >
                            <Form.Item
                              name="sex"
                              rules={[
                                { required: true, message: '请选择性别' },
                              ]}
                            >
                              <Select
                                placeholder="选择性别"
                                className={styles.formStyle}
                                bordered={false}
                                options={[
                                  { label: '男', value: 0 },
                                  { label: '女', value: 1 },
                                ]}
                              />
                            </Form.Item>
                            <img
                              className={styles.inputIcon}
                              src={userCheck}
                              alt=""
                            />
                          </div>
                          <div
                            className={styles.formGroup}
                            style={{ marginTop: '0.5rem' }}
                          >
                            <Form.Item
                              name="role"
                              rules={[
                                { required: true, message: '请选择角色' },
                              ]}
                            >
                              <Select
                                placeholder="选择角色"
                                className={styles.formStyle}
                                bordered={false}
                              >
                                <Option value={1}>普通用户</Option>
                                <Option value={2}>普通管理员</Option>
                              </Select>
                            </Form.Item>
                            <img
                              className={styles.inputIcon}
                              src={userCheck}
                              alt=""
                            />
                          </div>
                          <Form.Item>
                            <Button
                              htmlType="submit"
                              className={styles.btn}
                              loading={loading}
                              style={{ marginTop: '1.5rem', cursor: 'pointer' }}
                            >
                              注册
                            </Button>
                          </Form.Item>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
