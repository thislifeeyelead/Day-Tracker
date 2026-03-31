
import React from "react";

export default function Dashboard({ items, total, remaining, unfinished }) {
  return (
    <div>
      <h2
        style={{
          marginBottom: 25,
          fontSize: 28,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Overview
      </h2>

      <div style={{ display: "flex", gap: 15, marginBottom: 25 }}>
        <Card label="Earned" value={`$${total}`} color="#22c55e" />
        <Card label="Remaining" value={`$${remaining}`} color="#ef4444" />
        <Card label="Jobs" value={items.length} color="#6366f1" />
      </div>

      <div
        style={{
          padding: 20,
          borderRadius: 16,
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Next Jobs</h3>

        {unfinished.length === 0 ? (
          <div style={{ opacity: 0.8 }}>Nothing unfinished. Miracles happen.</div>
        ) : (
          unfinished.slice(0, 5).map((item) => (
            <div
              key={item.id}
              style={{
                padding: "12px 0",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div style={{ fontWeight: "bold" }}>{item.title}</div>
              <div style={{ fontSize: 13, opacity: 0.75 }}>
                {item.platform} • {item.category}
              </div>
              <div style={{ fontSize: 13, opacity: 0.75 }}>
                {item.date} {item.time} • ${item.pay}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Card({ label, value, color }) {
  return (
    <div
      style={{
        flex: 1,
        padding: 20,
        borderRadius: 16,
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${color}`,
        textAlign: "center",
        boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
        transition: "0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px) scale(1.03)";
        e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.25)";
      }}
    >
      <div
        style={{
          fontSize: 11,
          opacity: 0.6,
          letterSpacing: 1,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: 26,
          fontWeight: "bold",
          marginTop: 8,
        }}
      >
        {value}
      </div>
    </div>
  );
}
