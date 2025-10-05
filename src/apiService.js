// apiService.js
import btcData from "./data/btc.json";
import ethData from "./data/eth.json";
import nvdaData from "./data/nvda.json";
import qqqData from "./data/qqq.json";
import solData from "./data/sol.json";
import vooData from "./data/voo.json";

const cryptoMap = {
  btc: btcData,
  eth: ethData,
  sol: solData,
};

const stockMap = {
  nvda: nvdaData,
  qqq: qqqData,
  voo: vooData,
};
// ✅ Debug: Verify JSON imports are loaded
console.log("BTC sample data:", btcData);
console.log("ETH sample data:", ethData);
console.log("NVDA sample data:", nvdaData);
console.log("QQQ sample data:", qqqData);
console.log("SOL sample data:", solData);
console.log("VOO sample data:", vooData);
export function fetchCryptoPrice(symbol, date) {
  try {
    const data = cryptoMap[symbol.toLowerCase()];
    if (!data) throw new Error(`No data found for crypto: ${symbol}`);

    const dateStr = typeof date === "string" ? date : date.toISOString().slice(0, 10);

    const record = data.find(item => {
      const itemDate = item.date.slice(0, 10); // normalize JSON date
      return itemDate === dateStr;
    });

    return record?.price ?? 0;
  } catch (e) {
    console.error("fetchCryptoPrice error:", e);
    return 0;
  }
}

export function fetchStockPrice(symbol, date) {
  try {
    const data = stockMap[symbol.toLowerCase()];
    if (!data) throw new Error(`No data found for stock: ${symbol}`);

    const dateStr = typeof date === "string" ? date : date.toISOString().slice(0, 10);

    const record = data.find(item => {
      const itemDate = item.date.slice(0, 10);
      return itemDate === dateStr;
    });

    return record?.price ?? 0;
  } catch (e) {
    console.error("fetchStockPrice error:", e);
    return 0;
  }
}

