import React from "react";

export default function EntryList({ entries, handleEntryChange, removeEntry, addEntry, today, earliestDate }) {
  return (
    <div className="entries">
      {entries.map((entry, index) => (
        <div key={index} className="entry-row">
          <input
            type="date"
            min={earliestDate}     // earliest selectable date
            max={today}            // latest selectable date
            value={entry.date}
            onChange={(e) => handleEntryChange(index, "date", e.target.value)}
            onKeyDown={(e) => e.preventDefault()} // disables typing
            onPaste={(e) => e.preventDefault()}   // disables paste
          />
          <div className="dollar-input">
            <span className="dollar-sign">$</span>
            <input
              type="number"
              min="0"
              value={entry.amount}
              onChange={(e) => handleEntryChange(index, "amount", e.target.value)}
            />
          </div>
          <input
            type="text"
            value={entry.reason}
            onChange={(e) => handleEntryChange(index, "reason", e.target.value)}
            placeholder="Reason / What money was spent on"
          />
          <button
            className="remove-btn"
            onClick={() => removeEntry(index)}
            disabled={index === 0} // Disable button for the first entry
            style={{ opacity: index === 0 ? 0.5 : 1, cursor: index === 0 ? "not-allowed" : "pointer" }}
          >
            ✖
          </button>
        </div>
      ))}

      <button className="add-btn" onClick={addEntry}>
        + Add Entry
      </button>
    </div>
  );
}
