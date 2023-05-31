import { useContext, useState } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import styles from './SortSelect.module.css'

const SortSelect: React.FC = () => {
    const { sorting, selectSorting } = useContext(ProductContext);
    const [isOpen, setIsOpen] = useState(false);
    const options = [
        { value: "priceLowHigh", label: "Price (Low to High)" },
        { value: "priceHighLow", label: "Price (High to Low)" },
        { value: "registrationNewOld", label: "Registration (New to Old)" },
        { value: "registrationOldNew", label: "Registration (Old to New)" }
    ]

    return (
        <div className={styles.dropDownContainer} onBlur={() => setIsOpen(false)}>
            <button onClick={() => setIsOpen(!isOpen)} className={styles.sortButton}>
                <img src="images/sort.svg" alt="Sort" />
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
