import React from 'react';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import styles from './Filters.module.css';

export default function ChildrenFilter({ setFilters }) {

  const onChange: CheckboxProps['onChange'] = (e) => {
    // console.log(`checked = ${e.target.checked}`);
    setFilters(prev => ({ ...prev, family_friendly: e.target.checked ? true : null }));
  };

    return (
    <>
    <p className={styles.filterName}>✅Отдых с детьми</p>
    <Checkbox onChange={onChange}>
    Подходит для поездки с детьми
    </Checkbox>
  </>
);
}