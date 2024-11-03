import React, { useState, useEffect, useCallback } from 'react';
import Dialog from '../ui/Dialog.js';
import debounce from 'lodash/debounce';

const ProductPicker = ({ onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const debouncedSearch = useCallback(
    debounce(async (term) => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/search?search=${term}&page=1&limit=10`, 
          {
            headers: {
              'x-api-key': '72njgfa948d9aS7gs5'
            }
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }

        setPage(1);
        setHasMore(data.length === 10);
      } catch (error) {
        console.error('Error searching products:', error);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );
  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/search?search=${searchTerm}&page=${page}&limit=10`
      );
      const data = await response.json();
      
      if (data.length < 10) {
        setHasMore(false);
      }
      
      setProducts(prevProducts => [...prevProducts, ...data]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error loading more products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setProducts([]);
    setPage(0);
    setHasMore(true);
    debouncedSearch(term);
  };

  const handleSelect = (product) => {
    setSelectedProducts(prev =>
      prev.some(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };

  useEffect(() => {
    loadMore();
    return () => debouncedSearch.cancel();
  }, []);

  const handleAddSelected = () => {
    if (onSelect) {
      onSelect(selectedProducts);
    }
    onClose();
  };

  return (
    <Dialog title="Add Products" onClose={onClose}>
      <div className="product-picker">
        <div className="search-container">
          <input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="products-grid">
          {products.length > 0 ? products.map(product => (
            <div
              key={product.id}
              className={`product-card ${selectedProducts.some(p => p.id === product.id) ? 'selected' : ''}`}
              onClick={() => handleSelect(product)}
            >
              <div className="product-image">
                {product.image && (
                  <img
                    src={product.image.src}
                    alt={product.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder-image.png';
                    }}
                  />
                )}
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <div className="product-meta">
                  <span>{product.variants?.length || 0} variants</span>
                  <span>₹{product.variants?.[0]?.price || '0'}</span>
                </div>
              </div>
            </div>
          )) : <div>No products found.</div>}

          {loading && <div className="loading-indicator">Loading...</div>}
        </div>

        <div className="dialog-footer">
          <div className="selected-count">
            {selectedProducts.length} products selected
          </div>
          <div className="dialog-actions">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleAddSelected}
              disabled={selectedProducts.length === 0}
            >
              Add Selected
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductPicker;
