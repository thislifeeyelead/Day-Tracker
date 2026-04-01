import React, { useMemo, useState } from "react";

export default function CalendarView({ items, setItems }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState(formatDateLocal(today));

  const monthDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const startWeekday = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];

    for (let i = 0; i < startWeekday; i++) {
      cells.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(new Date(year, month, day));
    }

    while (cells.length % 7 !== 0) {
      cells.push(null);
    }

    return cells;
  }, [currentMonth]);

  const selectedItems = useMemo(() => {
    return [...items]
      .filter((item) => item.dueDate === selectedDate)
      .sort((a, b) => (a.startTime || "").localeCompare(b.startTime || ""));
  }, [items, selectedDate]);

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

  function hasItemsOnDate(dateObj) {
    const dateKey = formatDateLocal(dateObj);
    return items.some((item) => item.dueDate === dateKey);
  }

  function previousMonth() {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  }

  function nextMonth() {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  }

  function cardBackground(category) {
    if (category === "Mystery Shop") return "rgba(34,197,94,0.12)";
    if (category === "Delivery") return "rgba(59,130,246,0.12)";
    if (category === "School") return "rgba(245,158,11,0.12)";
    return "rgba(255,255,255,0.06)";
  }

  const selectedDateNice = prettyDate(selectedDate);

  return (
    <div>
      <h2 style={{ marginBottom: 20, textAlign: "center" }}>Calendar</h2>

      <div
        style={{
          padding: 20,
          borderRadius: 18,
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          marginBottom: 20
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16
          }}
        >
          <button onClick={previousMonth} style={navBtn}>
            ←
          </button>

          <div style={{ fontSize: 22, fontWeight: "bold" }}>
            {currentMonth.toLocaleString("en-US", {
              month: "long",
              year: "numeric"
            })}
          </div>

          <button onClick={nextMonth} style={navBtn}>
            →
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 8,
            marginBottom: 8
          }}
        >
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              style={{
                textAlign: "center",
                fontSize: 12,
                opacity: 0.7,
                fontWeight: "bold",
                paddingBottom: 4
              }}
            >
              {day}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 8
          }}
        >
          {monthDays.map((dateObj, index) => {
            if (!dateObj) {
              return <div key={`empty-${index}`} style={{ minHeight: 70 }} />;
            }

            const dateKey = formatDateLocal(dateObj);
            const isSelected = dateKey === selectedDate;
            const isToday = dateKey === formatDateLocal(today);
            const hasItems = hasItemsOnDate(dateObj);

            return (
              <button
                key={dateKey}
                onClick={() => setSelectedDate(dateKey)}
                style={{
                  minHeight: 70,
                  borderRadius: 14,
                  border: isSelected
                    ? "2px solid #8b5cf6"
                    : isToday
                    ? "1px solid #22c55e"
                    : "1px solid rgba(255,255,255,0.08)",
                  background: isSelected
                    ? "rgba(139,92,246,0.18)"
                    : "rgba(255,255,255,0.04)",
                  color: "white",
                  cursor: "pointer",
                  padding: 8,
                  textAlign: "left",
                  position: "relative"
                }}
              >
                <div style={{ fontWeight: "bold" }}>{dateObj.getDate()}</div>

                {hasItems && (
                  <div
                    style={{
                      marginTop: 8,
                      display: "inline-block",
                      padding: "2px 8px",
                      borderRadius: 999,
                      background: "rgba(34,197,94,0.2)",
                      fontSize: 11
                    }}
                  >
                    {
                      items.filter((item) => item.dueDate === dateKey).length
                    } item
                    {items.filter((item) => item.dueDate === dateKey).length !== 1
                      ? "s"
                      : ""}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div
        style={{
          padding: 20,
          borderRadius: 18,
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)"
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: 16 }}>
          Tasks for {selectedDateNice}
        </h3>

        {selectedItems.length === 0 ? (
          <div style={{ opacity: 0.75 }}>Nothing on this day yet.</div>
        ) : (
          <div style={{ display: "grid", gap: 15 }}>
            {selectedItems.map((item) => (
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
                <div style={{ fontSize: 18, fontWeight: "bold" }}>
                  {item.title}
                </div>

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
                    <strong style={{ marginLeft: 12 }}>Due:</strong>{" "}
                    {item.dueDate || "—"}
                  </div>
                )}

                {(item.startTime || item.endTime) && (
                  <div style={{ marginTop: 4 }}>
                    <strong>Time Window:</strong> {item.startTime || "—"} to{" "}
                    {item.endTime || "—"}
                  </div>
                )}

                {!!item.pay && (
                  <div
                    style={{
                      marginTop: 8,
                      color: "#86efac",
                      fontWeight: "bold"
                    }}
                  >
                    ${item.pay}
                  </div>
                )}

                {(item.contactName ||
                  item.contactEmail ||
                  item.contactPhone) && (
                  <div style={{ marginTop: 10 }}>
                    <div style={{ fontWeight: "bold", marginBottom: 4 }}>
                      Contact
                    </div>
                    {!!item.contactName && <div>{item.contactName}</div>}
                    {!!item.contactEmail && <div>{item.contactEmail}</div>}
                    {!!item.contactPhone && <div>{item.contactPhone}</div>}
                  </div>
                )}

                {(item.companyUrl || item.shopUrl) && (
                  <div
                    style={{
                      marginTop: 10,
                      display: "flex",
                      flexDirection: "column",
                      gap: 6
                    }}
                  >
                    {!!item.companyUrl && (
                      <a
                        href={item.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={linkStyle}
                      >
                        Open company portal
                      </a>
                    )}
                    {!!item.shopUrl && (
                      <a
                        href={item.shopUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={linkStyle}
                      >
                        Open task / shop link
                      </a>
                    )}
                  </div>
                )}

                {!!item.notes && (
                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontWeight: "bold", marginBottom: 4 }}>
                      Notes
                    </div>
                    <div style={{ whiteSpace: "pre-wrap", opacity: 0.9 }}>
                      {item.notes}
                    </div>
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
        )}
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

const navBtn = {
  padding: "8px 14px",
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  background: "rgba(255,255,255,0.08)",
  color: "white",
  fontWeight: "bold"
};

const linkStyle = {
  color: "#93c5fd",
  textDecoration: "underline"
};

function formatDateLocal(date) {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function prettyDate(dateString) {
  if (!dateString) return "No date";
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}
