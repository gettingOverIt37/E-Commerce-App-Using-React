import React, { useState, useMemo } from 'react';
import Filters from '../components/Filters';
import ProductGrid from '../components/ProductGrid';
import SearchBar from '../components/SearchBar';
import useProducts from '../hooks/useProducts';
import useDebounce from '../hooks/useDebounce';

export default function Products() {
    const { products, categories, loading, error } = useProducts();
    const [searchVal, setSearchVal] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [priceRange, setPriceRange] = useState({ label: 'All Prices', min: 0, max: Infinity });
    const [sortBy, setSortBy] = useState('default');
    const [activeTab, setActiveTab] = useState('all');

    const debouncedSearch = useDebounce(searchVal, 400);

    const filtered = useMemo(() => {
        let list = [...products];
        const cat = activeTab !== 'all' ? activeTab : activeCategory;
        if (cat !== 'all') list = list.filter((p) =>
            p.category?.toLowerCase() === cat?.toLowerCase() ||
            p.category?.toLowerCase().replace(/\s+/g, '-') === cat?.toLowerCase()
        );
        if (debouncedSearch) list = list.filter((p) => p.title.toLowerCase().includes(debouncedSearch.toLowerCase()));
        list = list.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);
        if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
        else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
        else if (sortBy === 'rating') list.sort((a, b) => b.rating?.rate - a.rating?.rate);
        return list;
    }, [products, activeCategory, activeTab, debouncedSearch, priceRange, sortBy]);

    if (error) return <div className="empty-state"><h3>⚠ {error}</h3></div>;

    return (
        <div className="container" style={{ padding: '40px 24px' }}>
            <p className="page-subtitle">EXPLORE THE COLLECTION</p>
            <h1 className="page-title">ALL PRODUCTS</h1>
            <div className="neon-line" />

            {/* TABS */}
            <div style={styles.tabs}>
                {categories.map((cat) => (
                    <button key={cat} onClick={() => { setActiveTab(cat); setActiveCategory(cat); }}
                        style={{ ...styles.tab, ...(activeTab === cat ? styles.tabActive : {}) }}>
                        {cat.toUpperCase()}
                    </button>
                ))}
            </div>

            <div style={{ marginBottom: 24 }}>
                <SearchBar value={searchVal} onChange={setSearchVal} />
            </div>

            <div style={styles.layout}>
                <aside style={styles.sidebar}>
                    <Filters categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory}
                        priceRange={priceRange} setPriceRange={setPriceRange} sortBy={sortBy} setSortBy={setSortBy} />
                </aside>
                <div style={{ flex: 1 }}>
                    {loading ? (
                        <div className="loading-screen"><div className="loader" /><p className="loading-text">LOADING PRODUCTS...</p></div>
                    ) : (
                        <>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 16 }}>{filtered.length} products found</p>
                            <ProductGrid products={filtered} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

const styles = {
    tabs: { display: 'flex', gap: 0, marginBottom: 32, flexWrap: 'wrap', borderBottom: '1px solid var(--border)' },
    tab: {
        background: 'none', border: 'none', color: 'var(--text-secondary)',
        fontFamily: 'Rajdhani, sans-serif', fontSize: 13, fontWeight: 600,
        letterSpacing: 2, padding: '12px 20px', cursor: 'pointer',
        borderBottom: '2px solid transparent', marginBottom: -1,
        transition: 'all 0.3s',
    },
    tabActive: { color: 'var(--cyan)', borderBottom: '2px solid var(--cyan)' },
    layout: { display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24, alignItems: 'start' },
    sidebar: { position: 'sticky', top: 90 },
};