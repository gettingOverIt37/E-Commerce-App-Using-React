import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { formatPrice, truncate } from '../utils/helpers';
import useCart from '../hooks/useCart';

export default function ProductCard({ product }) {
    const { addToCart, addToWishlist, wishlist } = useCart();
    const inWishlist = wishlist.some((i) => i.id === product.id);

    return (
        <div style={styles.card}>
            <div style={styles.imageWrap}>
                <Link to={`/products/${product.id}`}>
                    <img src={product.thumbnail} alt={product.title} style={styles.image} />
                </Link>
                <button onClick={() => addToWishlist(product)} style={{ ...styles.wishBtn, color: inWishlist ? 'var(--neon-pink)' : 'var(--text-secondary)' }}>
                    <FiHeart fill={inWishlist ? 'var(--neon-pink)' : 'none'} />
                </button>
                <span style={styles.categoryBadge}>{product.category}</span>
            </div>

            <div style={styles.body}>
                <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                    <p style={styles.title}>{truncate(product.title, 52)}</p>
                </Link>

                <div style={styles.ratingRow}>
                    <FiStar style={{ color: 'var(--yellow)', fill: 'var(--yellow)', fontSize: 12 }} />
                    <span style={{ color: 'var(--yellow)', fontSize: 13, marginLeft: 4 }}>{product.rating}</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: 12, marginLeft: 4 }}>({product.stock} in stock)</span>
                </div>

                <div style={styles.footer}>
                    <span style={styles.price}>{formatPrice(product.price)}</span>
                    <button className="btn-primary" style={{ padding: '8px 16px', fontSize: 12 }}
                        onClick={() => addToCart(product)}>
                        <FiShoppingCart style={{ marginRight: 4 }} /> ADD
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    card: {
        background: 'var(--gradient-card)',
        border: '1px solid var(--border)',
        transition: 'all 0.3s ease',
        cursor: 'default',
        overflow: 'hidden',
    },
    imageWrap: {
        position: 'relative', background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: 200, overflow: 'hidden',
    },
    image: { maxHeight: 170, maxWidth: '85%', objectFit: 'contain', transition: 'transform 0.4s' },
    wishBtn: {
        position: 'absolute', top: 8, right: 8,
        background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border)',
        borderRadius: '50%', width: 32, height: 32,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', fontSize: 14, transition: 'all 0.3s',
    },
    categoryBadge: {
        position: 'absolute', bottom: 8, left: 8,
        background: 'rgba(0,0,0,0.7)', border: '1px solid var(--border)',
        color: 'var(--cyan)', fontSize: 10, padding: '3px 8px',
        letterSpacing: 1, textTransform: 'uppercase',
    },
    body: { padding: '14px 16px' },
    title: { color: 'var(--text-primary)', fontSize: 14, fontWeight: 600, marginBottom: 8, lineHeight: 1.4 },
    ratingRow: { display: 'flex', alignItems: 'center', marginBottom: 12 },
    footer: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    price: {
        fontFamily: 'Orbitron, monospace', fontSize: 16,
        fontWeight: 700, color: 'var(--cyan)',
    },
};