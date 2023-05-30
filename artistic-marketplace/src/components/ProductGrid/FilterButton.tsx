// FilterButton component

import React, { useContext, useState } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import CategoryFilter from '../CategoryFilter';
import PriceRangeFilter from '../PriceRangeFilter';

const FilterButton = () => {
    const [showFilter, setShowFilter] = useState(false);
    const { categories, toggleCategory } = useContext(ProductContext);

    const handleFilterClick = () => {
        setShowFilter(!showFilter);
    };

    const handleClearFilters = () => {
        categories.forEach(category => toggleCategory(category));
    };

    return (
        <div>
            <button onClick={handleFilterClick}>Filter</button>
            {showFilter && (
                <div className="filter-panel">
                    <button className="close-btn" onClick={handleFilterClick}>X</button>
                    <CategoryFilter />
                    <PriceRangeFilter />
                    <button onClick={handleClearFilters}>Clear</button>
                    <button onClick={handleFilterClick}>Save</button>
                </div>
            )}
        </div>
    );
};

export default FilterButton;