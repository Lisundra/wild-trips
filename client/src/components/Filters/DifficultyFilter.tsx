import React from 'react';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import styles from './Filters.module.css';

const onChange: CheckboxProps['onChange'] = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

export default function DifficultyFilter() {
    return (
    <>
    <p className={styles.filterName}>Сложность</p>
    <Checkbox onChange={onChange}>
    Низкая
    </Checkbox>
    <Checkbox onChange={onChange}>
    Средняя
    </Checkbox>
    <Checkbox onChange={onChange}>
    Высокая
    </Checkbox>
  </>
);
}