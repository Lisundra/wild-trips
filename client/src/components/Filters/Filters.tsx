/* eslint-disable react/function-component-definition */
import React from 'react';
import styles from './Filters.module.css';
import DateFilter from './DateFilter';
import DurationSlider from './DurationSlider';
import BudgetFilter from './BudgetFilter';
import SeasonFilter from './SeasonFilter';
import ActivitiesFilter from './ActivitiesFilter';
import DifficultyFilter from './DifficultyFilter';
import HousingsFilter from './HousingsFilter';
import ChildrenFilter from './ChildrenFilter';

type FiltersProps = {
    setFilters: React.Dispatch<React.SetStateAction<any>>;
};

const Filters: React.FC<FiltersProps> = ({ setFilters }) => (
        <div className={styles.filtersContainer}>
            <h4 className={styles.filtersHeading}>Фильтры</h4>
            <DateFilter setFilters={setFilters} />
            <DurationSlider setFilters={setFilters} />
            <BudgetFilter setFilters={setFilters} />
            <SeasonFilter setFilters={setFilters} />
            <ActivitiesFilter />
            <DifficultyFilter setFilters={setFilters} />
            <HousingsFilter />
            <ChildrenFilter setFilters={setFilters} />
        </div>
    );

export default Filters;
