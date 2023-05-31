import React from 'react';
import styles from './Pagination.module.css';

type Props = {
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void,
}

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav aria-label="Page navigation">
            <ul className={`px-0 text-center ${styles.pagination}`}>
                <li className={`${styles.pageItem} ${currentPage === 1 ? styles.disabled : ''}`}
                    onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}>
                    <span className={styles.pageLink}>&lt;</span>
                </li>
                {pages.map(page => (
                    <li key={page} className={`${styles.pageItem} ${page === currentPage ? styles.active : ''}`}
                        onClick={() => onPageChange(page)}>
                        <span className={styles.pageLink}>{page}</span>
                    </li>
                ))}
                <li className={`${styles.pageItem} ${currentPage === totalPages ? styles.disabled : ''}`}
                    onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}>
                    <span className={styles.pageLink}>&gt;</span>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
