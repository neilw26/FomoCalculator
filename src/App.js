import React, { useState } from "react";
import EntryList from "./components/EntryList";
import Results from "./components/Results";
import { calculateReturns } from "./utils/calculate";
import "./App.css";
import {allPriceData} from "./data/index.js";

function App() {
  const [entries, setEntries] = useState([{ date: "", amount: "", reason: "" }]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get the last entry's date in the btcData array
 const today = Object.keys(allPriceData).sort().pop();
 const earliestDate = Object.keys(allPriceData).sort()[0];


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

      <p>
  Use this calculator to see how much money you could have potentially earned by investing instead of spending on unnecessary things. 
  The calculator supports dates from {earliestDate} up to {today}. 
  The dataset is updated every other week (automation in progress). 
  In the future, I plan to switch to a backend and use API calls for real-time data.
</p>


      <EntryList
        entries={entries}
        handleEntryChange={handleEntryChange}
        removeEntry={removeEntry}
        addEntry={addEntry}
        today={today}
        earliestDate={earliestDate}
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
