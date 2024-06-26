import React from 'react';
import { DatePicker, Space } from 'antd';
import styles from './Filters.module.css';

type DateFilterProps = {
    setFilters: React.Dispatch<React.SetStateAction<any>>;
};

const { RangePicker } = DatePicker;

const DateFilter: React.FC<DateFilterProps> = ({ setFilters }) => {
    const onChange = (dates: any, dateStrings: [string, string]) => {
        if (dates) {
            setFilters(prev => ({
                ...prev,
                start_date: dates[0].startOf('day').toISOString(),
                end_date: dates[1].endOf('day').toISOString(),
            }));
        } else {
            setFilters(prev => ({
                ...prev,
                start_date: null,
                end_date: null,
            }));
        }
    };

    return (
        <div>
            <p className={styles.filterName}>✅Дата путешествия</p>
            <Space direction="vertical" size={12}>
                <RangePicker
                    onChange={onChange}
                    format="DD-MM-YYYY"
                />
            </Space>
        </div>
    );
};

export default DateFilter;
