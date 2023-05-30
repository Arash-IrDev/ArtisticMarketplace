// CategoryFilter component

import React, { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import styles from './styles.module.css';

const CategoryFilter = () => {
    const { categories = [], selectedCategories = [], toggleCategory } = useContext(ProductContext);

    return (
        <div>
            <h3>Categories</h3>
            {categories.map(category => (
                <div key={category} className='styled-checkbox py-2'>
                    <input 
                        type="checkbox"
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                    />
                    <span onClick={(e) => {
                        // Prevent the default action of the event
                        e.preventDefault();
                        // get sibling input and click it
                        const target = e.target as HTMLElement;
                        const checkbox = target.previousSibling as HTMLInputElement;
                        checkbox.click();
                    }}></span>
                    <label className={`biggerFontSize ${styles.categoryLabel}`} htmlFor={category}>{category}</label>
                </div>
            ))}
        </div>
    );
};

export default CategoryFilter;
