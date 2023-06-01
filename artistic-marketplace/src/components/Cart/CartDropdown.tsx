// CartDropdown component

import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import styles from './CartDropdown.module.css';
import Image from 'next/image';

type CartDropdownProps = {
    onClose: () => void; // This function will be called when the close button is clicked
}

const CartDropdown: React.FC<CartDropdownProps> = ({ onClose }) => {
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        // handle the case where the context is not provided
        return null;
    }

    const { cartItems, clearCart } = cartContext;

    return (
        <div className={`${styles.dropdown} col-12 col-md-6 col-lg-3`}>
            <Image className={`${styles.closeBtn} handCursor`} onClick={onClose} src="/images/x.svg" alt="Close" />
            {cartItems.map((item, index) => (
                <div key={index} className={styles.dropdownItem}>
                    <div className='row'>
                        <div className='col-9'>
                            <span>{item.name}</span><br />
                            <span>${item.price}</span>
                        </div>
                        <div className={`${styles.itemImage} col-3`} >
                            <Image src={item.image.src} alt={item.image.alt} />
                        </div>
                    </div>
                </div>
            ))}
            {cartItems.length > 0 && (
                <button className={styles.clearButton} onClick={() => clearCart()}>Clear Cart</button>
            )}
            {cartItems.length < 1 && (
                <p className='text-center'>No product in the cart yet!</p>
            )}
        </div>
    );
};

export default CartDropdown;
