import React, { useEffect, useState, useRef } from 'react';
import styles from './index.less';
import ReactECharts from 'echarts-for-react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { changeFontSize } from './constant';
interface PropsType {
  children?: React.ReactNode;
  visible: boolean;
  onCancel?: () => void;
}

type Children = React.ReactNode | React.ReactNode[];
const ModalBox: React.FC<PropsType> = ({ children, visible, onCancel }) => {
  const [animation, setAnimation] = useState(false);
  const [modalHidden, setModalHidden] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReactECharts>(null);
  useEffect(() => {
    if (visible) {
      // 弹出模态框
      // 先把模态框的 display 取消 none
      setModalHidden(!visible);
      // 使用 setTimeout 先让 React 渲染已经修改的状态
      // 如果不使用 setTimeout，模态框动画会无效
      setTimeout(() => {
        setAnimation(visible);
      }, 0);
    } else {
      // 关闭模态框
      // 先进行动画
      setAnimation(visible);
      setTimeout(() => {
        setModalHidden(!visible);
      }, 500);
    }
  }, [visible]);

  useEffect(() => {
    if (!children || !chartRef) return;
    let basicWidth = 0;
    const resizeObserver = new ResizeObserver(() => {
      const container = containerRef.current;
      if (container && chartRef.current) {
        const chart = chartRef.current;
        const myChart = chart.getEchartsInstance();
        // myChart 是一个有效的 ECharts 实例
        const chartType: string =
          chart.props.option.series && chart.props.option.series[0].type;
        if (chartType) {
          const { width, height } = container.getBoundingClientRect();
          basicWidth === 0 ? (basicWidth = width) : '';
          const option = changeFontSize(basicWidth, width, chartType);
          console.log(chartType, width, basicWidth, option, 'myChart');
          myChart?.setOption(option);
        }
        myChart.resize();
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
      const element = event.target as HTMLElement;
      let root = document.documentElement;
      if (!element) {
        alert('未找到被点击的元素');
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
        console.log(left, top, width, height, event, 'point');
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
        {visible && (
          <div className={styles.close}>
            <ArrowLeftOutlined rev={undefined} style={{ fontSize: '14px' }} />
          </div>
        )}
      </div>
    </>
  );
};
export default ModalBox;
