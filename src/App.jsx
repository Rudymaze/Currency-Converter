import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrencySelector from "./components/CurrencySelector";
import AmountInput from "./components/AmountInput";
import ConversionResult from "./components/ConversionResults";

// API key for fetching and updating the currency converter
const API_KEY = "dc289905fcc47eed5bca6a9e";
const MAIN_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1); // Initialize with 1
  const [exchangeRates, setExchangeRates] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(MAIN_URL);
        setExchangeRates(response.data.conversion_rates);
        setCurrencies(Object.keys(response.data.conversion_rates));
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  useEffect(() => {
    if (exchangeRates[toCurrency]) {
      const result = (amount * exchangeRates[toCurrency]).toFixed(2);
      setConvertedAmount(result);
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Currency Converter
        </h1>
        <div className="space-y-4">
          <AmountInput
            amount={amount}
            onChange={(value) => setAmount(value)} // Update state directly
          />
          <CurrencySelector
            currencies={currencies}
            selectedCurrency={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          />
          <CurrencySelector
            currencies={currencies}
            selectedCurrency={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          />
          {convertedAmount !== null && (
            <ConversionResult result={convertedAmount} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
