import React, { useMemo, useState } from "react";

const COMPANY_OPTIONS = [
  { name: "Presto Shopper", url: "https://insta.prestomobilesurveys.com/site/Map/p/athpower" },
  { name: "ISecretShop", url: "https://www.isecretshop.com/shop/assigned" },
  { name: "CXE", url: "https://www.cxeview.com/shoppers/ShopperLog.norm.php" },
  { name: "CSA / Consumer Service Analysis", url: "https://www.sassieshop.com/2csa/shoppers/LoginShopper.norm.php" },
  { name: "Intouch / SeeLevel HX", url: "https://portal.seelevelhx.com/shoppers/LoginShopper.norm.php" },
  { name: "KSS", url: "https://www.sassieshop.com/2kern/shoppers/LoginShopper.norm.php" },
  { name: "Reality Based Group", url: "https://www.realitybasedreports.com/shoppers/LoginShopper.norm.php" },
  { name: "Mystery Shoppers", url: "https://www.sassieshop.com/2mysteryshoppers/shoppers/LoginShopper.norm.php" },
  { name: "Customer Impact", url: "https://www.ci-gateway.com/shoppers/LoginShopper.norm.php" },
  { name: "IntelliShop", url: "https://www.insite.intelli-shop.com/shoppers/" },
  { name: "Storecheckers", url: "https://www.my.storecheckers.co.uk/shoppers/LoginShopper.norm.php" },
  { name: "HS Brands", url: "https://www.mymysteryshop.com/shoppers/LoginShopper.php" },
  { name: "Market Viewpoint", url: "https://www.mysteryshopping.marketviewpoint.com/shoppers/LoginShopper.norm.php" },
  { name: "Ipsos", url: "https://www.us-sassie.ipsosmysteryshopping.com/shoppers/LoginShopper.php" },
  { name: "Data Quest", url: "https://www.sassieshop.com/2dq/shoppers/LoginShopper.norm.php" },
  { name: "Shoppers Inc", url: "https://www.sassieshop.com/2si/shoppers/LoginShopper.norm.php" },
  { name: "ath Power Consulting", url: "http://prestomap.com/p/athpower" },
  { name: "BARE", url: "https://www.sassieshop.com/2bareusa/index.norm.php" },
  { name: "Other", url: "" }
];

export default function ItemForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    company: "IntelliShop",
    companyUrl: "https://www.insite.intelli-shop.com/shoppers/",
    platform: "Mystery Shop",
    category: "Mystery Shop",
    taskType: "",
    jobId: "",
    assignedDate: "",
    dueDate: "",
    startTime: "",
    endTime: "",
    address: "",
    pay: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    shopUrl: "",
    notes: ""
  });

  const fieldStyle = useMemo(
    () => ({
      padding: 12,
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.15)",
      background: "rgba(255,255,255,0.06)",
      color: "white",
      outline: "none",
      width: "100%"
    }),
    []
  );

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleCompanyChange(value) {
    const found = COMPANY_OPTIONS.find((c) => c.name === value);
    setForm((prev) => ({
      ...prev,
      company: value,
      companyUrl: found?.url || ""
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;

    onAdd({
      ...form,
      id: Date.now(),
      checklist: {
        guidelines: false,
        visit: false,
        report: false
      }
    });

    setForm({
      title: "",
      company: "IntelliShop",
      companyUrl: "https://www.insite.intelli-shop.com/shoppers/",
      platform: "Mystery Shop",
      category: "Mystery Shop",
      taskType: "",
      jobId: "",
      assignedDate: "",
      dueDate: "",
      startTime: "",
      endTime: "",
      address: "",
      pay: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      shopUrl: "",
      notes: ""
    });
  }

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
        gap: 12
      }}
    >
      <h2 style={{ margin: 0 }}>Add Task</h2>

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => updateField("title", e.target.value)}
        style={fieldStyle}
      />

      <div style={{ display: "flex", gap: 10 }}>
        <select
          value={form.company}
          onChange={(e) => handleCompanyChange(e.target.value)}
          style={{ ...fieldStyle, flex: 1 }}
        >
          {COMPANY_OPTIONS.map((company) => (
            <option key={company.name}>{company.name}</option>
          ))}
        </select>

        <select
          value={form.category}
          onChange={(e) => updateField("category", e.target.value)}
          style={{ ...fieldStyle, flex: 1 }}
        >
          <option>Mystery Shop</option>
          <option>Delivery</option>
          <option>School</option>
          <option>Work</option>
          <option>Personal</option>
        </select>
      </div>

      <input
        placeholder="Company portal URL"
        value={form.companyUrl}
        onChange={(e) => updateField("companyUrl", e.target.value)}
        style={fieldStyle}
      />

      <input
        placeholder="Specific shop / task URL"
        value={form.shopUrl}
        onChange={(e) => updateField("shopUrl", e.target.value)}
        style={fieldStyle}
      />

      <div style={{ display: "flex", gap: 10 }}>
        <input
          placeholder="Job ID"
          value={form.jobId}
          onChange={(e) => updateField("jobId", e.target.value)}
          style={{ ...fieldStyle, flex: 1 }}
        />
        <input
          placeholder="Task type"
          value={form.taskType}
          onChange={(e) => updateField("taskType", e.target.value)}
          style={{ ...fieldStyle, flex: 1 }}
        />
      </div>

      <input
        placeholder="Address"
        value={form.address}
        onChange={(e) => updateField("address", e.target.value)}
        style={fieldStyle}
      />

      <div style={{ display: "flex", gap: 10 }}>
        <input
          type="date"
          value={form.assignedDate}
          onChange={(e) => updateField("assignedDate", e.target.value)}
          style={{ ...fieldStyle, flex: 1 }}
        />
        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => updateField("dueDate", e.target.value)}
          style={{ ...fieldStyle, flex: 1 }}
        />
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <input
          type="time"
          value={form.startTime}
          onChange={(e) => updateField("startTime", e.target.value)}
          style={{ ...fieldStyle, flex: 1 }}
        />
        <input
          type="time"
          value={form.endTime}
          onChange={(e) => updateField("endTime", e.target.value)}
          style={{ ...fieldStyle, flex: 1 }}
        />
      </div>

      <input
        placeholder="Pay"
        value={form.pay}
        onChange={(e) => updateField("pay", e.target.value)}
        style={fieldStyle}
      />

      <div style={{ display: "flex", gap: 10 }}>
        <input
          placeholder="Contact name"
          value={form.contactName}
          onChange={(e) => updateField("contactName", e.target.value)}
          style={{ ...fieldStyle, flex: 1 }}
        />
        <input
          placeholder="Contact phone"
          value={form.contactPhone}
          onChange={(e) => updateField("contactPhone", e.target.value)}
          style={{ ...fieldStyle, flex: 1 }}
        />
      </div>

      <input
        placeholder="Contact email"
        value={form.contactEmail}
        onChange={(e) => updateField("contactEmail", e.target.value)}
        style={fieldStyle}
      />

      <textarea
        placeholder="Notes"
        value={form.notes}
        onChange={(e) => updateField("notes", e.target.value)}
        style={{ ...fieldStyle, minHeight: 100, resize: "vertical" }}
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
          boxShadow: "0 8px 20px rgba(99,102,241,0.35)"
        }}
      >
        Add Task
      </button>
    </form>
  );
}
