import { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories } from '../services/api';

export default function useProducts() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const [prodRes, catRes] = await Promise.all([fetchProducts(), fetchCategories()]);

                // DummyJSON returns { products: [...] }
                setProducts(prodRes.data.products);

                // DummyJSON returns categories as array of objects with slug
                const catNames = catRes.data.map(c => {
                    if (typeof c === 'object') return c.slug || c.name || c.url?.split('/').pop();
                    return c;
                });
                setCategories(['all', ...catNames]);
            } catch (err) {
                setError('Failed to load products. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return { products, categories, loading, error };
}