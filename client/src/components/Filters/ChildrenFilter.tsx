import React from 'react';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import styles from './Filters.module.css';

const onChange: CheckboxProps['onChange'] = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

export default function ChildrenFilter() {
    return (
    <>
    <p className={styles.filterName}>Отдых с детьми</p>
    <Checkbox onChange={onChange}>
    Подходит для поездки с детьми
    </Checkbox>
  </>
);
}