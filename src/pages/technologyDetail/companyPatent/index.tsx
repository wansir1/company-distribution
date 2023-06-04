import React from 'react';
import { Space, Divider, Table, Popover } from 'antd';
import Title from '@/components/Title';
import styles from './index.less';
import Chart from '@/components/Echart';
import {
  patentNumberColumns,
  PatentNumberType,
} from '@/pages/technologyDetail/companyPatent/constants';
import {
  ResultIndustryTypeVOS,
  SearchFormatPatentMap,
} from '@/pages/technologyDetail/constans';
interface PropType {
  resultIndustryTypeVOS: ResultIndustryTypeVOS[];
  searchFormatPatentMap: SearchFormatPatentMap;
}
const MAX_SPANS = 4;
const CompanyPatent: React.FC<PropType> = (props) => {
  const { resultIndustryTypeVOS, searchFormatPatentMap } = props;

  const moreBusinessSpan: ResultIndustryTypeVOS[] = resultIndustryTypeVOS
    ?.filter((item: ResultIndustryTypeVOS) => item.type == 0)
    .slice(MAX_SPANS);
  const moreTechnologySpan: ResultIndustryTypeVOS[] = resultIndustryTypeVOS
    ?.filter((item: ResultIndustryTypeVOS) => item.type == 1)
    .slice(MAX_SPANS);

  const businessContent = (
    <Space>
      {moreBusinessSpan?.map((item, index) => {
        return (
          <span style={{ color: '#808080', fontWeight: 'bold' }}>
            {item.name}
          </span>
        );
      })}
    </Space>
  );
  const technologyContent = (
    <Space>
      {moreTechnologySpan?.map((item, index) => {
        return (
          <span style={{ color: '#808080', fontWeight: 'bold' }}>
            {item.name}
          </span>
        );
      })}
    </Space>
  );
  const date: Date = new Date();
  const year: number = date.getFullYear();
  const patentNumber_Data: PatentNumberType[] = [
    {
      patentType: '发明专利',
      totalPatentRelated: searchFormatPatentMap?.invention.reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,
        0,
      ),
      year: searchFormatPatentMap?.invention[0],
      yearMinusOne: searchFormatPatentMap?.invention[1],
      yearMinusTwo: searchFormatPatentMap?.invention[2],
      yearMinusThree: searchFormatPatentMap?.invention[3],
      yearMinusThreeBefore: searchFormatPatentMap?.invention[4],
    },
    {
      patentType: '外观设计',
      totalPatentRelated: searchFormatPatentMap?.appearanceDesign.reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,
        0,
      ),
      year: searchFormatPatentMap?.appearanceDesign[0],
      yearMinusOne: searchFormatPatentMap?.appearanceDesign[1],
      yearMinusTwo: searchFormatPatentMap?.appearanceDesign[2],
      yearMinusThree: searchFormatPatentMap?.appearanceDesign[3],
      yearMinusThreeBefore: searchFormatPatentMap?.appearanceDesign[4],
    },
    {
      patentType: '实用新型',
      totalPatentRelated: searchFormatPatentMap?.utilityModel.reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,
        0,
      ),
      year: searchFormatPatentMap?.utilityModel[0],
      yearMinusOne: searchFormatPatentMap?.utilityModel[1],
      yearMinusTwo: searchFormatPatentMap?.utilityModel[2],
      yearMinusThree: searchFormatPatentMap?.utilityModel[3],
      yearMinusThreeBefore: searchFormatPatentMap?.utilityModel[4],
    },
  ];

  const lineOption: any = {
    xAxis: {
      type: 'category',
      data: [
        `${year - 3}之前`,
        `${year - 3}`,
        `${year - 2}`,
        `${year - 1}`,
        `${year}`,
      ],
    },
    yAxis: {
      name: '专利数量',
      type: 'value',
    },
    legend: {
      top: '4px',
    },
    series: [
      {
        name: '发明专利',
        data: searchFormatPatentMap?.invention.reverse(),
        type: 'line',
      },
      {
        name: '外观设计',
        data: searchFormatPatentMap?.appearanceDesign.reverse(),
        type: 'line',
      },
      {
        name: '实用新型',
        data: searchFormatPatentMap?.utilityModel.reverse(),
        type: 'line',
      },
    ],
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
  };
  return (
    <>
      <Title
        text="业务技术方向"
        style={{ marginBottom: '3px', fontSize: '16px' }}
      />
      <div className={styles.businessInfo}>
        <p
          style={{
            color: '	rgba(59,46,126,0.9)',
            display: 'inline-block',
            marginTop: '8px',
            fontWeight: 'bold',
            textAlign: 'left',
          }}
        >
          核心业务方向：
          <span style={{ marginLeft: '8px', color: '#808080' }}>
            <Space>
              {resultIndustryTypeVOS
                ?.filter((item) => item.type == 0)
                .slice(0, MAX_SPANS)
                .map((item, index) => {
                  return item.name;
                })}
              {resultIndustryTypeVOS?.filter((item) => item.type == 0).length >
                MAX_SPANS && (
                <Popover content={businessContent} trigger="hover">
                  <span style={{ textDecorationLine: 'underline' }}>
                    更多...
                  </span>
                </Popover>
              )}
            </Space>
          </span>
        </p>
        <Divider style={{ margin: '-6px 0px 0px 0px' }}></Divider>
        <p
          style={{
            color: '	rgba(59,46,126,0.9)',
            display: 'inline-block',
            fontWeight: 'bold',
            marginTop: '8px',
            textAlign: 'left',
          }}
        >
          核心技术方向：
          <span style={{ marginLeft: '8px', color: '#808080' }}>
            <Space>
              {resultIndustryTypeVOS
                ?.filter((item) => item.type == 1)
                .slice(0, MAX_SPANS)
                .map((item, index) => {
                  return item.name;
                })}
              {resultIndustryTypeVOS?.filter((item) => item.type == 1).length >
                MAX_SPANS && (
                <Popover content={technologyContent} trigger="hover">
                  <span style={{ textDecorationLine: 'underline' }}>
                    更多...
                  </span>
                </Popover>
              )}
            </Space>
          </span>
        </p>
      </div>

      <Title
        text="技术路径矩阵(专利)"
        style={{ marginBottom: '3px', marginTop: '12px', fontSize: '16px' }}
      />
      <Table
        className=""
        columns={patentNumberColumns}
        dataSource={patentNumber_Data}
        pagination={false}
        size="small"
      />

      <Title
        text="技术路径分布图"
        style={{ marginBottom: '16px', marginTop: '12px', fontSize: '16px' }}
      />
      <div>
        <Chart option={lineOption} style={{ height: '300px' }} />
      </div>
    </>
  );
};

export default CompanyPatent;
