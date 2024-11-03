import React, { useState, useCallback, useRef, useEffect } from 'react';
import ProductList from './ProductList.js';
import ProductPicker from './ProductPicker.js';
import Button from '../ui/Button.js';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const editingProductIndex = useRef(null);

  const handleAddProduct = () => {
    console.log("Adding Product");
    const newProduct = { id: Date.now(), title: '', variants: [] };
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts, newProduct];
      console.log("Current Products after Add:", updatedProducts);
      return updatedProducts;
    });
  };

  const handleEditProduct = (index) => {
    console.log(`Editing Product at index: ${index}`);
    editingProductIndex.current = index;
    setIsPickerOpen(true);
  };

  const handleProductSelect = (selectedProducts) => {
    console.log("Selected Products:", selectedProducts);
    if (editingProductIndex.current !== null) {
      setProducts((prevProducts) => {
        const newProducts = [...prevProducts];
        newProducts.splice(editingProductIndex.current, 1, ...selectedProducts);
        return newProducts;
      });
      editingProductIndex.current = null;
    }
    setIsPickerOpen(false);
  };

  const moveProduct = useCallback((dragIndex, hoverIndex) => {
    console.log(`Moving product from index ${dragIndex} to ${hoverIndex}`);
    setProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      const [draggedProduct] = newProducts.splice(dragIndex, 1);
      newProducts.splice(hoverIndex, 0, draggedProduct);
      return newProducts;
    });
  }, []);

  const handleRemoveProduct = (index) => {
    console.log(`Removing product at index: ${index}`);
    setProducts((prevProducts) => prevProducts.filter((_, idx) => idx !== index));
  };

  const handleDiscountChange = (index, discount) => {
    console.log(`Changing discount for product at index ${index} to ${discount}`);
    setProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      newProducts[index].discount = discount;
      return newProducts;
    });
  };

  useEffect(() => {
    console.log("Products updated:", products);
  }, [products]);

  return (
    <div className="product-manager">
      <h2>Add(Max. 4 Products)</h2>
      <ProductList
  products={products}
  setProducts={setProducts}
  onEdit={handleEditProduct}
  onMove={moveProduct}
  onRemove={handleRemoveProduct}
  onDiscountChange={handleDiscountChange}
/>

      {products.length < 4 && (
        <Button onClick={handleAddProduct} className="add-product-btn">
          Add Product
        </Button>
      )}

      {isPickerOpen && (
        <ProductPicker
          onSelect={handleProductSelect}
          onClose={() => {
            console.log("Closing Product Picker");
            setIsPickerOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ProductManager;
