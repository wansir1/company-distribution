import React from 'react';
import styles from './index.less';

const Title = (props) => {
  const { type = 'small', text, right, left } = props;
  if (type === 'middle') {
    return (
      <div className={styles.middleTitle} {...props}>
        {text}：
      </div>
    );
  }
  if (type === 'small') {
    return (
      <div className={styles.smallTitle} {...props}>
        {text}
        {left}
        {right ? <span>{right}</span> : ''}
      </div>
    );
  }
  return text;
};

export default Title;
