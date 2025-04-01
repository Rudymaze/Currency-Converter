import React from "react";

const AmountInput = ({ amount, onChange, darkMode }) => {
  return (
    <input
      type="number"
      value={amount}
      onChange={(e) => onChange(e.target.value)}
      className={`p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 w-full ${
        darkMode
          ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
          : "focus:ring-blue-500"
      }`}
      placeholder="Enter amount"
    />
  );
};

export default AmountInput;
