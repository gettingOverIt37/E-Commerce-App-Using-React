import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import useCart from '../hooks/useCart';
import { formatPrice } from '../utils/helpers';
import { FiStar, FiShoppingCart, FiHeart, FiArrowLeft } from 'react-icons/fi';

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, addToWishlist } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProductById(id).then((res) => { setProduct(res.data); setLoading(false); });
    }, [id]);

    if (loading) return <div className="loading-screen"><div className="loader" /><p className="loading-text">LOADING...</p></div>;
    if (!product) return <div className="empty-state"><h3>Product not found</h3></div>;

    return (
        <div className="container" style={{ padding: '40px 24px' }}>
            <button onClick={() => navigate(-1)} style={styles.back}><FiArrowLeft /> BACK</button>

            <div style={styles.grid}>
                <div style={styles.imgPanel}>
                    <img src={product.image} alt={product.title} style={styles.img} />
                </div>
                <div style={styles.info}>
                    <span style={styles.catBadge}>{product.category}</span>
                    <h1 style={styles.title}>{product.title}</h1>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '16px 0' }}>
                        <FiStar style={{ color: 'var(--yellow)', fill: 'var(--yellow)' }} />
                        <span style={{ color: 'var(--yellow)', fontWeight: 700 }}>{product.rating?.rate}</span>
                        <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>({product.rating?.count} reviews)</span>
                    </div>

                    <p style={styles.price}>{formatPrice(product.price)}</p>
                    <div className="divider" />
                    <p style={styles.desc}>{product.description}</p>
                    <div className="divider" />

                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                        <button className="btn-primary" style={{ padding: '14px 32px', fontSize: 15 }}
                            onClick={() => addToCart(product)}>
                            <FiShoppingCart style={{ marginRight: 8 }} /> ADD TO CART
                        </button>
                        <button className="btn-secondary" style={{ padding: '14px 32px', fontSize: 15 }}
                            onClick={() => addToWishlist(product)}>
                            <FiHeart style={{ marginRight: 8 }} /> WISHLIST
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    back: { background: 'none', border: '1px solid var(--border)', color: 'var(--text-secondary)', padding: '8px 16px', cursor: 'pointer', fontFamily: 'Rajdhani, sans-serif', fontSize: 13, letterSpacing: 2, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' },
    imgPanel: { background: '#fff', padding: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 },
    img: { maxWidth: '100%', maxHeight: 350, objectFit: 'contain' },
    info: {},
    catBadge: { background: 'rgba(0,245,255,0.1)', border: '1px solid var(--cyan)', color: 'var(--cyan)', fontSize: 11, padding: '4px 12px', letterSpacing: 2, textTransform: 'uppercase' },
    title: { fontFamily: 'Orbitron, monospace', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: 16, lineHeight: 1.4 },
    price: { fontFamily: 'Orbitron, monospace', fontSize: '2rem', fontWeight: 900, color: 'var(--cyan)' },
    desc: { color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 15 },
};