// apiService.js
export async function fetchCryptoPrice(symbol, date) {
  try {
    // 🧩 Example: CoinGecko API endpoint (no API key needed)
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${symbol.toLowerCase()}/history?date=${formatDate(date)}`
    );
    const data = await res.json();
    return data.market_data?.current_price?.usd || 0;

    // console.log(`[API placeholder] Fetching crypto price for ${symbol} on ${date}`);
    // return 100 + Math.random() * 100; // temporary mock data
  } catch (e) {
    console.error("fetchCryptoPrice error:", e);
    return 0;
  }
}

export async function fetchStockPrice(symbol, date) {
  try {
    // 🧩 Example: Alpha Vantage API (replace DEMO_KEY with yours)
    // const res = await fetch(
    //   `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=YOUR_API_KEY`
    // );
    // const data = await res.json();
    // return parseFloat(data["Time Series (Daily)"][date]["4. close"]) || 0;

    console.log(`[API placeholder] Fetching stock price for ${symbol} on ${date}`);
    return 150 + Math.random() * 50; // temporary mock data
  } catch (e) {
    console.error("fetchStockPrice error:", e);
    return 0;
  }
}

// Helper for dd-mm-yyyy (CoinGecko format)
function formatDate(dateStr) {
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
}
