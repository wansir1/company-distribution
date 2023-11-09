import React, { useEffect, useState } from 'react';
import { Button, Select, Space } from 'antd';
import styles from './index.less';
import Chart from '@/components/Echart';
import {
  predictDataType,
  predictionInfoType,
  requestPredictData,
  requestPredictionInfoList,
} from '@/pages/industrialChainPrediction/constants';
import { UserInfo } from '@/pages/centralAdministration';

const PREDICT_NUM = 2;

const IndustrialChainPre: React.FC = () => {
  const userInfo: UserInfo =
    localStorage.getItem('userInfo') &&
    JSON.parse(localStorage.getItem('userInfo')!);
  const [preContentList, setPreContentList] = useState<predictionInfoType[]>(
    [],
  );
  const [model, setModel] = useState<number>();
  const [preContent, setPreContent] = useState<string>('');
  const [xValue, setXValue] = useState<number[]>([]);
  const [yValue, setYValue] = useState<number[]>([]);
  const [yName, setYName] = useState<string>('');
  const [shouldRenderChart, setShouldRenderChart] = useState<boolean>(false);

  useEffect(() => {
    getPreContentList();
  }, []);
  const getPreContentList = async () => {
    try {
      const list: predictionInfoType[] = await requestPredictionInfoList(
        userInfo.companyId,
      );
      Array.isArray(list) ? setPreContentList(list) : setPreContentList([]);
    } catch (e) {
      console.log(e);
      setPreContentList([]);
    }
  };
  const option = {
    xAxis: {
      type: 'category',
      data: xValue,
    },
    yAxis: {
      name: yName,
      type: 'value',
    },
    grid: {
      top: '10%',
      bottom: '20%',
      left: '10%',
      right: '10%',
    },
    toolbox: {
      right: '10%',
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true },
      },
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      formatter: '{c}',
    },
    legend: {
      top: '1%',
      data: [
        {
          name: '实际值',
        },
        {
          name: '预测值',
          itemStyle: {
            color: 'red',
          },
          lineStyle: {
            color: 'red',
          },
          symbolSize: 8,
        },
      ],
      selectedMode: false,
    },
    visualMap: {
      show: false,
      dimension: 0,
      pieces: [
        {
          lte: xValue.length - 3,
          color: 'blue',
        },
        {
          gt: xValue.length - 3,
          lte: xValue.length - 1,
          color: 'red',
        },
      ],
    },
    series: [
      {
        data: yValue,
        name: '实际值',
        type: 'line',
        symbolSize: 8,
      },
      {
        data: null,
        name: '预测值',
        type: 'line',
        symbolSize: 8,
      },
    ],
  };
  const handleModelChange = (value: number) => {
    setModel(value);
    console.log('modelId', value);
    setShouldRenderChart(false);
  };
  const handlePreContentChange = (value: string) => {
    setPreContent(value);
    console.log('precontentId', value);
    setShouldRenderChart(false);
  };

  const changeChart = async () => {
    if (model != undefined && preContent != '') {
      try {
        const data: predictDataType = await requestPredictData({
          predictId: preContent,
          mode: model,
          predStep: PREDICT_NUM,
        });
        console.log(data, 'preDataUnits');
        Array.isArray(data.predictData1)
          ? setXValue(data.predictData1)
          : setXValue([]);
        const formattedData = data.predictData2.map((number) =>
          number.toFixed(2),
        );
        const handleData = formattedData.map((formattedNumber) =>
          parseFloat(formattedNumber),
        );
        Array.isArray(data.predictData2)
          ? setYValue(handleData)
          : setYValue([]);
        setYName(data.units);
      } catch (e) {
        console.log(e);
        setXValue([]);
        setYValue([]);
      }
      setShouldRenderChart(true);
    }
    console.log('model:', model, 'preContent', preContent);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <div className={styles.search}>
            <Space wrap>
              <span className={styles.title}>模型:</span>
              <Select
                value={model}
                style={{ width: 240 }}
                onChange={(e: any) => handleModelChange(e)}
                // defaultValue={0}
                options={[
                  { value: 0, label: '灰度模型' },
                  { value: 1, label: 'lasso' },
                  { value: 2, label: '灰度-lasso模型' },
                ]}
              />
              &nbsp; <span className={styles.title}>预测内容:</span>
              <Select
                value={preContent}
                style={{ width: 240 }}
                onChange={handlePreContentChange}
                options={preContentList}
                optionFilterProp={'name'}
                fieldNames={{ label: 'name', value: 'predictId' }}
              />
              <Button type="primary" onClick={changeChart}>
                预测
              </Button>
            </Space>
          </div>
          {shouldRenderChart && <Chart option={option}></Chart>}{' '}
          {/* 条件渲染 */}
        </div>
      </div>
    </>
  );
};
export default IndustrialChainPre;
