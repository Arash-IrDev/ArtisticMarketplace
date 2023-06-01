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
            <button onClick={() => setIsOpen(!isOpen)} className={styles.sortButton}>
                <Image src="/images/sort.svg" className={styles.sortIcon} alt="Sort" />
                <div className='d-none d-lg-inline'>
                    <span className={styles.sortText}>Sort By</span>
                    {options.find(option => option.value === sorting)?.label}
                    <Image src="/images/down_arrow.svg" className={styles.arrowIcon} alt="V" />
                </div>
            </button>
            {isOpen && (
                <div className={styles.dropdown}>
                    {options.map(option => (
                        <button
                            key={option.value}
                            onClick={() => {
                                selectSorting(option.value)
                                setIsOpen(false)
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
