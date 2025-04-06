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
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("currencyFavorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  // Save favorites to localStorage when they change it stil will be saved in the local storage
  useEffect(() => {
    localStorage.setItem("currencyFavorites", JSON.stringify(favorites));
  }, [favorites]);

  // choosing a favorite pair to be stored in the localStorage, that will be used
  const addToFavorites = () => {
    const newFavorite = {
      from: fromCurrency,
      to: toCurrency,
      label: `${fromCurrency}/${toCurrency}`,
    };

    if (
      !favorites.some(
        (fav) => fav.from === fromCurrency && fav.to === toCurrency
      )
    ) {
      setFavorites([...favorites, newFavorite]);
    }
  };

  const removeFavorite = (index) => {
    const updatedFavorites = [...favorites];
    updatedFavorites.splice(index, 1);
    setFavorites(updatedFavorites);
  };

  const applyFavorite = (favorite) => {
    setFromCurrency(favorite.from);
    setToCurrency(favorite.to);
    setShowFavorites(false);
  };

  // DarkMode logic, to impliment darkmode for user convience
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

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // fetching the ExchangeRate API, that will be used to get all the currencies
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(MAIN_URL);
        setExchangeRates(response.data.conversion_rates);
        setCurrencies(Object.keys(response.data.conversion_rates));
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  const handleConvert = () => {
    if (!exchangeRates[toCurrency] || amount <= 0 || isNaN(amount)) {
      setInputError(true);
      setShowAlert(true);
      return;
    }

    const result = (amount * exchangeRates[toCurrency]).toFixed(2);
    setConvertedAmount(result);
    setInputError(false);
  };

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
          <div className="flex items-center gap-2">
            <DarkModeToggle
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
            />
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`p-2 rounded-full ${
                darkMode
                  ? "text-white hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-200"
              }`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>
          </div>
        </div>

        {showFavorites && (
          <div
            className={`mb-4 p-4 rounded-lg ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}>
            <div className="flex justify-between items-center mb-2">
              <h3
                className={`font-medium ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}>
                Favorite Pairs
              </h3>
              <button
                onClick={() => setShowFavorites(false)}
                className={`p-1 rounded-full ${
                  darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
                }`}>
                ✕
              </button>
            </div>
            {favorites.length === 0 ? (
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}>
                No favorites saved
              </p>
            ) : (
              <ul className="space-y-2">
                {favorites.map((fav, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <button
                      onClick={() => applyFavorite(fav)}
                      className={`text-left flex-1 p-2 rounded ${
                        darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
                      }`}>
                      {fav.label}
                    </button>
                    <button
                      onClick={() => removeFavorite(index)}
                      className={`p-1 rounded-full ml-2 ${
                        darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
                      }`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="space-y-4 ">
          <AmountInput
            amount={amount}
            onChange={(value) => {
              setAmount(value);
              setInputError(false);
            }}
            darkMode={darkMode}
            hasError={inputError}
          />
          <div className="relative">
            <CurrencySelector
              currencies={currencies}
              selectedCurrency={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              darkMode={darkMode}
              label="From"
            />

            {/* Swap button positioned between the selectors */}
            <div className="flex items-center justify-center my-2">
              <button
                onClick={() => {
                  setFromCurrency(toCurrency);
                  setToCurrency(fromCurrency);
                  setConvertedAmount(null);
                }}
                className={`p-2 rounded-full border mt-5 ${
                  darkMode
                    ? "border-gray-600 text-white hover:bg-gray-700"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
                aria-label="Swap currencies">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </button>
            </div>

            <CurrencySelector
              currencies={currencies}
              selectedCurrency={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              darkMode={darkMode}
              label="To"
            />
          </div>

          <button
            onClick={addToFavorites}
            disabled={!amount || amount <= 0}
            className={`py-2 px-4 ml-[45px] rounded-md font-medium ${
              darkMode
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            } ${
              !amount || amount <= 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}>
            Save as Favorite
          </button>
          <button
            onClick={handleConvert}
            disabled={isLoading || !amount || amount <= 0}
            className={`py-2 px-4 ml-[45px] rounded-md font-medium ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            } ${
              isLoading || !amount || amount <= 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}>
            {isLoading ? "Converting..." : "CONVERT"}
          </button>

          {convertedAmount !== null && (
            <ConversionResult
              result={convertedAmount}
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
              darkMode={darkMode}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
