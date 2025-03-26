import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// API key for fetching and updating the currency converter
const API_KEY = "dc289905fcc47eed5bca6a9e";
const MAIN_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");

  // using async and await in case there is any delay and also the try and catch so if there is any error it will be caught
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(BASE_URL);
        setExchangeRates(response.data.conversion_rates);
        setCurrencies(Object.keys(response.data.conversion_rates));
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, []);
  return <></>;
}

export default App;
