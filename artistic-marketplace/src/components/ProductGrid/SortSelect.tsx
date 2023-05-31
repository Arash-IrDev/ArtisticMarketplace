import { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import styles from './SortSelect.module.css'

const SortSelect: React.FC = () => {
    const { sorting, selectSorting } = useContext(ProductContext);

    return (
        <div className={styles.sortContainer}>
            <img src="images/sort.svg" alt="Sort" />
            <span className={styles.sortText}>Sort By</span>
            <select value={sorting} onChange={(e) => selectSorting(e.target.value)} className={styles.sortSelect}>
                <option value="priceLowHigh">Price (Low to High)</option>
                <option value="priceHighLow">Price (High to Low)</option>
                <option value="registrationNewOld">Registration (New to Old)</option>
                <option value="registrationOldNew">Registration (Old to New)</option>
            </select>
        </div>
    );
}

export default SortSelect;
