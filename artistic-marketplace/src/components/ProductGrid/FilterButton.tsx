import React, { useContext, useState } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import CategoryFilter from '../CategoryFilter';
import PriceRangeFilter from '../PriceRangeFilter';
import styles from './FilterButton.module.css';
import Image from 'next/image';

const FilterButton = () => {
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const { emptyFilters } = useContext(ProductContext);

    // Toggle the visibility of the filter panel
    const handleFilterClick = () => {
        setShowFilter(!showFilter);
    };

    // Clear all filters
    const handleClearFilters = () => {
        emptyFilters();
    };

    return (
        <div className={styles.filterButton}>
            {/* Filter button icon */}
            <Image width={32} height={32} className={`${styles.settingIcon} handCursor`} onClick={handleFilterClick} src="/images/setting.svg" alt="Filters" />

            {/* Render the filter panel if showFilter is true */}
            {showFilter && (
                <div className={styles.filterPanel}>
                    {/* Close button */}
                    <Image width={32} height={32} className={`${styles.closeBtn} handCursor`} onClick={handleFilterClick} src="/images/x.svg" alt="Close" />

                    {/* Category filter */}
                    <CategoryFilter />
                    <hr />

                    {/* Price range filter */}
                    <PriceRangeFilter />
                    <hr />

                    {/* Buttons for clear and save filters */}
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
