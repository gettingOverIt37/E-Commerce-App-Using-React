import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiMenu, FiX, FiZap } from 'react-icons/fi';
import useCart from '../hooks/useCart';

export default function Navbar() {
    const { cartCount, wishlist } = useCart();
    const [open, setOpen] = useState(false);
    const loc = useLocation();

    const links = [
        { to: '/', label: 'Home' },
        { to: '/products', label: 'Products' },
        { to: '/wishlist', label: 'Wishlist' },
    ];

    return (
        <nav style={styles.nav}>
            <div style={styles.inner}>
                <Link to="/" style={styles.logo}>
                    <FiZap style={{ color: 'var(--cyan)', fontSize: 22 }} />
                    <span style={styles.logoText}>True<span style={{ color: 'var(--yellow)' }}>Trends</span></span>
                </Link>

                <div style={styles.links}>
                    {links.map((l) => (
                        <Link key={l.to} to={l.to} style={{
                            ...styles.link,
                            color: loc.pathname === l.to ? 'var(--cyan)' : 'var(--text-secondary)',
                            borderBottom: loc.pathname === l.to ? '2px solid var(--cyan)' : '2px solid transparent',
                        }}>{l.label}</Link>
                    ))}
                </div>

                <div style={styles.actions}>
                    <Link to="/wishlist" style={styles.iconBtn}>
                        <FiHeart />
                        {wishlist.length > 0 && <span style={{ ...styles.badge, background: 'var(--neon-pink)' }}>{wishlist.length}</span>}
                    </Link>
                    <Link to="/cart" style={styles.iconBtn}>
                        <FiShoppingCart />
                        {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
                    </Link>
                    <button style={{ ...styles.iconBtn, background: 'none', border: 'none', cursor: 'pointer', display: 'none' }}
                        onClick={() => setOpen(!open)} className="menu-btn">
                        {open ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: 'rgba(5,5,8,0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,245,255,0.1)',
        height: 70,
    },
    inner: {
        maxWidth: 1400, margin: '0 auto', padding: '0 24px',
        height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    },
    logo: {
        display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none',
    },
    logoText: {
        fontFamily: 'Orbitron, monospace', fontSize: 18, fontWeight: 900,
        color: 'var(--text-primary)', letterSpacing: 2,
    },
    links: { display: 'flex', gap: 32 },
    link: {
        textDecoration: 'none', fontFamily: 'Rajdhani, sans-serif',
        fontSize: 14, fontWeight: 600, letterSpacing: 2,
        textTransform: 'uppercase', paddingBottom: 4,
        transition: 'all 0.3s',
    },
    actions: { display: 'flex', alignItems: 'center', gap: 16 },
    iconBtn: {
        position: 'relative', color: 'var(--text-primary)', fontSize: 20,
        textDecoration: 'none', display: 'flex', alignItems: 'center',
        transition: 'color 0.3s',
    },
    badge: {
        position: 'absolute', top: -8, right: -8,
        background: 'var(--cyan)', color: '#000',
        fontSize: 10, fontWeight: 700, width: 18, height: 18,
        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
};