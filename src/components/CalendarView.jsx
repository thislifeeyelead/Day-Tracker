import React from "react";

export default function CalendarView({ items, setItems }) {
  function toggle(id, key) {
    const updated = items.map((item) =>
      item.id === id
        ? {
            ...item,
            checklist: {
              ...item.checklist,
              [key]: !item.checklist[key]
            }
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

  function linkStyle() {
    return {
      color: "#93c5fd",
      textDecoration: "underline"
    };
  }

  return (
    <div>
      <h2 style={{ marginBottom: 20, textAlign: "center" }}>Your Tasks</h2>

      <div style={{ display: "grid", gap: 15 }}>
        {items.length === 0 && (
          <div
            style={{
              padding: 20,
              borderRadius: 16,
              background: "rgba(255,255,255,0.05)",
              textAlign: "center",
              opacity: 0.8
            }}
          >
            No tasks yet.
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
              boxShadow: "0 8px 20px rgba(0,0,0,0.22)"
            }}
          >
            <div style={{ fontSize: 18, fontWeight: "bold" }}>{item.title}</div>

            <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>
              {item.company} • {item.category}
            </div>

            {!!item.taskType && (
              <div style={{ marginTop: 8 }}>
                <strong>Task Type:</strong> {item.taskType}
              </div>
            )}

            {!!item.jobId && (
              <div style={{ marginTop: 4 }}>
                <strong>Job ID:</strong> {item.jobId}
              </div>
            )}

            {!!item.address && (
              <div style={{ marginTop: 4 }}>
                <strong>Address:</strong> {item.address}
              </div>
            )}

            {(item.assignedDate || item.dueDate) && (
              <div style={{ marginTop: 8 }}>
                <strong>Assigned:</strong> {item.assignedDate || "—"}{" "}
                <strong style={{ marginLeft: 12 }}>Due:</strong> {item.dueDate || "—"}
              </div>
            )}

            {(item.startTime || item.endTime) && (
              <div style={{ marginTop: 4 }}>
                <strong>Time Window:</strong> {item.startTime || "—"} to {item.endTime || "—"}
              </div>
            )}

            {!!item.pay && (
              <div style={{ marginTop: 8, color: "#86efac", fontWeight: "bold" }}>
                ${item.pay}
              </div>
            )}

            {(item.contactName || item.contactEmail || item.contactPhone) && (
              <div style={{ marginTop: 10 }}>
                <div style={{ fontWeight: "bold", marginBottom: 4 }}>Contact</div>
                {!!item.contactName && <div>{item.contactName}</div>}
                {!!item.contactEmail && <div>{item.contactEmail}</div>}
                {!!item.contactPhone && <div>{item.contactPhone}</div>}
              </div>
            )}

            {(item.companyUrl || item.shopUrl) && (
              <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                {!!item.companyUrl && (
                  <a
                    href={item.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={linkStyle()}
                  >
                    Open company portal
                  </a>
                )}
                {!!item.shopUrl && (
                  <a
                    href={item.shopUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={linkStyle()}
                  >
                    Open task / shop link
                  </a>
                )}
              </div>
            )}

            {!!item.notes && (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontWeight: "bold", marginBottom: 4 }}>Notes</div>
                <div style={{ whiteSpace: "pre-wrap", opacity: 0.9 }}>{item.notes}</div>
              </div>
            )}

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
                color: "#fecaca"
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
        background: checked ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.05)"
      }}
    >
      {checked ? "✔ " : "⬜ "} {label}
    </div>
  );
}
