import React from 'react';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar({ value, onChange, placeholder = 'Search products...' }) {
    return (
        <div style={styles.wrapper}>
            <FiSearch style={styles.icon} />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                style={styles.input}
            />
        </div>
    );
}

const styles = {
    wrapper: {
        position: 'relative', display: 'flex', alignItems: 'center',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        padding: '10px 16px',
        transition: 'border-color 0.3s',
    },
    icon: { color: 'var(--cyan)', fontSize: 16, marginRight: 10, flexShrink: 0 },
    input: {
        background: 'none', border: 'none', outline: 'none',
        color: 'var(--text-primary)', fontFamily: 'Rajdhani, sans-serif',
        fontSize: 15, width: '100%',
    },
};