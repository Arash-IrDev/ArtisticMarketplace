// FilterButton component

import React, { useContext, useState } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import CategoryFilter from '../CategoryFilter';
import PriceRangeFilter from '../PriceRangeFilter';
import styles from './FilterButton.module.css';

const FilterButton = () => {
    const [showFilter, setShowFilter] = useState(false);
    const { emptyFilters } = useContext(ProductContext);

    const handleFilterClick = () => {
        setShowFilter(!showFilter);
    };

    const handleClearFilters = () => {
        emptyFilters();
    };

    return (
        <div className={styles.filterButton}>
            <img className='handCursor' onClick={handleFilterClick} src="images/setting.svg" alt="Filters" />
            {showFilter && (
                <div className={styles.filterPanel}>
                    <img className={`${styles.closeBtn} handCursor`} onClick={handleFilterClick} src="images/x.svg" alt="close" />
                    <CategoryFilter />
                    <hr />
                    <PriceRangeFilter />
                    <hr />
                    <div className='row'>
                        <div className={`col-6`}><button className={`${styles.filterPanelButtons} ${styles.ClearButton}`} onClick={handleClearFilters}>Clear</button></div>
                        <div className={`col-6`}><button className={`${styles.filterPanelButtons} ${styles.SaveButton} `} onClick={handleFilterClick}>Save</button></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterButton;