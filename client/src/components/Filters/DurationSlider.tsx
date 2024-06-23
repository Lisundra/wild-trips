/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { Col, InputNumber, Row, Slider, Space } from 'antd';
import styles from './Filters.module.css';

const RangeSlider: React.FC = () => {
  const [inputValue, setInputValue] = useState<[number, number]>([1, 20]);

  const onChange = (newValue: [number, number]) => {
    setInputValue(newValue);
  };

  return (
    <Row>
      <Col span={12}>
        <Slider
          range
          min={1}
          max={20}
          onChange={onChange}
          value={inputValue}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={1}
          max={20}
          value={inputValue[0]}
          onChange={(value) => onChange([value as number, inputValue[1]])}
          style={{ margin: '0 16px' }}
        />
        <InputNumber
          min={1}
          max={20}
          value={inputValue[1]}
          onChange={(value) => onChange([inputValue[0], value as number])}
          style={{ margin: '0 16px' }}
        />
      </Col>
    </Row>
  );
};

export default function DurationSlider() {
  return (
    <>
      <p className={styles.filterName}>Длительность</p>
      <Space style={{ width: '100%' }} direction="vertical">
        <RangeSlider />
      </Space>
    </>
  );
}
