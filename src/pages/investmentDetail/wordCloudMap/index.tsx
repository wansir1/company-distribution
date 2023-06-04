import React from 'react';
import Title from '@/components/Title';
import { WordCloud } from '@ant-design/plots';
import { InvestmentIndustryTypeVO } from '@/pages/investmentDetail/constants';
interface PropType {
  investmentIndustryTypeVOList: InvestmentIndustryTypeVO[];
}
const WordCloudMap: React.FC<PropType> = (props) => {
  const { investmentIndustryTypeVOList } = props;
  const wordCloudConfig: any = {
    data: investmentIndustryTypeVOList,
    padding: [0, 0, 10, 0],
    height: 320,
    wordField: 'name',
    weightField: 'value',
    colorField: 'name',
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [10, 32],
      rotation: 0,
    },
    // 返回值设置成一个 [0, 1) 区间内的值，
    // 可以让每次渲染的位置相同（前提是每次的宽高一致）。
    random: () => 0.5,
  };
  return (
    <div>
      <Title
        text="投资企业技术业务云"
        style={{ marginBottom: '3px', fontSize: '16px' }}
      />
      <div>
        <WordCloud {...wordCloudConfig} />
      </div>
    </div>
  );
};

export default WordCloudMap;
