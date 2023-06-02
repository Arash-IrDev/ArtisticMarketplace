import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../db/models/ProductType';

/**
 * Interface for the Cart Context value.
 */
interface CartContextValue {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

/**
 * Interface for the Cart Provider props.
 */
interface CartProviderProps {
  children: ReactNode;
}

/**
 * Create the Cart Context with default value as null.
 */
export const CartContext = createContext<CartContextValue | null>(null);

/**
 * Cart Provider component that manages the state and logic for the Cart Context.
 */
export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Fetch items from local storage when component is mounted
  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  // Save items to local storage when cartItems state changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  /**
   * Add a product to the cart.
   */
  const addToCart = (product: Product) => {
    setCartItems(prevItems => [...prevItems, product]);
  };

  /**
   * Remove a product from the cart by productId.
   */
  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
  };

  /**
   * Clear the cart.
   */
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems'); // Clear cart items from localStorage
  };

  /**
   * Get the total number of items in the cart.
   */
  const getCartTotal = () => {
    return cartItems.length;
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};
