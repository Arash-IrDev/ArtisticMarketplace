import { useContext, useState, useEffect, useRef } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import styles from './SortSelect.module.css'

const SortSelect: React.FC = () => {
    const { sorting, selectSorting } = useContext(ProductContext);
    const [isOpen, setIsOpen] = useState(false);
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
                <img src="/images/sort.svg" alt="Sort" />
                <div className='d-none d-lg-inline'>
                    <span className={styles.sortText}>Sort By</span>
                    {options.find(option => option.value === sorting)?.label}
                    <img src="/images/down_arrow.svg" className={styles.arrowIcon} />
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
