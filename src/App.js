import React, { useState } from "react";
import { fetchCryptoPrice, fetchStockPrice } from "./apiService";
import "./App.css";

const ASSETS = ["BTC", "SOL", "ETH", "VOO", "QQQ", "NVDA"];

function App() {
  const [entries, setEntries] = useState([{ date: "", amount: "", reason: "" }]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleEntryChange = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);
  };

  const removeEntry = (index) => setEntries(entries.filter((_, i) => i !== index));

  // Check if any input is empty or amount is <= 0
  const hasInvalidFields = entries.some(
    (e) => !e.date || !e.amount || parseFloat(e.amount) <= 0 || !e.reason.trim()
  );

  const addEntry = () => {
    setEntries([...entries, { date: "", amount: "", reason: "" }]);
  };

  const calculateReturns = async () => {
    setLoading(true);

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

    const newResults = ASSETS.map((asset) => ({
      asset,
      totalValue: aggregated[asset].totalValue,
      reasons: aggregated[asset].reasons,
    }));

    setResults(newResults);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Fomo Calculator</h1>

      <div className="entries">
        {entries.map((entry, index) => (
          <div key={index} className="entry-row">
            <input
              type="date"
              max={today}
              value={entry.date}
              onChange={(e) => handleEntryChange(index, "date", e.target.value)}
              placeholder="Date"
            />
            <div className="dollar-input">
              <span className="dollar-sign">$</span>
              <input
                type="number"
                min="0"
                value={entry.amount}
                onChange={(e) => handleEntryChange(index, "amount", e.target.value)}
                placeholder="Amount"
              />
            </div>
            <input
              type="text"
              value={entry.reason}
              onChange={(e) => handleEntryChange(index, "reason", e.target.value)}
              placeholder="Reason / What money was spent on"
            />
            <button className="remove-btn" onClick={() => removeEntry(index)}>
              ✖
            </button>
          </div>
        ))}

        <button className="add-btn" onClick={addEntry}>
          + Add Entry
        </button>
      </div>

      <button
        className={`calculate-btn ${hasInvalidFields ? "disabled" : "enabled"}`}
        onClick={calculateReturns}
        disabled={loading || hasInvalidFields}
      >
        {loading ? "Calculating..." : "Calculate Returns"}
      </button>

      {hasInvalidFields && (
        <p style={{ color: "red", marginTop: "10px" }}>
          Please fill in all fields and ensure amounts are greater than 0 before calculating.
        </p>
      )}

      <div className="results">
        {results.length === 0 && <p>No results yet. Add entries and click "Calculate Returns".</p>}
        {results.map((r, idx) => (
          <div key={idx} className="result-entry">
            <p>
              If you had invested your money in <strong>{r.asset}</strong> instead of{" "}
              <strong>{r.reasons.join(", ")}</strong>, it would now be worth $
              {r.totalValue.toFixed(2)}.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
