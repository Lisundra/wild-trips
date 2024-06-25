/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { Col, InputNumber, Row, Slider, Space } from 'antd';
import styles from './Filters.module.css';

const BudgetRangeSlider: React.FC<{ setFilters: React.Dispatch<React.SetStateAction<any>> }> = ({ setFilters }) => {
  const [inputValue, setInputValue] = useState<[number, number]>([1, 2000000]);

  const onChange = (newValue: [number, number]) => {
    setInputValue(newValue);
    setFilters(prev => ({ ...prev, price: newValue }));
  };

  return (
    <div style={{ width: '100%' }}>
      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <Col span={12}>
          <InputNumber
            min={1}
            max={2000000}
            value={inputValue[0]}
            onChange={(value) => onChange([value as number, inputValue[1]])}
            style={{ width: '100%' }}
          />
        </Col>
        <Col span={12}>
          <InputNumber
            min={1}
            max={2000000}
            value={inputValue[1]}
            onChange={(value) => onChange([inputValue[0], value as number])}
            style={{ width: '100%' }}
          />
        </Col>
      </Row>
      <Slider
        range
        min={1}
        max={2000000}
        onChange={onChange}
        value={inputValue}
      />
    </div>
  );
};

export default function BudgetSlider({ setFilters }) {
  return (
    <>
      <p className={styles.filterName}>Бюджет, ₽</p>
      <Space style={{ width: '75%' }} direction="vertical">
        <BudgetRangeSlider setFilters={setFilters} />
      </Space>
    </>
  );
}
