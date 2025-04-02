import React from "react";

const ConversionResult = ({ result, fromCurrency, toCurrency, darkMode }) => {
  return (
    <div
      className={`mt-4 p-4 rounded-md ${
        darkMode ? "bg-gray-700 text-white" : "bg-blue-50"
      }`}>
      <p className="text-lg font-semibold">
        {fromCurrency} → {toCurrency}
      </p>
      <p className="text-2xl font-bold mt-2">
        {result} {toCurrency}
      </p>
    </div>
  );
};

export default ConversionResult;
