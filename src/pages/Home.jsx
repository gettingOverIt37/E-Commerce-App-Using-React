import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import { FiArrowRight, FiZap } from 'react-icons/fi';

export default function Home() {
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts().then((res) => {
            setFeatured(res.data.products.slice(0, 4));
            setLoading(false);
        });
    }, []);

    return (
        <div>
            {/* HERO */}
            <section style={styles.hero}>
                <div style={styles.heroContent}>
                    <p style={styles.heroEyebrow}><FiZap style={{ color: 'var(--cyan)' }} /> NEXT-GEN SHOPPING</p>
                    <h1 style={styles.heroTitle}>DISCOVER<br /><span style={{ color: 'var(--cyan)' }}>PREMIUM</span><br />PRODUCTS</h1>
                    <p style={styles.heroSub}>Explore thousands of curated products with cutting-edge style.</p>
                    <div style={{ display: 'flex', gap: 16, marginTop: 32 }}>
                        <Link to="/products"><button className="btn-primary" style={{ padding: '14px 32px', fontSize: 15 }}>SHOP NOW <FiArrowRight /></button></Link>
                        <Link to="/wishlist"><button className="btn-secondary" style={{ padding: '14px 32px', fontSize: 15 }}>WISHLIST</button></Link>
                    </div>
                </div>
                <div style={styles.heroDeco}>
                    <div style={styles.decoCircle} />
                    <div style={styles.decoCircle2} />
                </div>
            </section>

            {/* STATS */}
            <section style={styles.statsRow}>
                {[['20+', 'Categories'], ['500+', 'Products'], ['50K+', 'Customers'], ['4.8★', 'Rating']].map(([val, label]) => (
                    <div key={label} style={styles.statItem}>
                        <span style={styles.statVal}>{val}</span>
                        <span style={styles.statLabel}>{label}</span>
                    </div>
                ))}
            </section>

            {/* FEATURED */}
            <section className="container" style={{ padding: '60px 24px' }}>
                <p className="page-subtitle">HANDPICKED FOR YOU</p>
                <h2 className="page-title">FEATURED PRODUCTS</h2>
                <div className="neon-line" />
                {loading ? (
                    <div className="loading-screen"><div className="loader" /><p className="loading-text">LOADING...</p></div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
                        {featured.map((p) => <ProductCard key={p.id} product={p} />)}
                    </div>
                )}
                <div style={{ textAlign: 'center', marginTop: 48 }}>
                    <Link to="/products"><button className="btn-secondary" style={{ padding: '14px 40px', fontSize: 15 }}>VIEW ALL PRODUCTS <FiArrowRight /></button></Link>
                </div>
            </section>
        </div>
    );
}

const styles = {
    hero: {
        minHeight: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center',
        padding: '80px 24px', maxWidth: 1400, margin: '0 auto', position: 'relative', overflow: 'hidden',
    },
    heroContent: { maxWidth: 600, zIndex: 2 },
    heroEyebrow: { display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 24 },
    heroTitle: { fontFamily: 'Orbitron, monospace', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: 2, marginBottom: 24 },
    heroSub: { color: 'var(--text-secondary)', fontSize: 17, lineHeight: 1.7, maxWidth: 440 },
    heroDeco: { position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1 },
    decoCircle: { width: 500, height: 500, borderRadius: '50%', border: '1px solid rgba(0,245,255,0.08)', position: 'absolute', right: -200, top: -250 },
    decoCircle2: { width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(245,230,66,0.06)', position: 'absolute', right: -50, top: -150 },
    statsRow: {
        display: 'flex', justifyContent: 'center', gap: 0,
        background: 'var(--bg-card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
    },
    statItem: { flex: 1, maxWidth: 200, padding: '32px 24px', textAlign: 'center', borderRight: '1px solid var(--border)' },
    statVal: { fontFamily: 'Orbitron, monospace', fontSize: 28, fontWeight: 900, color: 'var(--cyan)', display: 'block' },
    statLabel: { color: 'var(--text-secondary)', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginTop: 4, display: 'block' },
};