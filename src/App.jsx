
import React, { useEffect, useMemo, useState } from "react";
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";
import ItemForm from "./components/ItemForm";
import CalendarView from "./components/CalendarView";

const appStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #0f172a, #1e293b)",
  minHeight: "100vh",
  color: "white",
  fontFamily: "system-ui, sans-serif",
};

export type Checklist = {
  guidelines: boolean;
  visit: boolean;
  report: boolean;
};

export type HubItem = {
  id: number;
  title: string;
  platform: string;
  category: string;
  date: string;
  time: string;
  pay: string;
  checklist: Checklist;
};

export default function App() {
  const [items, setItems] = useState<HubItem[]>([]);
  const [goal, setGoal] = useState<number>(200);
  const [view, setView] = useState<"dashboard" | "add" | "calendar">("dashboard");

  useEffect(() => {
    const savedItems = localStorage.getItem("darcy_v5_items");
    const savedGoal = localStorage.getItem("darcy_v5_goal");

    if (savedItems) setItems(JSON.parse(savedItems));
    if (savedGoal) setGoal(Number(savedGoal));
  }, []);

  useEffect(() => {
    localStorage.setItem("darcy_v5_items", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("darcy_v5_goal", String(goal));
  }, [goal]);

  const total = useMemo(
    () => items.reduce((sum, i) => sum + Number(i.pay || 0), 0),
    [items]
  );

  const remaining = Math.max(goal - total, 0);

  const unfinished = useMemo(
    () =>
      items.filter(
        (i) =>
          !i.checklist.guidelines ||
          !i.checklist.visit ||
          !i.checklist.report
      ),
    [items]
  );

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const aKey = `${a.date || "9999-12-31"} ${a.time || "23:59"}`;
      const bKey = `${b.date || "9999-12-31"} ${b.time || "23:59"}`;
      return aKey.localeCompare(bKey);
    });
  }, [items]);

  return (
    <div style={appStyle}>
      <Nav view={view} setView={setView} />

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "20px 20px 60px" }}>
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
          <h1 style={{ margin: 0, fontSize: 42, textAlign: "center" }}>
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
            One place for mystery shops, gigs, school, car schedule, lunch, and the rest of the circus.
          </p>

          <div style={{ marginTop: 18, textAlign: "center" }}>
            <label style={{ fontSize: 14, opacity: 0.8 }}>
              Weekly Goal
              <input
                type="number"
                value={goal}
                onChange={(e) => setGoal(Number(e.target.value || 0))}
                style={{
                  marginLeft: 10,
                  width: 90,
                  padding: "8px 10px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                }}
              />
            </label>
          </div>
        </div>

        {view === "dashboard" && (
          <Dashboard
            items={sortedItems}
            total={total}
            remaining={remaining}
            unfinished={unfinished}
          />
        )}

        {view === "add" && (
          <ItemForm
            onAdd={(item) => setItems((prev) => [...prev, item])}
          />
        )}

        {view === "calendar" && (
          <CalendarView items={sortedItems} setItems={setItems} />
        )}
      </div>
    </div>
  );
}
