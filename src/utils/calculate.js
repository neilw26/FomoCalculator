import { fetchCryptoPrice, fetchStockPrice } from "../apiService";

const ASSETS = ["BTC", "SOL", "ETH", "VOO", "QQQ", "NVDA"];

export async function calculateReturns(entries, today) {
  const aggregated = {};

  ASSETS.forEach((asset) => {
    aggregated[asset] = { totalValue: 0, reasons: [] };
  });

  for (const entry of entries) {
    const amount = parseFloat(entry.amount) || 0;
    const reason = entry.reason || "(no reason provided)";

    for (const asset of ASSETS) {
      let priceAtDate = 0;
      let currentPrice = 0;

      if (["BTC", "SOL", "ETH"].includes(asset)) {
        priceAtDate = await fetchCryptoPrice(asset, entry.date);
        currentPrice = await fetchCryptoPrice(asset, today);
      } else {
        priceAtDate = await fetchStockPrice(asset, entry.date);
        currentPrice = await fetchStockPrice(asset, today);
      }

      const currentValue = priceAtDate > 0 ? amount * (currentPrice / priceAtDate) : 0;

      aggregated[asset].totalValue += currentValue;
      aggregated[asset].reasons.push(reason);
    }
  }

  return ASSETS.map((asset) => ({
    asset,
    totalValue: aggregated[asset].totalValue,
    reasons: aggregated[asset].reasons,
  }));
}
