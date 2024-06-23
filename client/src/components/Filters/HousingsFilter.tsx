import React from 'react';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import styles from './Filters.module.css';

const onChange: CheckboxProps['onChange'] = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

export default function HousingsFilter() {
    return (
    <>
    <p className={styles.filterName}>Тип размещения</p>
    <Checkbox onChange={onChange}>
    Гостевой дом
    </Checkbox>
    <Checkbox onChange={onChange}>
    Глэмпинг
    </Checkbox>
    <Checkbox onChange={onChange}>
    Юрта
    </Checkbox>
  </>
);
}