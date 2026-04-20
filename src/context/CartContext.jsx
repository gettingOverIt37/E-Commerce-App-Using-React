import React, { createContext, useState } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const exists = prev.find((i) => i.id === product.id);
            if (exists) {
                toast.info(`${product.title.slice(0, 20)}... quantity updated`);
                return prev.map((i) =>
                    i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            toast.success(`Added to cart!`);
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((i) => i.id !== id));
        toast.error('Removed from cart');
    };

    const updateQuantity = (id, qty) => {
        if (qty < 1) return removeFromCart(id);
        setCartItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
        );
    };

    const clearCart = () => setCartItems([]);

    const addToWishlist = (product) => {
        if (wishlist.find((i) => i.id === product.id)) {
            toast.info('Already in wishlist!');
            return;
        }
        setWishlist((prev) => [...prev, product]);
        toast.success('Added to wishlist!');
    };

    const removeFromWishlist = (id) => {
        setWishlist((prev) => prev.filter((i) => i.id !== id));
        toast.error('Removed from wishlist');
    };

    const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems, addToCart, removeFromCart, updateQuantity, clearCart,
                wishlist, addToWishlist, removeFromWishlist,
                cartTotal, cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}