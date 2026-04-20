import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products }) {
    if (!products.length) {
        return (
            <div className="empty-state">
                <div className="empty-icon">📦</div>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search</p>
            </div>
        );
    }

    return (
        <div style={styles.grid}>
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
    );
}

const styles = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 20,
    },
};