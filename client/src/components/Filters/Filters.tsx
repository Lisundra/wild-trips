/* eslint-disable react/function-component-definition */
import React from 'react';
import styles from './Filters.module.css';
import DateFilter from './DateFilter';
import BudgetFilter from './BudgetFilter';
import SeasonFilter from './SeasonFilter';
import ActivitiesFilter from './ActivitiesFilter';
import DifficultyFilter from './DifficultyFilter';
import HousingsFilter from './HousingsFilter';
import ChildrenFilter from './ChildrenFilter';
import DurationFilter from './DurationFilter';
import FacilitiesFilter from './FacilitiesFilter';
import RatingFilter from './RatingFilter';
import CountryFilter from './CountryFilter';
import RegionFilter from './RegionFilter';

type FiltersProps = {
    setFilters: React.Dispatch<React.SetStateAction<any>>;
};

const Filters: React.FC<FiltersProps> = ({ setFilters }) => (
        <div className={styles.filtersContainer}>
            <h4 className={styles.filtersHeading}>Фильтры</h4>
            <DateFilter setFilters={setFilters} />
            <CountryFilter setFilters={setFilters} />
            <RegionFilter setFilters={setFilters}/>
            <RatingFilter setFilters={setFilters}/>
            <DurationFilter setFilters={setFilters} />
            <BudgetFilter setFilters={setFilters} />
            <SeasonFilter setFilters={setFilters} />
            <ActivitiesFilter setFilters={setFilters}/>
            <DifficultyFilter setFilters={setFilters} />
            <HousingsFilter setFilters={setFilters} />
            <FacilitiesFilter setFilters={setFilters} />
            <ChildrenFilter setFilters={setFilters} />
        </div>
    );

export default Filters;
