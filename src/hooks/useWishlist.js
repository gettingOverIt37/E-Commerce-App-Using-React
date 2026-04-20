import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function useWishlist() {
    const { wishlist, addToWishlist, removeFromWishlist } = useContext(CartContext);
    return { wishlist, addToWishlist, removeFromWishlist };
}