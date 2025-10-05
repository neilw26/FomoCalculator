import React, { useState } from "react";
import EntryList from "./components/EntryList";
import Results from "./components/Results";
import { calculateReturns } from "./utils/calculate";
import "./App.css";

function App() {
  const [entries, setEntries] = useState([{ date: "", amount: "", reason: "" }]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const today = new Date().toLocaleDateString("en-CA");

  const handleEntryChange = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);
  };

  const removeEntry = (index) => setEntries(entries.filter((_, i) => i !== index));

  const addEntry = () => setEntries([...entries, { date: "", amount: "", reason: "" }]);

  const hasInvalidFields = entries.some(
    (e) => !e.date || !e.amount || parseFloat(e.amount) <= 0 || !e.reason.trim()
  );

  const handleCalculateReturns = async () => {
    setLoading(true);
    const newResults = await calculateReturns(entries, today);
    setResults(newResults);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Fomo Calculator</h1>

      <EntryList
        entries={entries}
        handleEntryChange={handleEntryChange}
        removeEntry={removeEntry}
        addEntry={addEntry}
        today={today}
      />

      <button
        className={`calculate-btn ${hasInvalidFields ? "disabled" : "enabled"}`}
        onClick={handleCalculateReturns}
        disabled={loading || hasInvalidFields}
      >
        {loading ? "Calculating..." : "Calculate Returns"}
      </button>

      {hasInvalidFields && (
        <p style={{ color: "red", marginTop: "10px" }}>
          Please fill in all fields and ensure amounts are greater than 0 before calculating.
        </p>
      )}

      <Results results={results} />
    </div>
  );
}

export default App;
