import React from "react";

export default function Results({ results }) {
  if (results.length === 0) {
    return <p>No results yet. Add entries and click "Calculate Returns".</p>;
  }

  return (
    <div className="results">
      {results.map((r, idx) => (
        <div key={idx} className="result-entry">
          <p>
            If you had invested your money in <strong>{r.asset}</strong> instead of a {" "}
            <strong>{r.reasons.join(", ")}</strong>, it would now be worth $
            {r.totalValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.
          </p>
        </div>
      ))}
    </div>
  );
}
