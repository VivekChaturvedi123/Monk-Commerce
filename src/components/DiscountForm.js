import React, { useState } from 'react';
import Input from '../ui/Input';
import Select from '../ui/select';

const DiscountForm = ({ value, onChange }) => {
  const [type, setType] = useState(value?.type || 'percentage');
  const [amount, setAmount] = useState(value?.amount || '');

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setType(newType);
    updateDiscount(amount, newType);
  };

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    setAmount(newAmount);
    updateDiscount(newAmount, type);
  };

  const updateDiscount = (newAmount, newType) => {
    onChange({
      type: newType,
      amount: parseFloat(newAmount) || 0,
    });
  };

  return (
    <div className="discount-form">
      <Select 
        value={type} 
        onChange={handleTypeChange} 
        options={[
          { value: 'percentage', label: 'Percentage' },
          { value: 'fixed', label: 'Fixed Amount' },
        ]}
      />
      <Input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        placeholder={type === 'percentage' ? '% off' : 'Amount off'}
      />
    </div>
  );
};

export default DiscountForm;
