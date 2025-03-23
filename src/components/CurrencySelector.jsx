import React from "react";

const CurrencySelector = ({ currencies, selectedCurrency, onChange }) => {
  return (
    <div>
      value={selectedCurrency}
      onChange={onChange}
      className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2
      focus:ring-blue-500"
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </div>
  );
};

export default CurrencySelector;
