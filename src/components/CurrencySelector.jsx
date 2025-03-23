import React from 'react';

const CurrencySelector = ({ currencies, selectedCurrency, onChange }) => {
  return (
    <select
      value={selectedCurrency}
      onChange={onChange}
      className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    ></select>