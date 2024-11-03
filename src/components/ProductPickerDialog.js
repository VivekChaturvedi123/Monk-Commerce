import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/apiService';

const ProductPickerDialog = ({ onClose, onSelect }) => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        fetchProducts(search, page).then((data) => setProducts((prev) => [...prev, ...data]));
    }, [search, page]);

    const handleSelect = (product) => {
        setSelectedProducts((prev) => [...prev, product]);
    };

    const handleAdd = () => {
        onSelect(selectedProducts);
        onClose();
    };

    return (
        <div className="product-picker-dialog">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for products"
            />
            <div className="product-list">
                {products.map((product) => (
                    <div key={product.id} onClick={() => handleSelect(product)}>
                        {product.title}
                    </div>
                ))}
            </div>
            <button onClick={handleAdd}>Add</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default ProductPickerDialog;
