import React from "react";

const ConversionResult = ({ result }) => {
  return (
    <div className="mt-4 p-4 bg-blue-50 rounded-md">
      <p className="text-lg font-semibold">Converted Amount: {result}</p>
    </div>
  );
};

export default ConversionResult;
