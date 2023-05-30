import React, { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import styles from './styles.module.css';

export const PriceRangeFilter = () => {
    const { priceRanges, selectedPriceRange, selectPriceRange } = useContext(ProductContext);

    const handlePriceRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if (newValue === selectedPriceRange) {
            selectPriceRange(''); // Unselect the range if the same checkbox is clicked
        } else {
            selectPriceRange(newValue);
        }
    };

    return (
        <div>
            <h3>Price Range</h3>
            {priceRanges.map(({ range }) => (
                <div key={range} className='styled-checkbox py-2'>
                    <input
                        type="checkbox"
                        id={`price-range-${range}`}
                        name="priceRange"
                        value={range}
                        checked={range === selectedPriceRange}
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
