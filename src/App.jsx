import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "dc289905fcc47eed5bca6a9e";
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  return <></>;
}

export default App;
