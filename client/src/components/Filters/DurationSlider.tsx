/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { Col, InputNumber, Row, Slider, Space } from 'antd';
import styles from './Filters.module.css';

const RangeSlider: React.FC<{ setFilters: React.Dispatch<React.SetStateAction<any>> }> = ({ setFilters }) => {
  const [inputValue, setInputValue] = useState<[number, number]>([1, 30]);

  const onChange = (newValue: [number, number]) => {
    setInputValue(newValue);
    setFilters(prev => ({ ...prev, duration: newValue }));
  };

  return (
    <Row>
      <Col span={12}>
        <Slider
          range
          min={1}
          max={30}
          onChange={onChange}
          value={inputValue}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={1}
          max={30}
          value={inputValue[0]}
          onChange={(value) => onChange([value as number, inputValue[1]])}
          style={{ margin: '0 16px' }}
        />
        <InputNumber
          min={1}
          max={30}
          value={inputValue[1]}
          onChange={(value) => onChange([inputValue[0], value as number])}
          style={{ margin: '0 16px' }}
        />
      </Col>
    </Row>
  );
};

export default function DurationSlider({ setFilters }) {
  return (
    <>
      <p className={styles.filterName}>Длительность</p>
      <Space style={{ width: '100%' }} direction="vertical">
        <RangeSlider setFilters={setFilters} />
      </Space>
    </>
  );
}
