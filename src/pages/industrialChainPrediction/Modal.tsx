import React, { useEffect, useState, useRef } from 'react';
import styles from './index.less';
import { ECharts } from 'echarts';
interface PropsType {
  children?: Children;
  visible: boolean;
  onCancel?: () => void;
}
type Children = React.ReactNode | React.ReactNode[];
let contentStyle = { top: '0px', left: '0px' };
const ModalPre: React.FC<PropsType> = ({ children, visible, onCancel }) => {
  const [animation, setAnimation] = useState(false);
  const [modalHidden, setModalHidden] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ECharts>(null);
  useEffect(() => {
    if (visible) {
      setModalHidden(!visible);
      setTimeout(() => {
        setAnimation(visible);
      }, 100);
    } else {
      setAnimation(visible);
      setTimeout(() => {
        setModalHidden(!visible);
      }, 800);
    }
  }, [visible]);

  useEffect(() => {
    if (!children || !chartRef) return;
    const resizeObserver = new ResizeObserver(() => {
      const container = containerRef.current;
      console.log(children, chartRef, 'chart1');
      if (container) {
        const myChart = chartRef.current;
        if (myChart) {
          myChart.resize();
        }
      }
    });
    containerRef.current && resizeObserver.observe(containerRef.current);

    return () => {
      containerRef.current && resizeObserver.unobserve(containerRef.current);
      resizeObserver.disconnect();
    };
  }, [children]);

  useEffect(() => {
    /**
     *
     * @param {MouseEvent} ev
     */
    const onClick = (event: MouseEvent) => {
      const element = event.target;
      console.log(event, 'element');
      let root = document.documentElement;
      if (!element) {
        console.log('未找到被点击的元素');
        return;
      }
      // 获取元素位置信息和计算位置坐标
      if (element instanceof HTMLElement) {
        const { left, top, width, height } = element.getBoundingClientRect();
        // 获取点击元素转换后的属性值
        const computedStyles = window.getComputedStyle(element);
        const borderRadius = computedStyles.getPropertyValue('border-radius');
        let modalStyleChange = {
          '--modalWidth': `${width}px`,
          '--modalHeight': `${height}px`,
          '--modalTranslateX': `${left}px`,
          '--modalTranslateY': `${top}px`,
          '--modalRadius': borderRadius,
        };
        contentStyle.top = `${top}`;
        contentStyle.left = `${left}`;
        Object.entries(modalStyleChange).forEach(([property, value]) => {
          root.style.setProperty(property, value);
        });
      }
    };

    document.documentElement.addEventListener('click', onClick);
    return () => {
      document.documentElement.removeEventListener('click', onClick);
    };
  }, [modalHidden]);

  return (
    <>
      <div
        className={`${styles.mask} ${animation ? styles.maskEnter : ''}`}
        style={modalHidden ? { display: 'none' } : { display: 'flex' }}
        onClick={(event) => {
          onCancel && onCancel();
          event.stopPropagation();
        }}
      >
        <div
          ref={containerRef}
          className={`${styles.modalContainer} ${
            animation ? styles.modalEnter : ''
          }`}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {React.Children?.map(children, (child: Children) => {
            if (React.isValidElement(child)) {
              if (child.type == 'div') {
                return React.cloneElement(child as React.ReactElement, {
                  style: {
                    ...child.props.style,
                    width: '100%',
                    height: '100%',
                    top: '0px',
                    left: '0px',
                    right: '0px',
                    bottom: '0px',
                    margin: '0 0 0 0',
                  },
                });
              } else {
                return React.cloneElement(child as React.ReactElement, {
                  style: {
                    ...child.props.style,
                    width: '100%',
                    height: '100%',
                    top: '0px',
                    left: '0px',
                    right: '0px',
                    bottom: '0px',
                    margin: '0 0 0 0',
                  },
                  chartRef: chartRef,
                });
              }
            }
            return child;
          })}
        </div>
        <div className={styles.closeBox}>
          <div className={styles.close}>
            {/* <ArrowLeftOutlined style={{ fontSize: '16px' }} /> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default ModalPre;
