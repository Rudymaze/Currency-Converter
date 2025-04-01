import React from "react";

const CurrencySelector = ({
  currencies,
  selectedCurrency,
  onChange,
  darkMode,
}) => {
  return (
    <select
      value={selectedCurrency}
      onChange={onChange}
      className={`p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 w-full ${
        darkMode
          ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
          : "focus:ring-blue-500"
      }`}>
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelector;
