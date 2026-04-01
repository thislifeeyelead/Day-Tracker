import React from "react";

export default function Dashboard({ items, total, remaining, unfinished }) {
  const mustDoToday = items.filter((i) => i.mustDoToday).length;
  const schoolHours = items
    .filter((i) => i.category === "School")
    .reduce((sum, i) => sum + Number(i.minimumHours || 0), 0);
  const drivingMinHours = items
    .filter((i) => i.category === "Driving" || i.category === "Delivery")
    .reduce((sum, i) => sum + Number(i.minimumHours || 0), 0);
  const drivingMinEarnings = items
    .filter((i) => i.category === "Driving" || i.category === "Delivery")
    .reduce((sum, i) => sum + Number(i.minimumEarnings || 0), 0);
  const aiMinHours = items
    .filter((i) => i.category === "Handshake / AI Work")
    .reduce((sum, i) => sum + Number(i.minimumHours || 0), 0);

  return (
    <div>
      <h2
        style={{
          marginBottom: 25,
          fontSize: 28,
          fontWeight: "bold",
          textAlign: "center"
        }}
      >
        Overview
      </h2>

      <div style={{ display: "flex", gap: 15, marginBottom: 25, flexWrap: "wrap" }}>
        <Card label="Earned" value={`$${total}`} color="#22c55e" />
        <Card label="Remaining" value={`$${remaining}`} color="#ef4444" />
        <Card label="Tasks" value={items.length} color="#6366f1" />
        <Card label="Must Do Today" value={mustDoToday} color="#f59e0b" />
      </div>

      <div
        style={{
          padding: 20,
          borderRadius: 16,
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
          marginBottom: 20
        }}
      >
        <h3 style={{ marginTop: 0 }}>Minimum Expectations</h3>
        <div style={{ marginBottom: 8 }}>School minimum hours: {schoolHours || 0}</div>
        <div style={{ marginBottom: 8 }}>Driving / delivery minimum hours: {drivingMinHours || 0}</div>
        <div style={{ marginBottom: 8 }}>Driving / delivery minimum earnings: ${drivingMinEarnings || 0}</div>
        <div style={{ marginBottom: 8 }}>Handshake / AI minimum hours: {aiMinHours || 0}</div>
      </div>

      <div
        style={{
          padding: 20,
          borderRadius: 16,
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.25)"
        }}
      >
        <h3 style={{ marginTop: 0 }}>Next Tasks</h3>

        {unfinished.length === 0 ? (
          <div style={{ opacity: 0.8 }}>Nothing unfinished. About time.</div>
        ) : (
          unfinished.slice(0, 6).map((item) => (
            <div
              key={item.id}
              style={{
                padding: "12px 0",
                borderBottom: "1px solid rgba(255,255,255,0.08)"
              }}
            >
              <div style={{ fontWeight: "bold" }}>{item.title}</div>
              <div style={{ fontSize: 13, opacity: 0.75 }}>
                {item.category}
                {item.dueDate ? ` • Due ${item.dueDate}` : ""}
                {item.mustDoToday ? " • Must do today" : ""}
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
        minWidth: 150,
        padding: 20,
        borderRadius: 16,
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${color}`,
        textAlign: "center",
        boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
        transition: "0.2s",
        cursor: "pointer"
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
          textTransform: "uppercase"
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: 26,
          fontWeight: "bold",
          marginTop: 8
        }}
      >
        {value}
      </div>
    </div>
  );
}
