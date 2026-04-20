import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import useCart from '../hooks/useCart';
import { formatPrice, calcTax } from '../utils/helpers';
import { FiShoppingBag } from 'react-icons/fi';

export default function Cart() {
    const { cartItems, cartTotal } = useCart();
    const tax = calcTax(cartTotal);

    return (
        <div className="container" style={{ padding: '40px 24px' }}>
            <p className="page-subtitle">YOUR SELECTIONS</p>
            <h1 className="page-title">SHOPPING CART</h1>
            <div className="neon-line" />

            {cartItems.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon"><FiShoppingBag /></div>
                    <h3>Your cart is empty</h3>
                    <p style={{ marginBottom: 24 }}>Start exploring products</p>
                    <Link to="/products"><button className="btn-primary">BROWSE PRODUCTS</button></Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32, alignItems: 'start' }}>
                    <div>
                        {cartItems.map((item) => <CartItem key={item.id} item={item} />)}
                    </div>
                    <div style={styles.summary}>
                        <p style={styles.summaryTitle}>ORDER SUMMARY</p>
                        <div style={styles.summaryRow}><span>Subtotal</span><span>{formatPrice(cartTotal)}</span></div>
                        <div style={styles.summaryRow}><span>Tax (8%)</span><span>{formatPrice(tax)}</span></div>
                        <div style={styles.summaryRow}><span>Shipping</span><span style={{ color: 'var(--neon-green)' }}>FREE</span></div>
                        <div className="divider" style={{ margin: '16px 0' }} />
                        <div style={{ ...styles.summaryRow, color: 'var(--text-primary)', fontFamily: 'Orbitron, monospace', fontSize: 18 }}>
                            <span>TOTAL</span><span style={{ color: 'var(--cyan)' }}>{formatPrice(cartTotal + tax)}</span>
                        </div>
                        <Link to="/checkout" style={{ display: 'block', marginTop: 24 }}>
                            <button className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: 15 }}>PROCEED TO CHECKOUT</button>
                        </Link>
                        <Link to="/products" style={{ display: 'block', marginTop: 12 }}>
                            <button className="btn-secondary" style={{ width: '100%', padding: '12px', fontSize: 13 }}>CONTINUE SHOPPING</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    summary: { background: 'var(--bg-card)', border: '1px solid var(--border)', padding: 24, position: 'sticky', top: 90 },
    summaryTitle: { fontFamily: 'Orbitron, monospace', fontSize: 13, color: 'var(--cyan)', letterSpacing: 3, marginBottom: 20 },
    summaryRow: { display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: 14, marginBottom: 12 },
};