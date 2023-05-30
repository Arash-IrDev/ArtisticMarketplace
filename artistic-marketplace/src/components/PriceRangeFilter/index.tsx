// PriceRangeFilter component

import React, { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import styles from './styles.module.css';

export const PriceRangeFilter = () => {
    const { priceRanges, selectPriceRange } = useContext(ProductContext);

    const handlePriceRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        selectPriceRange(event.target.value);
    };

    return (
        <div>
            <h2>Price Range</h2>
            {priceRanges.map(({ range }) => (
                <div key={range} className='styled-checkbox py-2'>
                    <input
                        type="radio"
                        id={`price-range-${range}`}
                        name="priceRange"
                        value={range}
                        onChange={handlePriceRangeChange}
                    />
                    <span onClick={(e) => {
                        // Prevent the default action of the event
                        e.preventDefault();
                        // get sibling input and click it
                        const target = e.target as HTMLElement;
                        const checkbox = target.previousSibling as HTMLInputElement;
                        checkbox.click();
                    }}></span>
                    <label className={`biggerFontSize ${styles.categoryLabel}`} htmlFor={`price-range-${range}`}>{range}</label>
                </div>
            ))}
        </div>
    );
};

export default PriceRangeFilter;