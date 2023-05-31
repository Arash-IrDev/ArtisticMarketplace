import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import styles from './CartDropdown.module.css';

const CartDropdown = () => {
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        // handle the case where the context is not provided
        return null;
    }

    const { cartItems, clearCart } = cartContext;

    return (
        <div className={styles.dropdown}>
            <img className={`${styles.closeBtn} handCursor`} onClick={() => clearCart()} src="images/x.svg" alt="Close" />
            {cartItems.map((item, index) => (
                <div key={index} className={styles.cartItem}>
                    <img src={item.image.src} alt={item.image.alt} />
                    <div>
                        <p>{item.name}</p>
                        <p>${item.price}</p>
                    </div>
                </div>
            ))}
            <button className={styles.clearButton} onClick={() => clearCart()}>Clear Cart</button>
        </div>
    );
};

export default CartDropdown;
