import React from "react";

const AmountInput = ({ amount, onChange }) => {
  return (
    <input
      type="number"
      //   Amount to be changed, defaultalways stays the same, 0
      value={amount}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter amount"
    />
  );
};

export default AmountInput;
