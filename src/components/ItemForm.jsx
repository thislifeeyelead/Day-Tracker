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

const CATEGORY_OPTIONS = [
  "Mystery Shop",
  "Driving",
  "School",
  "Handshake / AI Work",
  "Delivery",
  "Personal",
  "Admin",
  "Car / Errands"
];

const DEFAULTS_BY_CATEGORY = {
  "Mystery Shop": {
    estimatedHours: "1",
    minimumHours: "1",
    minimumEarnings: "",
    targetHours: "",
    targetEarnings: "",
    mustDoToday: false
  },
  "School": {
    estimatedHours: "2",
    minimumHours: "1",
    minimumEarnings: "",
    targetHours: "",
    targetEarnings: "",
    mustDoToday: false
  },
  "Driving": {
    estimatedHours: "",
    minimumHours: "2",
    minimumEarnings: "40",
    targetHours: "4",
    targetEarnings: "80",
    mustDoToday: false
  },
  "Delivery": {
    estimatedHours: "",
    minimumHours: "2",
    minimumEarnings: "40",
    targetHours: "4",
    targetEarnings: "80",
    mustDoToday: false
  },
  "Handshake / AI Work": {
    estimatedHours: "2",
    minimumHours: "1",
    minimumEarnings: "",
    targetHours: "",
    targetEarnings: "",
    mustDoToday: false
  },
  "Personal": {
    estimatedHours: "0.5",
    minimumHours: "0.5",
    minimumEarnings: "",
    targetHours: "",
    targetEarnings: "",
    mustDoToday: false
  },
  "Admin": {
    estimatedHours: "0.5",
    minimumHours: "0.5",
    minimumEarnings: "",
    targetHours: "",
    targetEarnings: "",
    mustDoToday: false
  },
  "Car / Errands": {
    estimatedHours: "0.5",
    minimumHours: "0.5",
    minimumEarnings: "",
    targetHours: "",
    targetEarnings: "",
    mustDoToday: false
  }
};

function makeInitialForm() {
  return {
    category: "Mystery Shop",

    title: "",
    notes: "",
    dueDate: "",
    estimatedHours: "1",
    minimumHours: "1",
    minimumEarnings: "",
    mustDoToday: false,
    priority: "Normal",
    completed: false,
    actualHours: "",
    actualEarnings: "",

    company: "IntelliShop",
    companyUrl: "https://www.insite.intelli-shop.com/shoppers/",
    shopUrl: "",
    jobId: "",
    taskType: "",
    assignedDate: "",
    startTime: "",
    endTime: "",
    address: "",
    pay: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",

    className: "",
    assignmentTitle: "",
    submissionLink: "",

    platform: "",
    zone: "",
    targetHours: "",
    targetEarnings: "",

    workCompany: "",
    payoutType: "",
    hourlyRate: "",
    taskLink: ""
  };
}

export default function ItemForm({ onAdd }) {
  const [form, setForm] = useState(makeInitialForm());

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

  function handleCategoryChange(value) {
    const defaults = DEFAULTS_BY_CATEGORY[value] || {};
    setForm((prev) => ({
      ...prev,
      category: value,
      estimatedHours: defaults.estimatedHours ?? prev.estimatedHours,
      minimumHours: defaults.minimumHours ?? prev.minimumHours,
      minimumEarnings: defaults.minimumEarnings ?? prev.minimumEarnings,
      targetHours: defaults.targetHours ?? prev.targetHours,
      targetEarnings: defaults.targetEarnings ?? prev.targetEarnings,
      mustDoToday: defaults.mustDoToday ?? prev.mustDoToday
    }));
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
    if (!form.title.trim() && !form.assignmentTitle.trim()) return;

    const finalTitle =
      form.category === "School"
        ? form.assignmentTitle || form.title
        : form.title || form.assignmentTitle;

    onAdd({
      ...form,
      title: finalTitle,
      id: Date.now(),
      completed: false,
      checklist: {
        guidelines: false,
        visit: false,
        report: false
      }
    });

    setForm(makeInitialForm());
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

      <select
        value={form.category}
        onChange={(e) => handleCategoryChange(e.target.value)}
        style={fieldStyle}
      >
        {CATEGORY_OPTIONS.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>

      {form.category !== "School" && (
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          style={fieldStyle}
        />
      )}

      {form.category === "School" && (
        <>
          <input placeholder="Class name" value={form.className} onChange={(e) => updateField("className", e.target.value)} style={fieldStyle} />
          <input placeholder="Assignment title" value={form.assignmentTitle} onChange={(e) => updateField("assignmentTitle", e.target.value)} style={fieldStyle} />
          <input type="date" value={form.dueDate} onChange={(e) => updateField("dueDate", e.target.value)} style={fieldStyle} />
          <div style={{ display: "flex", gap: 10 }}>
            <input placeholder="Estimated hours" value={form.estimatedHours} onChange={(e) => updateField("estimatedHours", e.target.value)} style={{ ...fieldStyle, flex: 1 }} />
            <input placeholder="Minimum hours today" value={form.minimumHours} onChange={(e) => updateField("minimumHours", e.target.value)} style={{ ...fieldStyle, flex: 1 }} />
          </div>
          <input placeholder="Submission link" value={form.submissionLink} onChange={(e) => updateField("submissionLink", e.target.value)} style={fieldStyle} />
        </>
      )}

      {form.category === "Mystery Shop" && (
        <>
          <div style={{ display: "flex", gap: 10 }}>
            <select value={form.company} onChange={(e) => handleCompanyChange(e.target.value)} style={{ ...fieldStyle, flex: 1 }}>
              {COMPANY_OPTIONS.map((company) => (
                <option key={company.name}>{company.name}</option>
              ))}
            </select>
            <input placeholder="Task type" value={form.taskType} onChange={(e) => updateField("taskType", e.target.value)} style={{ ...fieldStyle, flex: 1 }} />
          </div>

          <input placeholder="Company portal URL" value={form.companyUrl} onChange={(e) => updateField("companyUrl", e.target.value)} style={fieldStyle} />
          <input placeholder="Specific shop / task URL" value={form.shopUrl} onChange={(e) => updateField("shopUrl", e.target.value)} style={fieldStyle} />

          <div style={{ display: "flex", gap: 10 }}>
            <input placeholder="Job ID" value={form.jobId} onChange={(e) => updateField("jobId", e.target.value)} style={{ ...fieldStyle, flex: 1 }} />
            <input placeholder="Pay" value={form.pay} onChange={(e) => updateField("pay", e.target.value)} style={{ ...fieldStyle, flex: 1 }} />
          </div>

          <input placeholder="Address" value={form.address} onChange={(e) => updateField("address", e.target.value)} style={fieldStyle} />

          <div style={{ display: "flex", gap: 10 }}>
            <input type="date" value={form.assignedDate} onChange={(e) => updateField("assignedDate", e.target.value)} style={{ ...fieldStyle, flex: 1 }} />
            <input type="date" value={form.dueDate} onChange={(e) => updateField("dueDate", e.target.value)} style={{ ...fieldStyle, flex: 1 }} />
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <input type="time" value={form.startTime} onChange={(e) => updateField("startTime", e.target.value)} style={{ ...fieldStyle, flex: 1 }} />
            <input type="time" value={form.endTime} onChange={(e) => updateField("endTime", e.target.value)} style={{ ...fieldStyle, flex: 1 }} />
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <input placeholder="Contact name" value={form.contactName} onChange={(e) => updateField("contactName", e.target.value)} style={{ ...fieldStyle, flex: 1 }} />
            <input placeholder="Contact phone" value={form.contactPhone} onChange={(e) => updateField("contactPhone", e.target.value)} style={{ ...fieldStyle, flex: 1 }} />
          </div>

          <input placeholder="Contact email" value={form.contactEmail} onChange={(e) => updateField("contactEmail", e.target.value)} style={fieldStyle} />
        </>
      )}

      {(form.category === "Driving" || form.category === "Delivery") && (
        <>
          <input placeholder="Platform" value={form.platform} onChange={(e) => updateField("platform", e.target.value)} style={fieldStyle} />
          <div style={{ display: "flex", gap: 10 }}>
            <input type="time" value={form.startTime} onChange={(e) => updateField("startTime", e.target.value)} style={{ ...fieldStyle, flex: 1 }} />
            <input type="time" value={form.endTime} onChange={(e) => updateField("endTime", e.target.value)} style={{ ...fieldStyle, flex: 1 }} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <input placeholder="Target hours" value={form.targetHours} onChange={(e) => updateField("targetHours", e.target.value)} style={{ ...fieldStyle, flex: 1 }} />
            <input placeholder="Target earnings" value={form.targetEarnings} onChange={(e) => updateField("targetEarnings", e.target.value)} style={{ ...fieldStyle, flex: 1 }} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <input placeholder="Minimum hours" value={form.minimumHours} onChange={(e) => updateField("minimumHours", e.target.value)} style={{ ...fieldStyle, flex: 1 }} />
            <input placeholder="Minimum earnings" value={form.minimumEarnings} onChange={(e) => updateField("minimumEarnings", e.target.value)} style={{ ...fieldStyle, flex: 1 }} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <input placeholder="Actual hours" value={form.actualHours} onChange={(e) => updateField("actualHours", e.target.value)} style={{ ...fieldStyle, flex: 1 }} />
            <input placeholder="Actual earnings" value={form.actualEarnings} onChange={(e) => updateField("actualEarnings", e.target.value)} style={{ ...fieldStyle, flex: 1 }} />
          </div>
          <input placeholder="Area / zone notes" value={form.zone} onChange={(e) => updateField("zone", e.target.value)} style={fieldStyle} />
          <input type="date" value={form.dueDate} onChange={(e) => updateField("dueDate", e.target.value)} style={fieldStyle} />
        </>
      )}

      {form.category === "Handshake / AI Work" && (
        <>
          <input placeholder="Company / platform" value={form.workCompany} onChange={(e) => updateField("workCompany", e.target.value)} style={fieldStyle} />
          <input placeholder="Task link" value={form.taskLink} onChange={(e) => updateField("taskLink", e.target.value)} style={fieldStyle} />
          <div style={{ display: "flex", gap: 10 }}>
            <input placeholder="Hourly rate or payout" value={form.hourlyRate} onChange={(e) => updateField("hourlyRate", e.target.value)} style={{ ...fieldStyle, flex: 1 }} />
            <input placeholder="Minimum hours" value={form.minimumHours} onChange={(e) => updateField("minimumHours", e.target.value)} style={{ ...fieldStyle, flex: 1 }} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <input placeholder="Actual hours" value={form.actualHours} onChange={(e) => updateField("actualHours", e.target.value)} style={{ ...fieldStyle, flex: 1 }} />
            <input placeholder="Actual earnings" value={form.actualEarnings} onChange={(e) => updateField("actualEarnings", e.target.value)} style={{ ...fieldStyle, flex: 1 }} />
          </div>
          <input type="date" value={form.dueDate} onChange={(e) => updateField("dueDate", e.target.value)} style={fieldStyle} />
        </>
      )}

      {form.category !== "School" &&
        form.category !== "Mystery Shop" &&
        form.category !== "Driving" &&
        form.category !== "Delivery" &&
        form.category !== "Handshake / AI Work" && (
          <>
            <input type="date" value={form.dueDate} onChange={(e) => updateField("dueDate", e.target.value)} style={fieldStyle} />
            <div style={{ display: "flex", gap: 10 }}>
              <input placeholder="Estimated hours" value={form.estimatedHours} onChange={(e) => updateField("estimatedHours", e.target.value)} style={{ ...fieldStyle, flex: 1 }} />
              <input placeholder="Actual hours" value={form.actualHours} onChange={(e) => updateField("actualHours", e.target.value)} style={{ ...fieldStyle, flex: 1 }} />
            </div>
          </>
        )}

      <div style={{ display: "flex", gap: 10 }}>
        <select value={form.priority} onChange={(e) => updateField("priority", e.target.value)} style={{ ...fieldStyle, flex: 1 }}>
          <option>Low</option>
          <option>Normal</option>
          <option>High</option>
          <option>Critical</option>
        </select>

        <label
          style={{
            ...fieldStyle,
            display: "flex",
            alignItems: "center",
            gap: 8,
            flex: 1
          }}
        >
          <input type="checkbox" checked={form.mustDoToday} onChange={(e) => updateField("mustDoToday", e.target.checked)} />
          Must do today
        </label>
      </div>

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
