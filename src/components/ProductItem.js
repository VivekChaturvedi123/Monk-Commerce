import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import Button from '../ui/Button';
import './ProductItem.css';

const ProductItem = ({ product, onEdit, onRemove, onDiscountChange, onMoveVariant, onRemoveVariant, showRemove }) => {
  const [showVariantsDropdown, setShowVariantsDropdown] = useState(false);
  const [showDiscountForm, setShowDiscountForm] = useState(false);
  const [discountType, setDiscountType] = useState('flat'); // State for the discount type
  const [discountValue, setDiscountValue] = useState(''); // State for the discount value
  const hasMultipleVariants = product.variants && product.variants.length > 1;

  const handleDiscountChange = () => {
    if (discountValue) {
      onDiscountChange(product.id, { type: discountType, value: discountValue });
    }
  };

  return (
    <div className="product-item">
      <div className="product-header">
        <div className="drag-handle">⋮⋮</div>
        <div className="product-title">{product.title || 'Select Product'}</div>
        <Button onClick={onEdit} className="edit-btn">✎</Button>
        {showRemove && (
          <Button onClick={onRemove} className="remove-btn">×</Button>
        )}
      </div>

      <div className="product-actions">
        <Button onClick={() => setShowDiscountForm(prev => !prev)} className="discount-toggle">
          {showDiscountForm ? 'Cancel Discount' : 'Add Discount'}
        </Button>
        {hasMultipleVariants && (
          <Button onClick={() => setShowVariantsDropdown(prev => !prev)} className="variant-toggle">
            {showVariantsDropdown ? 'Hide Variants' : 'Show Variants'}
          </Button>
        )}
      </div>

      {showDiscountForm && (
        <div className="discount-inputs">
            <select value={discountType} onChange={(e) => setDiscountType(e.target.value)}>
              <option value="flat">Flat Discount</option>
              <option value="percentage">Percentage Discount</option>
            </select>
        
         
            <input 
              type="number" 
              placeholder={`Enter ${discountType === 'flat' ? 'flat amount' : 'percentage'}`} 
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)} 
            />
         
        </div>
      )}

      {showVariantsDropdown && (
        <div className="variants-dropdown">
          {product.variants.map((variant, index) => (
            <DraggableVariantItem
              key={variant.id}
              variant={variant}
              index={index}
              onMoveVariant={onMoveVariant}
              onRemoveVariant={() => onRemoveVariant(variant.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const DraggableVariantItem = ({ variant, index, onMoveVariant, onRemoveVariant }) => {
  const ref = React.useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: 'VARIANT',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'VARIANT',
    hover: (item) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      onMoveVariant(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div ref={ref} className="variant-item" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className="variant-title">{variant.title}</div>
      <div className="drag-handle">⋮⋮</div>
      <Button onClick={onRemoveVariant} className="remove-variant-btn">×</Button>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onDiscountChange: PropTypes.func.isRequired,
  onMoveVariant: PropTypes.func.isRequired,
  onRemoveVariant: PropTypes.func.isRequired,
  showRemove: PropTypes.bool,
};

export default ProductItem;
