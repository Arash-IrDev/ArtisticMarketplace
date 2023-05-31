import { useRouter } from 'next/router'
import styles from './Breadcrumb.module.css'

const Breadcrumb: React.FC = () => {
    const router = useRouter();

    const isProductDetailPage = router.pathname.includes('product');

    return (
        <nav aria-label="breadcrumb" className='mt-3 mb-4'>
            <h2>
                <ol className={styles.breadcrumb}>
                    <li>
                        <a href="/"
                            className={`${styles.breadcrumbItem} ${isProductDetailPage ? styles.breadcrumbItemLink : styles.breadcrumbItemDisabled}`}>
                            Premium Photos
                        </a>
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
