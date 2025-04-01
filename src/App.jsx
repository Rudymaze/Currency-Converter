import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrencySelector from "./components/CurrencySelector";
import AmountInput from "./components/AmountInput";
import ConversionResult from "./components/ConversionResults";
import DarkModeToggle from "./components/DarkModeToggle";

// API key for fetching and updating the currency converter
const API_KEY = "dc289905fcc47eed5bca6a9e";
const MAIN_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [exchangeRates, setExchangeRates] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode and persist in localStorage
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Check for saved dark mode preference on initial load
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

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
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
        darkMode ? "dark bg-gray-900" : "bg-gray-100"
      }`}>
      <div
        className={`p-8 rounded-lg shadow-lg w-full max-w-md transition-colors duration-300 ${
          darkMode ? "dark:bg-gray-800" : "bg-white"
        }`}>
        <div className="flex justify-between items-center mb-6">
          <h1
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}>
            Currency Converter
          </h1>
          <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
        <div className="space-y-4">
          <AmountInput
            amount={amount}
            onChange={(value) => setAmount(value)}
            darkMode={darkMode}
          />
          <CurrencySelector
            currencies={currencies}
            selectedCurrency={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            darkMode={darkMode}
          />
          <CurrencySelector
            currencies={currencies}
            selectedCurrency={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            darkMode={darkMode}
          />
          {convertedAmount !== null && (
            <ConversionResult result={convertedAmount} darkMode={darkMode} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
