// Header component

import React, { useContext, useState } from 'react';
import { CartContext } from '../../contexts/CartContext';
import CartDropdown from '../Cart/CartDropdown';
import styles from './styles.module.css';

const Header = () => {
    const [showCartDropdown, setShowCartDropdown] = useState(false);
    const { cartItems } = useContext(CartContext)!;

    const handleCartClick = () => {
        setShowCartDropdown(!showCartDropdown);
    };

    const totalItemsInCart = cartItems.reduce((total, item) => total + cartItems.length, 0);

    return (
        <div className="my-4">
            <nav className="navbar navbar-expand-lg navbar-light mb-3">
                <div className="container-fluid p-0">
                    <a className="navbar-brand" href="/">
                        <img src="/images/logo.svg" alt="Bejamas Logo" />
                    </a>
                    <div className={`${styles.cartButton} nav-link position-relative`} onClick={handleCartClick}>
                        <img src="/images/cart.svg" alt="Cart Icon" />
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
