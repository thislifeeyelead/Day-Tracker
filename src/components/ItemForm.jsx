
import React, { useState } from "react";

export default function ItemForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    platform: "IntelliShop",
    category: "Mystery Shop",
    date: "",
    time: "",
    pay: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;

    onAdd({
      ...form,
      id: Date.now(),
      checklist: {
        guidelines: false,
        visit: false,
        report: false,
      },
    });

    setForm({
      title: "",
      platform: "IntelliShop",
      category: "Mystery Shop",
      date: "",
      time: "",
      pay: "",
    });
  }

  const fieldStyle = {
    padding: 12,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    outline: "none",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: 20,
        borderRadius: 18,
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        style={fieldStyle}
      />

      <div style={{ display: "flex", gap: 10 }}>
        <select
          value={form.platform}
          onChange={(e) => setForm({ ...form, platform: e.target.value })}
          style={{ ...fieldStyle, flex: 1 }}
        >
          <option>IntelliShop</option>
          <option>Presto</option>
          <option>iSecretShop</option>
          <option>Market Force</option>
          <option>BestMark</option>
          <option>GigSpot</option>
          <option>Uber</option>
          <option>Lyft</option>
          <option>Roadie</option>
          <option>Shipt</option>
          <option>School</option>
          <option>Personal</option>
        </select>

        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          style={{ ...fieldStyle, flex: 1 }}
        >
          <option>Mystery Shop</option>
          <option>Delivery</option>
          <option>School</option>
          <option>Work</option>
          <option>Personal</option>
        </select>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          style={{ ...fieldStyle, flex: 1 }}
        />

        <input
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          style={{ ...fieldStyle, flex: 1 }}
        />
      </div>

      <input
        placeholder="Pay"
        value={form.pay}
        onChange={(e) => setForm({ ...form, pay: e.target.value })}
        style={fieldStyle}
      />

      <button
        type="submit"
        style={{
          padding: 14,
          borderRadius: 14,
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color: "white",
          boxShadow: "0 8px 20px rgba(99,102,241,0.35)",
        }}
      >
        Add Job
      </button>
    </form>
  );
}
