import React,{useState} from 'react';
import {Row,Col} from 'antd';
import styles from './index.less'
type PropsType = {
  content: {
    label: string;
    value?: number | string;
    unit: string;
    style?: { [keyword: string]: string };
    valueStyle?: { [keyword: string]: string };
  };
};
const RenderRow: React.FC<PropsType> = (props) => {
    const {content} = props;
    return (
      <Col span={24}>
        <div className={styles.contentBox}>
          <Row>
            <Col span={24}>
              <span className={styles.contentLabel}>{content.label}：</span>
            </Col>
            <Col span={24}>
              <span
                className={styles.contentValue}
                style={{
                  color: 'red',
                  ...content.valueStyle,
                }}
              >
                {content.value || '--'}
              </span>
              <span className={styles.contentUnit}>{content.unit}</span>
            </Col>
          </Row>
        </div>
      </Col>
    );
}

export default RenderRow;