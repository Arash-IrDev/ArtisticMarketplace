import React from 'react';

type Props = {
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void,
}

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                {pages.map(page => (
                    <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(page)}>{page}</button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
