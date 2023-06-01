import { useRouter } from 'next/router'
import styles from './Breadcrumb.module.css'
import Link from 'next/link';
import React from 'react';


const Breadcrumb: React.FC = () => {
    const router = useRouter();

    const isProductDetailPage = router.pathname.includes('product');

    return (
        <nav aria-label="breadcrumb" className='mt-3 mb-4'>
            <h2>
                <ol className={styles.breadcrumb}>
                    <li>
                        <Link href="/"
                            className={`${styles.breadcrumbItem} ${isProductDetailPage ? styles.breadcrumbItemLink : styles.breadcrumbItemDisabled}`}>
                            Premium Photos
                        </Link>
                    </li>
                    {isProductDetailPage && (
                        <>
                            <li className={styles.breadcrumbSeparator}>/</li>
                            <li className={styles.breadcrumbItemDisabled}>Photo Details</li>
                        </>
                    )}
                </ol>
            </h2>
        </nav>
    );
}

export default Breadcrumb;
