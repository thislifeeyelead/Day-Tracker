import React from "react";

export default function Dashboard({
  items,
  total,
  remaining,
  unfinished,
  schoolGoalHours,
  drivingGoalHours,
  handshakeGoalHours
}) {
  const completedCount = items.filter((i) => i.completed).length;
  const unfinishedCount = items.filter((i) => !i.completed).length;
  const mustDoToday = items.filter((i) => i.mustDoToday && !i.completed).length;

  const schoolHoursPlanned = items
    .filter((i) => i.category === "School")
    .reduce((sum, i) => sum + Number(i.estimatedHours || 0), 0);

  const drivingHoursPlanned = items
    .filter((i) => i.category === "Driving" || i.category === "Delivery")
    .reduce((sum, i) => sum + Number(i.targetHours || i.estimatedHours || 0), 0);

  const handshakeHoursPlanned = items
    .filter((i) => i.category === "Handshake / AI Work")
    .reduce((sum, i) => sum + Number(i.estimatedHours || i.minimumHours || 0), 0);

  const schoolHoursRemaining = Math.max(schoolGoalHours - schoolHoursPlanned, 0);
  const drivingHoursRemaining = Math.max(drivingGoalHours - drivingHoursPlanned, 0);
  const handshakeHoursRemaining = Math.max(handshakeGoalHours - handshakeHoursPlanned, 0);

  const schoolMinHours = items
    .filter((i) => i.category === "School" && !i.completed)
    .reduce((sum, i) => sum + Number(i.minimumHours || 0), 0);

  const drivingMinHours = items
    .filter((i) => (i.category === "Driving" || i.category === "Delivery") && !i.completed)
    .reduce((sum, i) => sum + Number(i.minimumHours || 0), 0);

  const drivingMinEarnings = items
    .filter((i) => (i.category === "Driving" || i.category === "Delivery") && !i.completed)
    .reduce((sum, i) => sum + Number(i.minimumEarnings || 0), 0);

  const aiMinHours = items
    .filter((i) => i.category === "Handshake / AI Work" && !i.completed)
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
        <Card label="Money Left" value={`$${remaining}`} color="#ef4444" />
        <Card label="Open" value={unfinishedCount} color="#6366f1" />
        <Card label="Finished" value={completedCount} color="#10b981" />
        <Card label="Must Do Today" value={mustDoToday} color="#f59e0b" />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 15,
          marginBottom: 20
        }}
      >
        <GoalCard
          title="School Hours"
          planned={schoolHoursPlanned}
          goal={schoolGoalHours}
          remaining={schoolHoursRemaining}
          color="#f59e0b"
        />
        <GoalCard
          title="Driving Hours"
          planned={drivingHoursPlanned}
          goal={drivingGoalHours}
          remaining={drivingHoursRemaining}
          color="#3b82f6"
        />
        <GoalCard
          title="Handshake Hours"
          planned={handshakeHoursPlanned}
          goal={handshakeGoalHours}
          remaining={handshakeHoursRemaining}
          color="#8b5cf6"
        />
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
        <h3 style={{ marginTop: 0 }}>Minimum Expectations Still Owed</h3>
        <div style={{ marginBottom: 8 }}>School minimum hours: {schoolMinHours || 0}</div>
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
        <h3 style={{ marginTop: 0 }}>Next Open Tasks</h3>

        {unfinished.length === 0 ? (
          <div style={{ opacity: 0.8 }}>Nothing unfinished. Miracles happen.</div>
        ) : (
          unfinished
            .filter((i) => !i.completed)
            .slice(0, 6)
            .map((item) => (
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
        boxShadow: "0 8px 25px rgba(0,0,0,0.25)"
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

function GoalCard({ title, planned, goal, remaining, color }) {
  const percent = goal > 0 ? Math.min((planned / goal) * 100, 100) : 0;

  return (
    <div
      style={{
        padding: 18,
        borderRadius: 16,
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${color}`,
        boxShadow: "0 8px 25px rgba(0,0,0,0.25)"
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: 10 }}>{title}</div>
      <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 8 }}>
        Planned: {planned} / Goal: {goal}
      </div>
      <div
        style={{
          height: 10,
          borderRadius: 999,
          background: "rgba(255,255,255,0.08)",
          overflow: "hidden",
          marginBottom: 8
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: color
          }}
        />
      </div>
      <div style={{ fontSize: 13, opacity: 0.8 }}>Remaining: {remaining}</div>
    </div>
  );
}
