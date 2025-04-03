const AmountInput = ({ amount, onChange, darkMode, hasError }) => {
  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => onChange(e.target.value)}
        className={`p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 w-full ${
          darkMode
            ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
            : "focus:ring-blue-500"
        } ${hasError ? "border-red-500 ring-2 ring-red-500" : ""}`}
        placeholder="Enter amount"
      />
      {hasError && (
        <p
          className={`mt-1 text-sm ${
            darkMode ? "text-red-300" : "text-red-600"
          }`}>
          Please enter a valid amount
        </p>
      )}
    </div>
  );
};
export default AmountInput;
