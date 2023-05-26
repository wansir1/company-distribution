import React from 'react';
import { Input, Space, Divider, Button } from 'antd';
import Title from '@/components/Title';
import styles from './index.less';
const { Search } = Input;

const PolicyStore: React.FC = (props) => {
  const placeList: string[] = [
    '国务院',
    '北京市',
    '上海市',
    '天津市',
    '重庆市',
    '安徽省',
    '福建省',
    '甘肃省',
    '广东省',
    '广西壮族自治区',
    '贵州省',
    '黑龙江省',
    '辽宁省',
    '江苏省',
    '吉林省',
    '河北省',
    '河南省',
    '湖北省',
    '湖南省',
    '海南省',
    '江西省',
    '内蒙古自治区',
    '宁夏回族自治区',
    '青海省',
    '山东省',
    '山西省',
    '陕西省',
    '新疆维吾尔自治区',
    '新疆生产建设兵团',
    '西藏自治区',
    '云南省',
    '浙江省',
  ];
  const handlePolicySearch = (keyWord: string) => {
    window.open(`http://sousuo.gov.cn/s.htm?t=zhengcelibrary&q=${keyWord}`);
  };

  return (
    <>
      <Space className={styles.headBox}>
        <Title text="政策文件库：" style={{ marginBottom: '3px' }} />
        <Search
          placeholder="请输入关键词"
          enterButton="查询"
          size="large"
          style={{ width: 340 }}
          onSearch={(keyWord) => handlePolicySearch(keyWord)}
        />
      </Space>
      <Divider>
        <span className={styles.topic}>全国和地区政策信息导航</span>
      </Divider>
      <Space className={styles.contentBox} size={'middle'} wrap>
        {placeList.map((place) => (
          <a
            href={'http://sousuo.gov.cn/s.htm?t=zhengcelibrary&q=' + place}
            target="_blank"
          >
            <Button size={'large'} shape={'round'}>
              {place}
            </Button>
          </a>
        ))}
      </Space>
    </>
  );
};

export default PolicyStore;
