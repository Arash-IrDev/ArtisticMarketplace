// CartDropdown component

import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import styles from './CartDropdown.module.css';

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
        <div className={styles.dropdown}>
            <img className={`${styles.closeBtn} handCursor`} onClick={onClose} src="/images/x.svg" alt="Close" />
            {cartItems.map((item, index) => (
                <div key={index} className={styles.dropdownItem}>
                    <div className='row'>
                        <div className='col-9'>
                            <span>{item.name}</span><br />
                            <span>${item.price}</span>
                        </div>
                        <div className={`${styles.itemImage} col-3`} >
                            <img src={item.image.src} alt={item.image.alt} />
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
