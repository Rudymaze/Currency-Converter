import React from "react";

const ConversionResult = ({ result, darkMode }) => {
  return (
    <div
      className={`mt-4 p-4 rounded-md ${
        darkMode ? "bg-gray-700 text-white" : "bg-blue-50"
      }`}>
      <p className="text-lg font-semibold">Converted Amount: {result}</p>
    </div>
  );
};

export default ConversionResult;
