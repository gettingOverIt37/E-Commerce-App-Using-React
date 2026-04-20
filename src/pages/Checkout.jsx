import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useCart from '../hooks/useCart';
import { formatPrice, calcTax } from '../utils/helpers';
import { toast } from 'react-toastify';
import { FiCheckCircle } from 'react-icons/fi';

export default function Checkout() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [placed, setPlaced] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const tax = calcTax(cartTotal);

    const onSubmit = () => {
        setPlaced(true);
        clearCart();
        toast.success('Order placed successfully! 🎉');
        setTimeout(() => navigate('/'), 3000);
    };

    if (placed) {
        return (
            <div className="empty-state" style={{ paddingTop: 120 }}>
                <FiCheckCircle style={{ fontSize: 80, color: 'var(--neon-green)', marginBottom: 24 }} />
                <h3 style={{ color: 'var(--neon-green)', fontFamily: 'Orbitron, monospace' }}>ORDER CONFIRMED!</h3>
                <p style={{ marginTop: 8 }}>Redirecting you home...</p>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="empty-state">
                <h3>Nothing to checkout</h3>
                <p style={{ marginBottom: 24 }}>Add items to your cart first</p>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '40px 24px' }}>
            <p className="page-subtitle">FINAL STEP</p>
            <h1 className="page-title">CHECKOUT</h1>
            <div className="neon-line" />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32, alignItems: 'start' }}>
                {/* FORM */}
                <div>
                    <p style={styles.sectionTitle}>SHIPPING INFORMATION</p>
                    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {[
                            { name: 'fullName', label: 'Full Name', placeholder: 'John Doe' },
                            { name: 'email', label: 'Email', placeholder: 'john@example.com' },
                            { name: 'address', label: 'Address', placeholder: '123 Main St' },
                            { name: 'city', label: 'City', placeholder: 'New York' },
                            { name: 'zip', label: 'ZIP Code', placeholder: '10001' },
                        ].map(({ name, label, placeholder }) => (
                            <div key={name}>
                                <label style={styles.label}>{label}</label>
                                <input {...register(name, { required: `${label} is required` })}
                                    placeholder={placeholder} style={styles.input} />
                                {errors[name] && <p style={styles.error}>{errors[name].message}</p>}
                            </div>
                        ))}

                        <p style={{ ...styles.sectionTitle, marginTop: 16 }}>PAYMENT</p>
                        <div>
                            <label style={styles.label}>Card Number</label>
                            <input {...register('card', { required: 'Card number is required', pattern: { value: /\d{16}/, message: 'Enter 16-digit card number' } })}
                                placeholder="1234 5678 9012 3456" style={styles.input} maxLength={16} />
                            {errors.card && <p style={styles.error}>{errors.card.message}</p>}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <div>
                                <label style={styles.label}>Expiry</label>
                                <input {...register('expiry', { required: true })} placeholder="MM/YY" style={styles.input} />
                            </div>
                            <div>
                                <label style={styles.label}>CVV</label>
                                <input {...register('cvv', { required: true })} placeholder="123" style={styles.input} maxLength={3} />
                            </div>
                        </div>

                        <button type="submit" className="btn-yellow" style={{ padding: '16px', fontSize: 16, marginTop: 8 }}>
                            PLACE ORDER — {formatPrice(cartTotal + tax)}
                        </button>
                    </form>
                </div>

                {/* ORDER SUMMARY */}
                <div style={styles.summary}>
                    <p style={styles.sectionTitle}>ORDER SUMMARY</p>
                    {cartItems.map((item) => (
                        <div key={item.id} style={styles.orderItem}>
                            <span style={{ flex: 1, fontSize: 13 }}>{item.title.slice(0, 30)}... ×{item.quantity}</span>
                            <span style={{ color: 'var(--cyan)', fontFamily: 'Orbitron, monospace', fontSize: 13 }}>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                    ))}
                    <div className="divider" style={{ margin: '16px 0' }} />
                    <div style={styles.summaryRow}><span>Subtotal</span><span>{formatPrice(cartTotal)}</span></div>
                    <div style={styles.summaryRow}><span>Tax (8%)</span><span>{formatPrice(tax)}</span></div>
                    <div style={styles.summaryRow}><span>Shipping</span><span style={{ color: 'var(--neon-green)' }}>FREE</span></div>
                    <div className="divider" style={{ margin: '16px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Orbitron, monospace', fontSize: 18 }}>
                        <span>TOTAL</span><span style={{ color: 'var(--yellow)' }}>{formatPrice(cartTotal + tax)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    sectionTitle: { fontFamily: 'Orbitron, monospace', fontSize: 12, color: 'var(--cyan)', letterSpacing: 3, marginBottom: 16 },
    label: { display: 'block', fontSize: 12, color: 'var(--text-secondary)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 },
    input: {
        width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border)',
        color: 'var(--text-primary)', padding: '12px 16px',
        fontFamily: 'Rajdhani, sans-serif', fontSize: 15, outline: 'none',
    },
    error: { color: 'var(--neon-pink)', fontSize: 12, marginTop: 4 },
    summary: { background: 'var(--bg-card)', border: '1px solid var(--border)', padding: 24, position: 'sticky', top: 90 },
    orderItem: { display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' },
    summaryRow: { display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: 14, marginBottom: 8 },
};