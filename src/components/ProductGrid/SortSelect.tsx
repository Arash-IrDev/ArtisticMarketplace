import React, { useContext, useState, useEffect, useRef } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import styles from './SortSelect.module.css'
import Image from 'next/image';

const SortSelect: React.FC = () => {
    const { sorting, selectSorting } = useContext(ProductContext);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const options = [
        { value: "priceLowHigh", label: "Price (Low to High)" },
        { value: "priceHighLow", label: "Price (High to Low)" },
    ]
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Handle click outside the dropdown to close it
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup function to remove event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    return (
        <div ref={dropdownRef} className={styles.dropDownContainer}>
            {/* Sort button */}
            <button onClick={() => setIsOpen(!isOpen)} className={styles.sortButton}>
                <Image width={28} height={28} src="/images/sort.svg" className={styles.sortIcon} alt="Sort" />
                <div className='d-none d-lg-inline'>
                    <span className={styles.sortText}>Sort By</span>
                    {options.find(option => option.value === sorting)?.label} {/* Display selected sorting option */}
                    <Image width={28} height={28} src="/images/down_arrow.svg" className={styles.arrowIcon} alt="V" />
                </div>
            </button>
            {/* Dropdown */}
            {isOpen && (
                <div className={styles.dropdown}>
                    {options.map(option => (
                        <button
                            key={option.value}
                            onClick={() => {
                                selectSorting(option.value); // Set selected sorting option
                                setIsOpen(false); // Close the dropdown
                            }}
                            className={styles.dropdownItem}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SortSelect;
