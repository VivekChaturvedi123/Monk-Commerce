import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ProductItem from './ProductItem';

const ProductList = ({ products, setProducts, onEdit, onRemove, onDiscountChange }) => {
  
  const handleMoveProduct = (dragIndex, hoverIndex) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      const [movedProduct] = updatedProducts.splice(dragIndex, 1);
      updatedProducts.splice(hoverIndex, 0, movedProduct);
      return updatedProducts;
    });
  };

  const handleMoveVariant = (productIndex, dragIndex, hoverIndex) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      const product = updatedProducts[productIndex];
      const updatedVariants = [...product.variants];
      
      const [movedVariant] = updatedVariants.splice(dragIndex, 1);
      updatedVariants.splice(hoverIndex, 0, movedVariant);

      updatedProducts[productIndex] = { ...product, variants: updatedVariants };
      return updatedProducts;
    });
  };

  const handleRemoveVariant = (productIndex, variantId) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      const product = updatedProducts[productIndex];
      const updatedVariants = product.variants.filter(variant => variant.id !== variantId);

      updatedProducts[productIndex] = { ...product, variants: updatedVariants };
      return updatedProducts;
    });
  };

  return (
    <div className="product-list">
      {products.map((product, index) => (
        <DraggableProductItem
          key={product.id}
          index={index}
          product={product}
          onEdit={() => onEdit(index)}
          onMove={handleMoveProduct}
          onRemove={() => onRemove(index)}
          onDiscountChange={(discount) => onDiscountChange(index, discount)}
          onMoveVariant={(dragIndex, hoverIndex) => handleMoveVariant(index, dragIndex, hoverIndex)}
          onRemoveVariant={(variantId) => handleRemoveVariant(index, variantId)}
          showRemove={products.length > 1}
          hasSingleVariant={product.variants.length === 1}
        />
      ))}
    </div>
  );
};

const DraggableProductItem = ({ product, index, onEdit, onMove, onRemove, onDiscountChange, onMoveVariant, onRemoveVariant, showRemove, hasSingleVariant }) => {
  const ref = React.useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'PRODUCT',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'PRODUCT',
    hover: (item) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <ProductItem 
        product={product} 
        onEdit={onEdit} 
        onRemove={onRemove} 
        onDiscountChange={onDiscountChange}
        onMoveVariant={onMoveVariant}
        onRemoveVariant={onRemoveVariant}
        showRemove={showRemove}
        hasSingleVariant={hasSingleVariant}
      />
    </div>
  );
};

export default ProductList;
