import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import styles from './Filters.module.css';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

export default function DateFilter() {
  return (
    <>
    <p className={styles.filterName}>Дата путешествия</p>
        <Space direction="vertical">
            <DatePicker onChange={onChange} />
        </Space>
    </>
  )
}
