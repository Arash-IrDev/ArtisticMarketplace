/**
 * Breadcrumb Component
 *
 * This component renders a breadcrumb navigation for the website. It displays the navigation path
 * for the current page, including a link to the home page and an optional link to the photo details
 * page if the current page is a product detail page.
 *
 * Usage:
 * <Breadcrumb />
 */

import { useRouter } from 'next/router';
import styles from './Breadcrumb.module.css';
import Link from 'next/link';
import React from 'react';

const Breadcrumb: React.FC = () => {
    const router = useRouter();

    // Check if the current page is a product detail page
    const isProductDetailPage = router.pathname.includes('product');

    return (
        <nav aria-label="breadcrumb" className="mt-3 mb-4">
            <h2>
                <ol className={styles.breadcrumb}>
                    {/* Render the home page breadcrumb item */}
                    <li>
                        <Link
                            href="/"
                            className={`${styles.breadcrumbItem} ${isProductDetailPage
                                    ? styles.breadcrumbItemLink
                                    : styles.breadcrumbItemDisabled
                                }`}
                        >
                            Premium Photos
                        </Link>
                    </li>

                    {/* Render the photo details breadcrumb item if it's a product detail page */}
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
};

export default Breadcrumb;
