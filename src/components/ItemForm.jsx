import React, { useState } from "react";

export default function ItemForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    category: "Mystery Shop",
    dueDate: "",
    estimatedHours: "",
    minimumHours: "",
    notes: ""
  });

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.title.trim()) return;

    onAdd({
      ...form,
      id: Date.now(),
      completed: false
    });

    setForm({
      title: "",
      category: "Mystery Shop",
      dueDate: "",
      estimatedHours: "",
      minimumHours: "",
      notes: ""
    });
  }

  const fieldStyle = {
    padding: 12,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    outline: "none",
    width: "100%"
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: 20,
        borderRadius: 18,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: 12
      }}
    >
      <h2>Add Task</h2>

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => updateField("title", e.target.value)}
        style={fieldStyle}
      />

      <select
        value={form.category}
        onChange={(e) => updateField("category", e.target.value)}
        style={fieldStyle}
      >
        <option>Mystery Shop</option>
        <option>School</option>
        <option>Driving</option>
        <option>Handshake / AI Work</option>
        <option>Personal</option>
      </select>

      <input
        type="date"
        value={form.dueDate}
        onChange={(e) => updateField("dueDate", e.target.value)}
        style={fieldStyle}
      />

      <input
        placeholder="Estimated hours"
        value={form.estimatedHours}
        onChange={(e) => updateField("estimatedHours", e.target.value)}
        style={fieldStyle}
      />

      <input
        placeholder="Minimum hours"
        value={form.minimumHours}
        onChange={(e) => updateField("minimumHours", e.target.value)}
        style={fieldStyle}
      />

      <textarea
        placeholder="Notes"
        value={form.notes}
        onChange={(e) => updateField("notes", e.target.value)}
        style={{ ...fieldStyle, minHeight: 100 }}
      />

      <button
        type="submit"
        style={{
          padding: 14,
          borderRadius: 14,
          border: "none",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Add Task
      </button>
    </form>
  );
}
