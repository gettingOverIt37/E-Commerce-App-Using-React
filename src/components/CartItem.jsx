import React from 'react';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { formatPrice } from '../utils/helpers';
import useCart from '../hooks/useCart';

export default function CartItem({ item }) {
    const { removeFromCart, updateQuantity } = useCart();

    return (
        <div style={styles.row}>
            <img src={item.image} alt={item.title} style={styles.img} />
            <div style={styles.info}>
                <p style={styles.title}>{item.title}</p>
                <p style={styles.price}>{formatPrice(item.price)}</p>
            </div>
            <div style={styles.controls}>
                <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity - 1)}><FiMinus /></button>
                <span style={styles.qty}>{item.quantity}</span>
                <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity + 1)}><FiPlus /></button>
            </div>
            <p style={styles.subtotal}>{formatPrice(item.price * item.quantity)}</p>
            <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}><FiTrash2 /></button>
        </div>
    );
}

const styles = {
    row: {
        display: 'flex', alignItems: 'center', gap: 16,
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        padding: 16, marginBottom: 12,
    },
    img: { width: 70, height: 70, objectFit: 'contain', background: '#fff', padding: 6 },
    info: { flex: 1 },
    title: { fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 },
    price: { color: 'var(--text-secondary)', fontSize: 13 },
    controls: { display: 'flex', alignItems: 'center', gap: 8 },
    qtyBtn: {
        background: 'var(--border)', border: '1px solid var(--border)',
        color: 'var(--cyan)', width: 28, height: 28, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    qty: { fontFamily: 'Orbitron, monospace', fontSize: 14, minWidth: 24, textAlign: 'center' },
    subtotal: { fontFamily: 'Orbitron, monospace', fontSize: 14, color: 'var(--yellow)', minWidth: 70, textAlign: 'right' },
    removeBtn: {
        background: 'none', border: '1px solid rgba(255,0,110,0.3)',
        color: 'var(--neon-pink)', padding: 8, cursor: 'pointer', fontSize: 16,
    },
};