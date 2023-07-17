import styles from './index.less';
import Image from './Image';
import React, { Fragment } from 'react';
import { Col, Row } from 'antd';
import Tip from '../Tip';

type DataType = {
  contentType: number;
  length?: {
    type?: string;
    callback?: (e: any) => void;
    left?: boolean;
    value: string;
    label: string;
    tip?: string;
    unit?: string;
  }[];
  type?: string;
  callback?: (e: any) => void;
  left?: boolean;
  value?: string;
  label?: string;
  tip?: string;
  unit?: string;
  differenceName?: string;
  differenceValue?: string;
  differenceUnit?: string;
};

type PropsType = {
  data: DataType[];
  dataSource: { [keyword: string]: string | number };
  colSpan?: number;
};
export const ContentBox: React.FC<PropsType> = (props) => {
  const { data, dataSource, colSpan } = props;

  const handleClick = (params: DataType) => {
    const { type, callback = () => {}, left } = params;
    if (left) {
      callback(params);
      return;
    }
    if (!type) return;
    callback(params);
  };

  const colItem = (item: DataType) => (
    <Col span={colSpan || 12}>
      <div className={styles.contentBox}>
        <div className={styles.contentText}>
          {item.left && dataSource[item.value] ? (
            <span
              className={styles.rightHeight}
              onClick={() => handleClick(item)}
            >
              {item.label}
            </span>
          ) : (
            item.label
          )}
          {item.tip ? <Tip content={item.tip} /> : ''}
          <div className={styles.contentValue}>
            <span
              className={item.type ? styles.rightHeight : {}}
              onClick={() => handleClick(item)}
            >
              {dataSource
                ? dataSource[item.value]
                  ? dataSource[item.value]
                  : '--'
                : '--'}
            </span>
          </div>
          <div className={styles.contentUnit}>{item.unit || ''}</div>
        </div>
      </div>
    </Col>
  );
  return (
    <Fragment>
      {data.map((item) => (
        <Row gutter={8}>
          {item.contentType == 1 && item.length!.map((item) => colItem(item))}

          {item.contentType == 2 && (
            <Col span={24}>
              <div className={styles.contentBox} style={{ height: '56px' }}>
                <div
                  className={styles.contentText}
                  style={{ height: '56px', lineHeight: '56px' }}
                >
                  <div className={styles.imageBox}>
                    <Image />
                  </div>
                  {item.label}
                  {item.tip ? <Tip content={item.tip} /> : ''}
                  <div
                    className={styles.contentValue}
                    style={{ fontSize: '28px', marginRight: '16px' }}
                  >
                    {dataSource[item.value] || ''}
                    {item.unit || ''}
                  </div>
                  <div
                    className={styles.contentUnit}
                    style={{ marginTop: '4px' }}
                  >
                    {item.differenceName || ''}
                  </div>
                  <div
                    className={styles.differenceBox}
                    style={{ marginTop: '21px' }}
                  >
                    <div
                      className={styles.difference}
                      style={
                        item.differenceValue
                          ? dataSource[item.differenceValue] < 0
                            ? {
                                color: 'red',
                              }
                            : {}
                          : {}
                      }
                    >
                      <div
                        className={styles.triangle}
                        style={
                          item.differenceValue
                            ? dataSource[item.differenceValue] < 0
                              ? {
                                  borderColor:
                                    'red transparent transparent transparent',
                                  marginBottom: '-3px',
                                }
                              : {}
                            : {}
                        }
                      ></div>
                      {item.differenceValue &&
                        (dataSource[item.differenceValue] || '--')}
                      {item.differenceUnit || ''}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          )}
        </Row>
      ))}
    </Fragment>
  );
};
