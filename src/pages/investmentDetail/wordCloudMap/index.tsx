import React from 'react';
import Title from '@/components/Title';
import { WordCloud } from '@ant-design/plots';
import { wordCloudConfig } from '@/pages/investmentDetail/wordCloudMap/constants';
const WordCloudMap: React.FC = () => {
  return (
    <div>
      <Title
        text="投资的企业专利技术云"
        style={{ marginBottom: '3px', fontSize: '16px' }}
      />
      <WordCloud {...wordCloudConfig} />
    </div>
  );
};

export default WordCloudMap;
