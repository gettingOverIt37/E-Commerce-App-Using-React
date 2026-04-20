const USD_TO_INR = 84;

export const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price * USD_TO_INR);
export const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - (half ? 1 : 0));
};

export const truncate = (str, n) =>
    str.length > n ? str.slice(0, n) + '...' : str;

export const calcTax = (subtotal) => subtotal * 0.08;