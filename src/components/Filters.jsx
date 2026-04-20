import React from 'react';

const PRICE_RANGES = [
    { label: 'All Prices', min: 0, max: Infinity },
    { label: 'Under ₹1,000', min: 0, max: 12 },
    { label: '₹1,000 – ₹5,000', min: 12, max: 60 },
    { label: '₹5,000 – ₹20,000', min: 60, max: 240 },
    { label: 'Over ₹20,000', min: 240, max: Infinity },
];

const SORT_OPTIONS = [
    { value: 'default', label: 'Default' },
    { value: 'price-asc', label: 'Price: Low → High' },
    { value: 'price-desc', label: 'Price: High → Low' },
    { value: 'rating', label: 'Top Rated' },
];

export default function Filters({ categories, activeCategory, setActiveCategory, priceRange, setPriceRange, sortBy, setSortBy }) {
    return (
        <div style={styles.wrapper}>
            <div style={styles.section}>
                <p style={styles.label}>CATEGORY</p>
                {categories.map((cat) => (
                    <button key={cat} onClick={() => setActiveCategory(cat)}
                        style={{ ...styles.catBtn, ...(activeCategory === cat ? styles.catBtnActive : {}) }}>
                        {cat.toUpperCase()}
                    </button>
                ))}
            </div>

            <div style={styles.section}>
                <p style={styles.label}>PRICE RANGE</p>
                {PRICE_RANGES.map((r) => (
                    <button key={r.label} onClick={() => setPriceRange(r)}
                        style={{ ...styles.catBtn, ...(priceRange.label === r.label ? styles.catBtnActive : {}) }}>
                        {r.label}
                    </button>
                ))}
            </div>

            <div style={styles.section}>
                <p style={styles.label}>SORT BY</p>
                {SORT_OPTIONS.map((o) => (
                    <button key={o.value} onClick={() => setSortBy(o.value)}
                        style={{ ...styles.catBtn, ...(sortBy === o.value ? styles.catBtnYellow : {}) }}>
                        {o.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        padding: 20,
        display: 'flex', flexDirection: 'column', gap: 24,
    },
    section: { display: 'flex', flexDirection: 'column', gap: 6 },
    label: {
        fontFamily: 'Orbitron, monospace', fontSize: 10,
        color: 'var(--cyan)', letterSpacing: 3, marginBottom: 8,
    },
    catBtn: {
        background: 'none', border: '1px solid var(--border)',
        color: 'var(--text-secondary)', padding: '8px 12px',
        fontFamily: 'Rajdhani, sans-serif', fontSize: 13,
        fontWeight: 600, letterSpacing: 1,
        textAlign: 'left', cursor: 'pointer',
        transition: 'all 0.2s',
        textTransform: 'capitalize',
    },
    catBtnActive: {
        border: '1px solid var(--cyan)',
        color: 'var(--cyan)',
        background: 'rgba(0,245,255,0.05)',
    },
    catBtnYellow: {
        border: '1px solid var(--yellow)',
        color: 'var(--yellow)',
        background: 'rgba(245,230,66,0.05)',
    },
};