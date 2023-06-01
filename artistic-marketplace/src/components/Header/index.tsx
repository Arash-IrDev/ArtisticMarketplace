/**
 * Header Component
 *
 * This component represents the header of the application. It includes the logo, cart button, and cart dropdown.
 *
 * Usage:
 * <Header />
 */

import React, { useContext, useState } from 'react';
import { CartContext } from '../../contexts/CartContext';
import CartDropdown from '../Cart/CartDropdown';
import styles from './styles.module.css';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
    const [showCartDropdown, setShowCartDropdown] = useState<boolean>(false);
    const { cartItems } = useContext(CartContext)!;

    const handleCartClick = () => {
        setShowCartDropdown(!showCartDropdown);
    };

    const totalItemsInCart = cartItems.length;

    return (
        <div className="my-4">
            <nav className="navbar navbar-expand-lg navbar-light mb-3">
                <div className="container-fluid p-0 position-relative">
                    <Link className="navbar-brand" href="/">
                        <Image width={160} height={25.33} src="/images/logo.svg" className={styles.bejamasLogo} alt="Bejamas Logo" />
                    </Link>
                    <div className={`${styles.cartButton} nav-link`} onClick={handleCartClick}>
                        <Image width={30.72} height={27.304} src="/images/cart.svg" className={styles.cartIcon} alt="Cart Icon" />
                        {totalItemsInCart > 0 && (
                            <div className={styles.cartCountBadge}>
                                {totalItemsInCart}
                            </div>
                        )}
                        {showCartDropdown && <CartDropdown onClose={handleCartClick} />}
                    </div>
                </div>
            </nav>
            <hr />
        </div>
    );
};

export default Header;
