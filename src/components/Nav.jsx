
import React from "react";

export default function Nav({ view, setView }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        padding: 16,
        justifyContent: "center",
      }}
    >
      {["dashboard", "add", "calendar"].map((v) => (
        <button
          key={v}
          onClick={() => setView(v)}
          style={{
            padding: "10px 18px",
            borderRadius: 999,
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            letterSpacing: 0.5,
            background:
              view === v
                ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                : "rgba(255,255,255,0.08)",
            color: "white",
            boxShadow:
              view === v
                ? "0 4px 15px rgba(99,102,241,0.4)"
                : "none",
          }}
        >
          {v.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
