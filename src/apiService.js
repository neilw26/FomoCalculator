import { allPriceData } from "./data";

// Approximate starting prices (USD)
const STARTING_PRICES = {
  BTC: 0.003,   // 2010
  ETH: 0.31,    // 2015
  SOL: 0.22,    // 2020
  NVDA: 10,     // Example start price
  QQQ: 50,      // Example start price
};

/**
 * Fetch crypto price for a specific date from local data
 * @param {string} symbol - BTC, ETH, SOL
 * @param {string} date - format "YYYY-MM-DD"
 * @returns {number} price in USD
 */
export function fetchCryptoPrice(symbol, date) {
  try {
    const key = symbol.toUpperCase();
    const record = allPriceData[date];
    if (!record) {
      console.warn(`No data found for date ${date}, returning starting price`);
      return STARTING_PRICES[key] || 0;
    }
    return record[key] || STARTING_PRICES[key] || 0;
  } catch (error) {
    console.error("fetchCryptoPrice error:", error);
    return STARTING_PRICES[symbol.toUpperCase()] || 0;
  }
}

/**
 * Fetch stock price for a specific date from local data
 * @param {string} symbol - NVDA, QQQ
 * @param {string} date - format "YYYY-MM-DD"
 * @returns {number} price in USD
 */
export function fetchStockPrice(symbol, date) {
  try {
    const key = symbol.toUpperCase();
    const record = allPriceData[date];
    if (!record) {
      console.warn(`No data found for date ${date}, returning starting price`);
      return STARTING_PRICES[key] || 0;
    }
    return record[key] || STARTING_PRICES[key] || 0;
  } catch (error) {
    console.error("fetchStockPrice error:", error);
    return STARTING_PRICES[symbol.toUpperCase()] || 0;
  }
}
