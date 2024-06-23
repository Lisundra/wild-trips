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

export default function Filters() {
  return (
    <div className={styles.filtersContainer}>
        <h4 className={styles.filtersHeading}>Фильтры</h4>
        <DateFilter />
        <DurationSlider />
        <BudgetFilter />
        <SeasonFilter />
        <ActivitiesFilter />
        <DifficultyFilter />
        <HousingsFilter />
        <ChildrenFilter />
    </div>
  )
}