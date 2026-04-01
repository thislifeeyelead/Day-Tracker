import React from "react";

export default function Dashboard({
  items,
  unfinished,
  totalEarned,
  moneyGoal,
  moneyRemaining,
  schoolGoalHours,
  drivingGoalHours,
  handshakeGoalHours,
  deadlineAmount,
  deadlineDate,
  setItems
}) {
  const now = new Date();
  const hourNow = now.getHours();

  const completedCount = items.filter((i) => i.completed).length;
  const openCount = items.filter((i) => !i.completed).length;
  const mustDoToday = items.filter((i) => i.mustDoToday && !i.completed).length;

  const schoolPlanned = sumHours(items, "School", "estimatedHours", "minimumHours");
  const schoolCompleted = sumCompletedHours(items, "School");

  const drivingPlanned = sumHoursMulti(items, ["Driving", "Delivery"], ["targetHours", "estimatedHours", "minimumHours"]);
  const drivingCompleted = sumCompletedHoursMulti(items, ["Driving", "Delivery"]);

  const handshakePlanned = sumHours(items, "Handshake / AI Work", "estimatedHours", "minimumHours");
  const handshakeCompleted = sumCompletedHours(items, "Handshake / AI Work");

  const schoolRemaining = Math.max(schoolGoalHours - schoolCompleted, 0);
  const drivingRemaining = Math.max(drivingGoalHours - drivingCompleted, 0);
  const handshakeRemaining = Math.max(handshakeGoalHours - handshakeCompleted, 0);

  const minSchoolHours = sumHours(items.filter((i) => !i.completed), "School", "minimumHours");
  const minDrivingHours = sumHoursMulti(items.filter((i) => !i.completed), ["Driving", "Delivery"], ["minimumHours"]);
  const minDrivingEarnings = sumMoneyMulti(items.filter((i) => !i.completed), ["Driving", "Delivery"], ["minimumEarnings"]);
  const minHandshakeHours = sumHours(items.filter((i) => !i.completed), "Handshake / AI Work", "minimumHours");

  const deadlineInfo = getDeadlineInfo(deadlineAmount, deadlineDate, totalEarned);
  const nextMove = getNextMove({
    hourNow,
    schoolRemaining,
    drivingRemaining,
    handshakeRemaining,
    mustDoToday,
    moneyRemaining,
    deadlineInfo
  });

  function autoAddBlock(type) {
    const today = formatDateLocal(new Date());

    const templates = {
      school: {
        category: "School",
        title: "School focus block",
        className: "School",
        assignmentTitle: "School focus block",
        dueDate: today,
        estimatedHours: "2",
        minimumHours: "1",
        mustDoToday: true,
        priority: "High",
        notes: "Auto-added school block",
        completed: false,
        checklist: { guidelines: false, visit: false, report: false }
      },
      driving: {
        category: "Driving",
        title: "Driving block",
        platform: "Uber / Lyft / gigs",
        dueDate: today,
        startTime: "",
        endTime: "",
        targetHours: "4",
        minimumHours: "2",
        targetEarnings: "80",
        minimumEarnings: "40",
        mustDoToday: true,
        priority: "High",
        zone: "Auto-added driving block",
        notes: "Auto-added driving block",
        completed: false,
        checklist: { guidelines: false, visit: false, report: false }
      },
      handshake: {
        category: "Handshake / AI Work",
        title: "Handshake / AI work block",
        workCompany: "Handshake / AI",
        dueDate: today,
        estimatedHours: "2",
        minimumHours: "1",
        mustDoToday: true,
        priority: "High",
        notes: "Auto-added Handshake block",
        completed: false,
        checklist: { guidelines: false, visit: false, report: false }
      }
    };

    const payload = templates[type];
    if (!payload) return;

    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...payload
      }
    ]);
  }

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

      <div style={{ display: "flex", gap: 15, marginBottom: 25, flexWrap: "wrap" }}>
        <Card label="Earned" value={`$${totalEarned}`} color="#22c55e" />
        <Card label="Money Goal" value={`$${moneyGoal}`} color="#3b82f6" />
        <Card label="Money Left" value={`$${moneyRemaining}`} color="#ef4444" />
        <Card label="Open" value={openCount} color="#6366f1" />
        <Card label="Finished" value={completedCount} color="#10b981" />
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
          marginBottom: 20,
        }}
      >
        <h3 style={{ marginTop: 0 }}>Next Move</h3>
        <div style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
          {nextMove.headline}
        </div>
        <div style={{ opacity: 0.85, marginBottom: 12 }}>{nextMove.detail}</div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button onClick={() => autoAddBlock("school")} style={actionBtn}>
            Add School Block
          </button>
          <button onClick={() => autoAddBlock("driving")} style={actionBtn}>
            Add Driving Block
          </button>
          <button onClick={() => autoAddBlock("handshake")} style={actionBtn}>
            Add Handshake Block
          </button>
        </div>
      </div>

      <div
        style={{
          padding: 20,
          borderRadius: 16,
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
          marginBottom: 20,
        }}
      >
        <h3 style={{ marginTop: 0 }}>Income Deadline Countdown</h3>
        <div style={{ marginBottom: 8 }}>Goal by deadline: ${deadlineAmount || 0}</div>
        <div style={{ marginBottom: 8 }}>Earned so far: ${totalEarned || 0}</div>
        <div style={{ marginBottom: 8 }}>Still needed: ${deadlineInfo.remaining}</div>
        <div style={{ marginBottom: 8 }}>Days left: {deadlineInfo.daysLeft}</div>
        <div style={{ marginBottom: 8 }}>Need per day: ${deadlineInfo.perDay}</div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 15,
          marginBottom: 20,
        }}
      >
        <GoalCard
          title="School Hours"
          planned={schoolPlanned}
          completed={schoolCompleted}
          goal={schoolGoalHours}
          remaining={schoolRemaining}
          color="#f59e0b"
        />
        <GoalCard
          title="Driving Hours"
          planned={drivingPlanned}
          completed={drivingCompleted}
          goal={drivingGoalHours}
          remaining={drivingRemaining}
          color="#3b82f6"
        />
        <GoalCard
          title="Handshake Hours"
          planned={handshakePlanned}
          completed={handshakeCompleted}
          goal={handshakeGoalHours}
          remaining={handshakeRemaining}
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
          marginBottom: 20,
        }}
      >
        <h3 style={{ marginTop: 0 }}>Minimum Expectations Still Owed</h3>
        <div style={{ marginBottom: 8 }}>School minimum hours: {minSchoolHours || 0}</div>
        <div style={{ marginBottom: 8 }}>Driving / delivery minimum hours: {minDrivingHours || 0}</div>
        <div style={{ marginBottom: 8 }}>Driving / delivery minimum earnings: ${minDrivingEarnings || 0}</div>
        <div style={{ marginBottom: 8 }}>Handshake / AI minimum hours: {minHandshakeHours || 0}</div>
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
        <h3 style={{ marginTop: 0 }}>Next Open Tasks</h3>

        {unfinished.length === 0 ? (
          <div style={{ opacity: 0.8 }}>Nothing unfinished. Miracles happen.</div>
        ) : (
          unfinished.slice(0, 6).map((item) => (
            <div
              key={item.id}
              style={{
                padding: "12px 0",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
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

function GoalCard({ title, planned, completed, goal, remaining, color }) {
  const percent = goal > 0 ? Math.min((completed / goal) * 100, 100) : 0;

  return (
    <div
      style={{
        padding: 18,
        borderRadius: 16,
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${color}`,
        boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: 10 }}>{title}</div>
      <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 6 }}>
        Planned: {planned}
      </div>
      <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 8 }}>
        Completed: {completed} / Goal: {goal}
      </div>
      <div
        style={{
          height: 10,
          borderRadius: 999,
          background: "rgba(255,255,255,0.08)",
          overflow: "hidden",
          marginBottom: 8,
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: color,
          }}
        />
      </div>
      <div style={{ fontSize: 13, opacity: 0.8 }}>Remaining: {remaining}</div>
    </div>
  );
}

const actionBtn = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  color: "white",
  fontWeight: "bold"
};

function sumHours(items, category, primaryKey, fallbackKey) {
  return items
    .filter((i) => i.category === category)
    .reduce((sum, i) => sum + Number(i[primaryKey] || i[fallbackKey] || 0), 0);
}

function sumHoursMulti(items, categories, keys) {
  return items
    .filter((i) => categories.includes(i.category))
    .reduce((sum, i) => {
      for (const key of keys) {
        if (i[key]) return sum + Number(i[key] || 0);
      }
      return sum;
    }, 0);
}

function sumMoneyMulti(items, categories, keys) {
  return items
    .filter((i) => categories.includes(i.category))
    .reduce((sum, i) => {
      for (const key of keys) {
        if (i[key]) return sum + Number(i[key] || 0);
      }
      return sum;
    }, 0);
}

function sumCompletedHours(items, category) {
  return items
    .filter((i) => i.category === category && i.completed)
    .reduce((sum, i) => sum + Number(i.actualHours || i.estimatedHours || i.minimumHours || 0), 0);
}

function sumCompletedHoursMulti(items, categories) {
  return items
    .filter((i) => categories.includes(i.category) && i.completed)
    .reduce((sum, i) => sum + Number(i.actualHours || i.targetHours || i.estimatedHours || i.minimumHours || 0), 0);
}

function getDeadlineInfo(deadlineAmount, deadlineDate, totalEarned) {
  const remaining = Math.max(Number(deadlineAmount || 0) - Number(totalEarned || 0), 0);

  if (!deadlineDate) {
    return {
      remaining,
      daysLeft: "—",
      perDay: "—"
    };
  }

  const today = new Date();
  const end = new Date(deadlineDate + "T23:59:59");
  const diff = end.getTime() - today.getTime();
  const daysLeft = Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
  const safeDays = Math.max(daysLeft, 1);
  const perDay = remaining > 0 ? Math.ceil((remaining / safeDays) * 100) / 100 : 0;

  return { remaining, daysLeft, perDay };
}

function getNextMove({
  hourNow,
  schoolRemaining,
  drivingRemaining,
  handshakeRemaining,
  mustDoToday,
  moneyRemaining,
  deadlineInfo
}) {
  if (mustDoToday > 0) {
    return {
      headline: `You still have ${mustDoToday} must-do-today item${mustDoToday === 1 ? "" : "s"}.`,
      detail: "Start there first. No cute productivity theater."
    };
  }

  if (hourNow >= 14 && schoolRemaining > 0 && drivingRemaining === 0 && handshakeRemaining === 0) {
    return {
      headline: `It’s after 2pm and school hours are still behind.`,
      detail: `You still owe ${schoolRemaining} school hour${schoolRemaining === 1 ? "" : "s"}.`
    };
  }

  if (hourNow >= 12 && drivingRemaining > 0) {
    return {
      headline: `You should be in a driving block right now.`,
      detail: `You still owe ${drivingRemaining} driving hour${drivingRemaining === 1 ? "" : "s"}.`
    };
  }

  if (hourNow >= 10 && handshakeRemaining > 0 && schoolRemaining === 0 && drivingRemaining === 0) {
    return {
      headline: `Do Handshake / AI work next.`,
      detail: `You still owe ${handshakeRemaining} hour${handshakeRemaining === 1 ? "" : "s"} there.`
    };
  }

  if (deadlineInfo.daysLeft !== "—" && deadlineInfo.remaining > 0) {
    return {
      headline: `You still need $${deadlineInfo.remaining} by your deadline.`,
      detail: `That means about $${deadlineInfo.perDay} per day for the next ${deadlineInfo.daysLeft} day${deadlineInfo.daysLeft === 1 ? "" : "s"}.`
    };
  }

  return {
    headline: "You’re on track.",
    detail: "Now do the next useful block before you wander off."
  };
}

function formatDateLocal(date) {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}
