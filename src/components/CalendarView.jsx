
import React from "react";

export default function CalendarView({ items, setItems }) {
  function toggle(id, key) {
    const updated = items.map((item) =>
      item.id === id
        ? {
            ...item,
            checklist: {
              ...item.checklist,
              [key]: !item.checklist[key],
            },
          }
        : item
    );

    setItems(updated);
  }

  function removeItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  function cardBackground(category) {
    if (category === "Mystery Shop") return "rgba(34,197,94,0.12)";
    if (category === "Delivery") return "rgba(59,130,246,0.12)";
    if (category === "School") return "rgba(245,158,11,0.12)";
    return "rgba(255,255,255,0.06)";
  }

  return (
    <div>
      <h2 style={{ marginBottom: 20, textAlign: "center" }}>Your Jobs</h2>

      <div style={{ display: "grid", gap: 15 }}>
        {items.length === 0 && (
          <div
            style={{
              padding: 20,
              borderRadius: 16,
              background: "rgba(255,255,255,0.05)",
              textAlign: "center",
              opacity: 0.8,
            }}
          >
            No jobs yet.
          </div>
        )}

        {items.map((item) => (
          <div
            key={item.id}
            style={{
              padding: 20,
              borderRadius: 16,
              background: cardBackground(item.category),
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.22)",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: "bold" }}>{item.title}</div>

            <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>
              {item.platform} • {item.category}
            </div>

            <div style={{ marginTop: 8 }}>
              {item.date} {item.time}
            </div>

            <div style={{ marginTop: 8, color: "#86efac", fontWeight: "bold" }}>
              ${item.pay}
            </div>

            <div style={{ marginTop: 12 }}>
              <CheckRow
                label="Guidelines"
                checked={item.checklist.guidelines}
                onClick={() => toggle(item.id, "guidelines")}
              />
              <CheckRow
                label="Visit"
                checked={item.checklist.visit}
                onClick={() => toggle(item.id, "visit")}
              />
              <CheckRow
                label="Report"
                checked={item.checklist.report}
                onClick={() => toggle(item.id, "report")}
              />
            </div>

            <button
              onClick={() => removeItem(item.id)}
              style={{
                marginTop: 12,
                padding: "8px 12px",
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
                background: "rgba(239,68,68,0.18)",
                color: "#fecaca",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CheckRow({ label, checked, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        marginTop: 6,
        padding: 8,
        borderRadius: 10,
        background: checked ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.05)",
      }}
    >
      {checked ? "✔ " : "⬜ "} {label}
    </div>
  );
}
