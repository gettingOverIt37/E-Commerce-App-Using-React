import React from 'react';
import { Link } from 'react-router-dom';
import useWishlist from '../hooks/useWishlist';
import useCart from '../hooks/useCart';
import { formatPrice, truncate } from '../utils/helpers';
import { FiTrash2, FiShoppingCart, FiHeart } from 'react-icons/fi';

export default function Wishlist() {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    return (
        <div className="container" style={{ padding: '40px 24px' }}>
            <p className="page-subtitle">SAVED ITEMS</p>
            <h1 className="page-title">WISHLIST</h1>
            <div className="neon-line" />

            {wishlist.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon"><FiHeart /></div>
                    <h3>Your wishlist is empty</h3>
                    <p style={{ marginBottom: 24 }}>Save items you love</p>
                    <Link to="/products"><button className="btn-primary">EXPLORE PRODUCTS</button></Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                    {wishlist.map((item) => (
                        <div key={item.id} style={styles.card}>
                            <Link to={`/products/${item.id}`}>
                                <div style={styles.imgWrap}>
                                    <img src={item.image} alt={item.title} style={styles.img} />
                                </div>
                            </Link>
                            <div style={styles.body}>
                                <p style={styles.title}>{truncate(item.title, 50)}</p>
                                <p style={styles.price}>{formatPrice(item.price)}</p>
                                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                                    <button className="btn-primary" style={{ flex: 1, padding: '8px', fontSize: 12 }}
                                        onClick={() => addToCart(item)}>
                                        <FiShoppingCart style={{ marginRight: 4 }} /> ADD TO CART
                                    </button>
                                    <button style={styles.removeBtn} onClick={() => removeFromWishlist(item.id)}>
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const styles = {
    card: { background: 'var(--bg-card)', border: '1px solid var(--border)', overflow: 'hidden' },
    imgWrap: { background: '#fff', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    img: { maxHeight: 150, maxWidth: '80%', objectFit: 'contain' },
    body: { padding: 16 },
    title: { fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 },
    price: { fontFamily: 'Orbitron, monospace', fontSize: 15, color: 'var(--cyan)', fontWeight: 700 },
    removeBtn: { background: 'none', border: '1px solid rgba(255,0,110,0.4)', color: 'var(--neon-pink)', padding: '8px 12px', cursor: 'pointer', fontSize: 15 },
};