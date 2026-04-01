import React, { useEffect, useMemo, useState } from "react";
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";
import ItemForm from "./components/ItemForm";
import CalendarView from "./components/CalendarView";

const appStyle = {
  background: "linear-gradient(135deg, #0f172a, #1e293b)",
  minHeight: "100vh",
  color: "white",
  fontFamily: "system-ui, sans-serif",
};

export default function App() {
  const [items, setItems] = useState([]);
  const [moneyGoal, setMoneyGoal] = useState(1000);
  const [schoolGoalHours, setSchoolGoalHours] = useState(10);
  const [drivingGoalHours, setDrivingGoalHours] = useState(10);
  const [handshakeGoalHours, setHandshakeGoalHours] = useState(30);
  const [deadlineAmount, setDeadlineAmount] = useState(2000);
  const [deadlineDate, setDeadlineDate] = useState("");
  const [view, setView] = useState("dashboard");

  useEffect(() => {
    const savedItems = localStorage.getItem("daytracker_items");
    const savedMoneyGoal = localStorage.getItem("daytracker_money_goal");
    const savedSchoolGoal = localStorage.getItem("daytracker_school_goal");
    const savedDrivingGoal = localStorage.getItem("daytracker_driving_goal");
    const savedHandshakeGoal = localStorage.getItem("daytracker_handshake_goal");
    const savedDeadlineAmount = localStorage.getItem("daytracker_deadline_amount");
    const savedDeadlineDate = localStorage.getItem("daytracker_deadline_date");

    if (savedItems) setItems(JSON.parse(savedItems));
    if (savedMoneyGoal) setMoneyGoal(Number(savedMoneyGoal));
    if (savedSchoolGoal) setSchoolGoalHours(Number(savedSchoolGoal));
    if (savedDrivingGoal) setDrivingGoalHours(Number(savedDrivingGoal));
    if (savedHandshakeGoal) setHandshakeGoalHours(Number(savedHandshakeGoal));
    if (savedDeadlineAmount) setDeadlineAmount(Number(savedDeadlineAmount));
    if (savedDeadlineDate) setDeadlineDate(savedDeadlineDate);
  }, []);

  useEffect(() => {
    localStorage.setItem("daytracker_items", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("daytracker_money_goal", String(moneyGoal));
  }, [moneyGoal]);

  useEffect(() => {
    localStorage.setItem("daytracker_school_goal", String(schoolGoalHours));
  }, [schoolGoalHours]);

  useEffect(() => {
    localStorage.setItem("daytracker_driving_goal", String(drivingGoalHours));
  }, [drivingGoalHours]);

  useEffect(() => {
    localStorage.setItem("daytracker_handshake_goal", String(handshakeGoalHours));
  }, [handshakeGoalHours]);

  useEffect(() => {
    localStorage.setItem("daytracker_deadline_amount", String(deadlineAmount));
  }, [deadlineAmount]);

  useEffect(() => {
    localStorage.setItem("daytracker_deadline_date", deadlineDate);
  }, [deadlineDate]);

  const totalEarned = useMemo(
    () =>
      items.reduce((sum, item) => {
        const earned = Number(item.actualEarnings || item.pay || item.targetEarnings || 0);
        return sum + earned;
      }, 0),
    [items]
  );

  const moneyRemaining = Math.max(moneyGoal - totalEarned, 0);

  const unfinished = useMemo(() => items.filter((item) => !item.completed), [items]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const aKey = `${a.dueDate || "9999-12-31"} ${a.startTime || "23:59"}`;
      const bKey = `${b.dueDate || "9999-12-31"} ${b.startTime || "23:59"}`;
      return aKey.localeCompare(bKey);
    });
  }, [items]);

  return (
    <div style={appStyle}>
      <Nav view={view} setView={setView} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 20px 60px" }}>
        <div
          style={{
            padding: 24,
            marginBottom: 20,
            borderRadius: 20,
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          }}
        >
          <h1 style={{ margin: 0, fontSize: 38, textAlign: "center" }}>
            Darcy Life Hub
          </h1>
          <p
            style={{
              marginTop: 10,
              textAlign: "center",
              fontSize: 16,
              opacity: 0.9,
            }}
          >
            One place for shops, school, driving, Handshake, and the rest of the circus.
          </p>

          <div
            style={{
              marginTop: 18,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
              gap: 12,
            }}
          >
            <GoalInput label="Weekly Money Goal" value={moneyGoal} onChange={setMoneyGoal} />
            <GoalInput label="School Hours Goal" value={schoolGoalHours} onChange={setSchoolGoalHours} />
            <GoalInput label="Driving Hours Goal" value={drivingGoalHours} onChange={setDrivingGoalHours} />
            <GoalInput label="Handshake Hours Goal" value={handshakeGoalHours} onChange={setHandshakeGoalHours} />
            <GoalInput label="$ Deadline Goal" value={deadlineAmount} onChange={setDeadlineAmount} />
            <label style={{ fontSize: 14, opacity: 0.9 }}>
              Deadline Date
              <input
                type="date"
                value={deadlineDate}
                onChange={(e) => setDeadlineDate(e.target.value)}
                style={goalInputStyle}
              />
            </label>
          </div>
        </div>

        {view === "dashboard" && (
          <Dashboard
            items={sortedItems}
            unfinished={unfinished}
            totalEarned={totalEarned}
            moneyGoal={moneyGoal}
            moneyRemaining={moneyRemaining}
            schoolGoalHours={schoolGoalHours}
            drivingGoalHours={drivingGoalHours}
            handshakeGoalHours={handshakeGoalHours}
            deadlineAmount={deadlineAmount}
            deadlineDate={deadlineDate}
            setItems={setItems}
          />
        )}

        {view === "add" && (
          <ItemForm onAdd={(item) => setItems((prev) => [...prev, item])} />
        )}

        {view === "calendar" && (
          <CalendarView items={sortedItems} setItems={setItems} />
        )}
      </div>
    </div>
  );
}

function GoalInput({ label, value, onChange }) {
  return (
    <label style={{ fontSize: 14, opacity: 0.9 }}>
      {label}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value || 0))}
        style={goalInputStyle}
      />
    </label>
  );
}

const goalInputStyle = {
  marginTop: 8,
  width: "100%",
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.08)",
  color: "white",
};
