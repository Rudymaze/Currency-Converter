import React from "react";

const AmountInput = ({ amount, onChange }) => {
  return (
    <input
      type="number"
      value={amount}
      onChange={onChange}
      className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter amount"
    />
  );
};

export default AmountInput;
