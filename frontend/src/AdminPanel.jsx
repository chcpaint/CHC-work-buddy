import { useState, useEffect, useRef, useCallback } from "react";

// ─── Config ───────────────────────────────────────────────────
const API_BASE = import.meta?.env?.VITE_API_URL || "https://chc-work-buddy-production-5b0e.up.railway.app";

const TABS = [
  { slug: "vehicle-disassembly", label: "Vehicle Disassembly",   icon: "🔧", color: "#f97316" },
  { slug: "auto-body-repairs",   label: "Auto Body Repairs",     icon: "🔨", color: "#ef4444" },
  { slug: "painting",            label: "Painting",              icon: "🎨", color: "#8b5cf6" },
  { slug: "reassembly",          label: "Reassembly",            icon: "⚙️",  color: "#3b82f6" },
  { slug: "detailing-qc",        label: "Detailing & QC",        icon: "✅", color: "#22c55e" },
];

const DOC_TYPES = ["sds", "tech_sheet", "manual", "procedure", "checklist", "other"];
const LANGS = [{ value: "en", label: "English" }, { value: "fr", label: "Français" }, { value: "es", label: "Español" }];

// ─── Helpers ──────────────────────────────────────────────────
function fmt(bytes) {
  if (!bytes) return "—";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}
function ago(ts) {
  if (!ts) return "—";
  const s = (Date.now() - new Date(ts)) / 1000;
  if (s < 60) return "just now";
  if (s < 3600) return Math.floor(s / 60) + "m ago";
  if (s < 86400) return Math.floor(s / 3600) + "h ago";
  return Math.floor(s / 86400) + "d ago";
}
const typeColor = { sds: "#ef4444", tech_sheet: "#8b5cf6", manual: "#3b82f6", procedure: "#f97316", checklist: "#22c55e", other: "#64748b" };

// ─── API client ───────────────────────────────────────────────
function useApi(token) {
  const req = useCallback(async (path, opts = {}) => {
    const res = await fetch(`${API_BASE}${path}`, {
      ...opts,
      headers: { Authorization: `Bearer ${token}`, ...(opts.headers || {}) },
    });
    if (!res.ok) throw new Error((await res.json()).error || "Request failed");
    return res.json();
  }, [token]);
  return req;
}

// ─── Sub-components ───────────────────────────────────────────

function StatCard({ icon, label, value, sub, color, trend }) {
  return (
    <div style={{
      background: "rgba(10,18,32,0.7)",
      border: `1px solid ${color}33`,
      borderLeft: `3px solid ${color}`,
      borderRadius: 10,
      padding: "18px 20px",
      display: "flex", flexDirection: "column", gap: 6,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", right: 16, top: 14, fontSize: 28, opacity: 0.12 }}>{icon}</div>
      <div style={{ color: "#64748b", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700 }}>{label}</div>
      <div style={{ color: "#f1f5f9", fontSize: 28, fontWeight: 900, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ color: "#475569", fontSize: 11 }}>{sub}</div>}
      {trend != null && (
        <div style={{ color: trend >= 0 ? "#22c55e" : "#ef4444", fontSize: 11, fontWeight: 600 }}>
          {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}% this week
        </div>
      )}
    </div>
  );
}

function Badge({ type }) {
  return (
    <span style={{
      padding: "2px 8px", borderRadius: 20,
      background: `${typeColor[type] || "#64748b"}22`,
      border: `1px solid ${typeColor[type] || "#64748b"}44`,
      color: typeColor[type] || "#64748b",
      fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5,
    }}>{type?.replace("_", " ")}</span>
  );
}

function TabBadge({ slug }) {
  const t = TABS.find(t => t.slug === slug);
  if (!t) return <span style={{ color: "#475569", fontSize: 11 }}>—</span>;
  return (
    <span style={{
      padding: "2px 8px", borderRadius: 20,
      background: `${t.color}15`,
      border: `1px solid ${t.color}33`,
      color: t.color, fontSize: 10, fontWeight: 700,
    }}>{t.icon} {t.label}</span>
  );
}

function DropZone({ onFile, accept, children }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();
  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => { e.preventDefault(); setDragging(false); onFile(e.dataTransfer.files[0]); }}
      style={{
        border: `2px dashed ${dragging ? "#f97316" : "#1e3a5f"}`,
        borderRadius: 12,
        padding: "32px 20px",
        textAlign: "center",
        cursor: "pointer",
        background: dragging ? "rgba(249,115,22,0.05)" : "rgba(10,18,32,0.4)",
        transition: "all 0.2s",
      }}
    >
      <input ref={inputRef} type="file" accept={accept} style={{ display: "none" }}
        onChange={e => e.target.files[0] && onFile(e.target.files[0])} />
      {children}
    </div>
  );
}

function Toast({ toasts }) {
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          padding: "12px 18px",
          borderRadius: 10,
          background: t.type === "error" ? "rgba(239,68,68,0.15)" : "rgba(34,197,94,0.15)",
          border: `1px solid ${t.type === "error" ? "#ef4444" : "#22c55e"}55`,
          color: t.type === "error" ? "#fca5a5" : "#86efac",
          fontSize: 13,
          backdropFilter: "blur(10px)",
          animation: "slideIn 0.3s ease",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          {t.type === "error" ? "⚠️" : "✅"} {t.message}
        </div>
      ))}
    </div>
  );
}

function Modal({ title, onClose, children, width = 560 }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 500,
      background: "rgba(0,0,0,0.75)",
      display: "flex", alignItems: "center", justifyContent: "center",
      backdropFilter: "blur(6px)",
    }} onClick={onClose}>
      <div style={{
        width: `min(95vw, ${width}px)`,
        maxHeight: "90vh",
        overflow: "auto",
        background: "#080f1c",
        border: "1px solid #1e3a5f",
        borderRadius: 16,
        padding: 28,
        boxShadow: "0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(249,115,22,0.08)",
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <h3 style={{ color: "#f1f5f9", margin: 0, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 18, letterSpacing: 1, textTransform: "uppercase" }}>
            {title}
          </h3>
          <button onClick={onClose} style={{ background: "none", border: "1px solid #1e3a5f", borderRadius: 6, color: "#64748b", width: 30, height: 30, cursor: "pointer", fontSize: 14 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {label && <label style={{ color: "#64748b", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700 }}>{label}</label>}
      <input {...props} style={{
        padding: "10px 14px",
        borderRadius: 8,
        border: "1px solid #1e3a5f",
        background: "rgba(10,18,32,0.6)",
        color: "#e2e8f0",
        fontSize: 13,
        outline: "none",
        fontFamily: "'Barlow', sans-serif",
        width: "100%",
        ...(props.style || {}),
      }} />
    </div>
  );
}

function Select({ label, children, ...props }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {label && <label style={{ color: "#64748b", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700 }}>{label}</label>}
      <select {...props} style={{
        padding: "10px 14px",
        borderRadius: 8,
        border: "1px solid #1e3a5f",
        background: "rgba(10,18,32,0.8)",
        color: "#e2e8f0",
        fontSize: 13,
        outline: "none",
        fontFamily: "'Barlow', sans-serif",
        cursor: "pointer",
        width: "100%",
      }}>{children}</select>
    </div>
  );
}

function Btn({ children, variant = "primary", onClick, disabled, style: s }) {
  const styles = {
    primary: { background: "linear-gradient(135deg, #f97316, #ea580c)", color: "white", border: "none", boxShadow: "0 4px 15px rgba(249,115,22,0.25)" },
    secondary: { background: "transparent", color: "#94a3b8", border: "1px solid #1e3a5f" },
    danger: { background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid #ef444433" },
    success: { background: "rgba(34,197,94,0.1)", color: "#4ade80", border: "1px solid #22c55e33" },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "9px 18px", borderRadius: 8,
      fontSize: 12, fontWeight: 700, letterSpacing: 1,
      textTransform: "uppercase", cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      fontFamily: "'Barlow Condensed', sans-serif",
      transition: "all 0.2s",
      display: "inline-flex", alignItems: "center", gap: 6,
      whiteSpace: "nowrap",
      ...styles[variant],
      ...s,
    }}>{children}</button>
  );
}

// ─── SECTION: Dashboard ───────────────────────────────────────
function Dashboard({ stats, recentDocs, recentUsers }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <SectionTitle>System Overview</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          <StatCard icon="📄" label="Total Documents" value={stats.docs ?? "—"} color="#3b82f6" sub="Across all tabs" />
          <StatCard icon="🎬" label="Media Items" value={stats.media ?? "—"} color="#8b5cf6" sub="Videos & slideshows" />
          <StatCard icon="👥" label="Active Users" value={stats.users ?? "—"} color="#22c55e" sub="Registered accounts" />
          <StatCard icon="💬" label="AI Queries Today" value={stats.queries ?? "—"} color="#f97316" sub="Total agent calls" />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Recent uploads */}
        <div style={{ background: "rgba(10,18,32,0.5)", border: "1px solid #1e3a5f", borderRadius: 12, padding: 20 }}>
          <div style={{ color: "#64748b", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>Recent Uploads</div>
          {(recentDocs || []).length === 0 ? (
            <div style={{ color: "#334155", fontSize: 12, textAlign: "center", padding: "20px 0" }}>No documents yet</div>
          ) : (recentDocs || []).slice(0, 6).map(d => (
            <div key={d.id} style={{ display: "flex", gap: 10, alignItems: "center", padding: "8px 0", borderBottom: "1px solid #0f1e35" }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>{d.doc_type === "sds" ? "⚠️" : "📄"}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: "#cbd5e1", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.title}</div>
                <div style={{ color: "#475569", fontSize: 10, marginTop: 1 }}>{ago(d.created_at)}</div>
              </div>
              <Badge type={d.doc_type} />
            </div>
          ))}
        </div>

        {/* Tab breakdown */}
        <div style={{ background: "rgba(10,18,32,0.5)", border: "1px solid #1e3a5f", borderRadius: 12, padding: 20 }}>
          <div style={{ color: "#64748b", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, marginBottom: 14 }}>Content by Workflow Tab</div>
          {TABS.map(tab => {
            const count = stats.byTab?.[tab.slug] || 0;
            const max = Math.max(...TABS.map(t => stats.byTab?.[t.slug] || 0), 1);
            return (
              <div key={tab.slug} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ width: 16, fontSize: 12 }}>{tab.icon}</span>
                <div style={{ color: "#94a3b8", fontSize: 11, width: 120, flexShrink: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{tab.label}</div>
                <div style={{ flex: 1, height: 6, background: "#0f1e35", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(count / max) * 100}%`, background: tab.color, borderRadius: 3, transition: "width 0.5s ease" }} />
                </div>
                <div style={{ color: "#475569", fontSize: 11, width: 24, textAlign: "right" }}>{count}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── SECTION: Document Upload ─────────────────────────────────
function UploadDocument({ token, onSuccess, onToast }) {
  const api = useApi(token);
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", docType: "tech_sheet", tabSlug: "prep", language: "en", tags: "" });
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleFile = (f) => {
    setFile(f);
    if (!form.title) set("title", f.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "));
  };

  const handleSubmit = async () => {
    if (!file || !form.title) { onToast("Please select a file and enter a title", "error"); return; }
    setUploading(true);
    setProgress(10);
    try {
      const fd = new FormData();
      fd.append("file", file);
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      setProgress(40);
      const res = await fetch(`${API_BASE}/api/ingest/document`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      setProgress(80);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setProgress(100);
      onToast(`"${form.title}" uploaded — embedding in progress`, "success");
      setFile(null);
      setForm({ title: "", description: "", docType: "tech_sheet", tabSlug: "prep", language: "en", tags: "" });
      onSuccess?.();
    } catch (e) {
      onToast(e.message, "error");
    }
    setTimeout(() => { setUploading(false); setProgress(0); }, 600);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 700 }}>
      <SectionTitle>Upload Document</SectionTitle>

      {/* Drop zone */}
      <DropZone onFile={handleFile} accept=".pdf,.docx,.txt,.csv">
        {file ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
            <span style={{ fontSize: 32 }}>{file.name.endsWith(".pdf") ? "📕" : "📄"}</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 14 }}>{file.name}</div>
              <div style={{ color: "#64748b", fontSize: 12 }}>{fmt(file.size)}</div>
            </div>
            <button onClick={e => { e.stopPropagation(); setFile(null); }} style={{ background: "none", border: "1px solid #334155", borderRadius: 6, color: "#64748b", padding: "4px 10px", cursor: "pointer", fontSize: 11 }}>Remove</button>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 36, marginBottom: 8 }}>📂</div>
            <div style={{ color: "#94a3b8", fontSize: 14, fontWeight: 600 }}>Drop file here or click to browse</div>
            <div style={{ color: "#475569", fontSize: 12, marginTop: 4 }}>Supports PDF, DOCX, TXT · Max 50MB</div>
          </>
        )}
      </DropZone>

      {/* Metadata form */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <Input label="Document Title *" value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. PPG Envirobase SDS Sheet" />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <Input label="Description" value={form.description} onChange={e => set("description", e.target.value)} placeholder="Brief description of contents..." />
        </div>
        <Select label="Document Type *" value={form.docType} onChange={e => set("docType", e.target.value)}>
          {DOC_TYPES.map(t => <option key={t} value={t}>{t.replace("_", " ").toUpperCase()}</option>)}
        </Select>
        <Select label="Workflow Tab" value={form.tabSlug} onChange={e => set("tabSlug", e.target.value)}>
          <option value="">— All Tabs —</option>
          {TABS.map(t => <option key={t.slug} value={t.slug}>{t.icon} {t.label}</option>)}
        </Select>
        <Select label="Language" value={form.language} onChange={e => set("language", e.target.value)}>
          {LANGS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
        </Select>
        <Input label="Tags (comma-separated)" value={form.tags} onChange={e => set("tags", e.target.value)} placeholder="primer, safety, PPE..." />
      </div>

      {/* Progress bar */}
      {uploading && (
        <div style={{ height: 4, background: "#0f1e35", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #f97316, #fbbf24)", transition: "width 0.4s ease", borderRadius: 2 }} />
        </div>
      )}

      <div style={{ display: "flex", gap: 10 }}>
        <Btn onClick={handleSubmit} disabled={uploading || !file || !form.title}>
          {uploading ? "⏳ Uploading..." : "⬆ Upload & Embed"}
        </Btn>
        <Btn variant="secondary" onClick={() => { setFile(null); setForm({ title: "", description: "", docType: "tech_sheet", tabSlug: "prep", language: "en", tags: "" }); }}>
          Clear
        </Btn>
      </div>
    </div>
  );
}

// ─── SECTION: Document Library ────────────────────────────────
function DocumentLibrary({ token, onToast, refreshKey }) {
  const api = useApi(token);
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTab, setFilterTab] = useState("");
  const [filterType, setFilterType] = useState("");
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setLoading(true);
    api(`/api/documents?limit=100${filterTab ? `&tab=${filterTab}` : ""}${filterType ? `&type=${filterType}` : ""}`)
      .then(d => { setDocs(d.documents || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [filterTab, filterType, refreshKey]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api(`/api/ingest/document/${deleteTarget.id}`, { method: "DELETE" });
      setDocs(prev => prev.filter(d => d.id !== deleteTarget.id));
      onToast("Document removed", "success");
    } catch (e) {
      onToast(e.message, "error");
    }
    setDeleting(false);
    setDeleteTarget(null);
  };

  const filtered = docs.filter(d =>
    !search || d.title.toLowerCase().includes(search.toLowerCase()) || d.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <SectionTitle>Document Library</SectionTitle>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ flex: 1, minWidth: 200, background: "rgba(10,18,32,0.5)", border: "1px solid #1e3a5f", borderRadius: 8, display: "flex", alignItems: "center", gap: 8, padding: "0 12px" }}>
          <span style={{ color: "#475569" }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search documents..."
            style={{ background: "transparent", border: "none", outline: "none", color: "#e2e8f0", fontSize: 13, padding: "9px 0", fontFamily: "'Barlow', sans-serif", flex: 1 }} />
        </div>
        <select value={filterTab} onChange={e => setFilterTab(e.target.value)} style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid #1e3a5f", background: "rgba(10,18,32,0.8)", color: "#94a3b8", fontSize: 12, outline: "none", cursor: "pointer" }}>
          <option value="">All Tabs</option>
          {TABS.map(t => <option key={t.slug} value={t.slug}>{t.icon} {t.label}</option>)}
        </select>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid #1e3a5f", background: "rgba(10,18,32,0.8)", color: "#94a3b8", fontSize: 12, outline: "none", cursor: "pointer" }}>
          <option value="">All Types</option>
          {DOC_TYPES.map(t => <option key={t} value={t}>{t.replace("_", " ").toUpperCase()}</option>)}
        </select>
        <div style={{ color: "#475569", fontSize: 12 }}>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</div>
      </div>

      {/* Table */}
      <div style={{ border: "1px solid #1e3a5f", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 80px 80px", background: "rgba(10,18,32,0.8)", padding: "10px 16px", gap: 12 }}>
          {["Document", "Type", "Tab", "Language", "Size", ""].map(h => (
            <div key={h} style={{ color: "#475569", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700 }}>{h}</div>
          ))}
        </div>

        {loading ? (
          <div style={{ padding: 32, textAlign: "center", color: "#334155" }}>Loading documents...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "#334155" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>📂</div>
            No documents found
          </div>
        ) : filtered.map((doc, i) => (
          <div key={doc.id} style={{
            display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 80px 80px",
            padding: "12px 16px", gap: 12,
            alignItems: "center",
            background: i % 2 === 0 ? "transparent" : "rgba(10,18,32,0.3)",
            borderTop: "1px solid #0f1e35",
            transition: "background 0.15s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(59,130,246,0.05)"}
            onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(10,18,32,0.3)"}
          >
            <div>
              <div style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{doc.title}</div>
              {doc.description && <div style={{ color: "#475569", fontSize: 11, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{doc.description}</div>}
              <div style={{ color: "#334155", fontSize: 10, marginTop: 2 }}>{ago(doc.created_at)}</div>
            </div>
            <div><Badge type={doc.doc_type} /></div>
            <div><TabBadge slug={doc.tab_slug} /></div>
            <div style={{ color: "#64748b", fontSize: 11 }}>{LANGS.find(l => l.value === doc.language)?.label || doc.language}</div>
            <div style={{ color: "#475569", fontSize: 11 }}>{fmt(doc.file_size_bytes)}</div>
            <div style={{ display: "flex", gap: 6 }}>
              {doc.file_url && (
                <a href={doc.file_url} target="_blank" rel="noreferrer" style={{ color: "#3b82f6", fontSize: 11, textDecoration: "none", padding: "4px 8px", border: "1px solid #1e3a5f", borderRadius: 5 }}>View</a>
              )}
              <button onClick={() => setDeleteTarget(doc)} style={{ background: "none", border: "1px solid #ef444433", borderRadius: 5, color: "#f87171", padding: "4px 8px", cursor: "pointer", fontSize: 11 }}>Del</button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete confirm modal */}
      {deleteTarget && (
        <Modal title="Confirm Delete" onClose={() => setDeleteTarget(null)} width={440}>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
            Are you sure you want to remove <strong style={{ color: "#e2e8f0" }}>"{deleteTarget.title}"</strong>? This will also delete all its vector embeddings and it will no longer be searchable.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="secondary" onClick={() => setDeleteTarget(null)}>Cancel</Btn>
            <Btn variant="danger" onClick={handleDelete} disabled={deleting}>{deleting ? "Deleting..." : "Delete Document"}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── SECTION: Media Upload ────────────────────────────────────
function MediaManager({ token, onToast, refreshKey }) {
  const api = useApi(token);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", mediaType: "video", tabSlug: "prep", language: "en", fileUrl: "", tags: "", keywords: "", transcript: "" });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    api("/api/media?limit=50")
      .then(d => { setMedia(d.media || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [refreshKey]);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async () => {
    if (!form.title) { onToast("Title is required", "error"); return; }
    if (!file && !form.fileUrl) { onToast("Provide a file or URL", "error"); return; }
    setUploading(true);
    try {
      if (file) {
        const fd = new FormData();
        fd.append("file", file);
        Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));
        const res = await fetch(`${API_BASE}/api/ingest/media`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: fd,
        });
        if (!res.ok) throw new Error((await res.json()).error);
      } else {
        await api("/api/ingest/media", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      onToast(`"${form.title}" added`, "success");
      setShowUpload(false);
      setFile(null);
      setForm({ title: "", description: "", mediaType: "video", tabSlug: "prep", language: "en", fileUrl: "", tags: "", keywords: "", transcript: "" });
      api("/api/media?limit=50").then(d => setMedia(d.media || []));
    } catch (e) {
      onToast(e.message, "error");
    }
    setUploading(false);
  };

  const mediaTypeIcon = { video: "🎬", slideshow: "📊", image: "🖼️" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <SectionTitle>Media Library</SectionTitle>
        <Btn onClick={() => setShowUpload(!showUpload)}>
          {showUpload ? "✕ Cancel" : "+ Add Media"}
        </Btn>
      </div>

      {showUpload && (
        <div style={{ background: "rgba(10,18,32,0.5)", border: "1px solid #1e3a5f", borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
          <DropZone onFile={setFile} accept="video/*,.mp4,.mov,.pptx,.pdf">
            {file ? (
              <div style={{ color: "#e2e8f0" }}>📎 {file.name} <span style={{ color: "#64748b" }}>({fmt(file.size)})</span></div>
            ) : (
              <>
                <div style={{ fontSize: 28, marginBottom: 6 }}>🎬</div>
                <div style={{ color: "#94a3b8", fontSize: 13 }}>Drop video / slideshow or click to browse</div>
                <div style={{ color: "#475569", fontSize: 11, marginTop: 4 }}>— or enter a URL below —</div>
              </>
            )}
          </DropZone>

          {!file && (
            <Input label="OR — External URL (YouTube, Vimeo, hosted video)" value={form.fileUrl}
              onChange={e => set("fileUrl", e.target.value)} placeholder="https://..." />
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <Input label="Title *" value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. How to Apply Body Filler" />
            </div>
            <Select label="Media Type" value={form.mediaType} onChange={e => set("mediaType", e.target.value)}>
              <option value="video">🎬 Video</option>
              <option value="slideshow">📊 Slideshow</option>
              <option value="image">🖼️ Image</option>
            </Select>
            <Select label="Workflow Tab" value={form.tabSlug} onChange={e => set("tabSlug", e.target.value)}>
              <option value="">— All Tabs —</option>
              {TABS.map(t => <option key={t.slug} value={t.slug}>{t.icon} {t.label}</option>)}
            </Select>
            <Select label="Language" value={form.language} onChange={e => set("language", e.target.value)}>
              {LANGS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
            </Select>
            <div style={{ gridColumn: "1 / -1" }}>
              <Input label="Tags — comma separated (shown on cards, used for search)"
                value={form.tags} onChange={e => set("tags", e.target.value)}
                placeholder="body filler, repair, panel, filler application..." />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <Input label="Keywords — extra search terms (synonyms, product names)"
                value={form.keywords} onChange={e => set("keywords", e.target.value)}
                placeholder="Bondo, USC Duraglass, lightweight filler, polyester filler..." />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <label style={{ color: "#64748b", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700 }}>
                  Transcript / Notes — paste video transcript or step list for richer search
                </label>
                <textarea value={form.transcript} onChange={e => set("transcript", e.target.value)}
                  rows={3} placeholder="Optional: paste spoken content, steps, or description from the video for better AI search..."
                  style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #1e3a5f", background: "rgba(10,18,32,0.6)", color: "#e2e8f0", fontSize: 13, outline: "none", fontFamily: "'Barlow', sans-serif", resize: "vertical" }} />
              </div>
            </div>
          </div>
          <Btn onClick={handleSubmit} disabled={uploading}>{uploading ? "⏳ Uploading..." : "⬆ Add to Library"}</Btn>
        </div>
      )}

      {/* Media grid */}
      {loading ? (
        <div style={{ color: "#334155", padding: 32, textAlign: "center" }}>Loading media...</div>
      ) : media.length === 0 ? (
        <div style={{ border: "1px dashed #1e3a5f", borderRadius: 12, padding: 40, textAlign: "center", color: "#334155" }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🎬</div>No media uploaded yet
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
          {media.map(m => (
            <div key={m.id} style={{ background: "rgba(10,18,32,0.5)", border: "1px solid #1e3a5f", borderRadius: 12, overflow: "hidden" }}>
              <div style={{
                height: 120, background: "rgba(15,32,64,0.6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 40, position: "relative",
              }}>
                {m.thumbnail_url ? (
                  <img src={m.thumbnail_url} alt={m.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span>{mediaTypeIcon[m.media_type] || "📎"}</span>
                )}
                <div style={{
                  position: "absolute", top: 8, right: 8,
                  background: "rgba(0,0,0,0.7)", borderRadius: 6, padding: "2px 8px",
                  color: "#94a3b8", fontSize: 10, textTransform: "uppercase", letterSpacing: 1,
                }}>{m.media_type}</div>
              </div>
              <div style={{ padding: 14 }}>
                <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 13, marginBottom: 6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.title}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <TabBadge slug={m.tab_slug} />
                  <div style={{ color: "#334155", fontSize: 10 }}>{ago(m.created_at)}</div>
                </div>
                {m.file_url && (
                  <a href={m.file_url} target="_blank" rel="noreferrer" style={{ display: "block", marginTop: 10, color: "#3b82f6", fontSize: 11, textDecoration: "none" }}>↗ View / Play</a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── SECTION: User Management ─────────────────────────────────
function UserManagement({ token, onToast }) {
  const api = useApi(token);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api("/api/auth/users")
      .then(d => { setUsers(d.users || []); setLoading(false); })
      .catch(() => { setUsers([]); setLoading(false); });
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    setSaving(true);
    try {
      await api(`/api/auth/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
      onToast("Role updated", "success");
    } catch (e) {
      onToast("Failed to update role", "error");
    }
    setSaving(false);
  };

  const roleColor = { admin: "#ef4444", manager: "#f97316", employee: "#22c55e" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <SectionTitle>User Management</SectionTitle>

      <div style={{ background: "rgba(249,115,22,0.05)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 10, padding: "12px 16px", color: "#fed7aa", fontSize: 12, lineHeight: 1.5 }}>
        ⚠️ Users register via the main app. Manage roles here. Admins and Managers can upload documents and media. Employees have read-only access.
      </div>

      <div style={{ border: "1px solid #1e3a5f", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 100px", background: "rgba(10,18,32,0.8)", padding: "10px 16px", gap: 12 }}>
          {["User", "Role", "Language", "Last Active", "Actions"].map(h => (
            <div key={h} style={{ color: "#475569", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700 }}>{h}</div>
          ))}
        </div>

        {loading ? (
          <div style={{ padding: 32, textAlign: "center", color: "#334155" }}>Loading users...</div>
        ) : users.length === 0 ? (
          <div style={{ padding: 32, textAlign: "center", color: "#334155" }}>No users found. Users appear here after they register.</div>
        ) : users.map((u, i) => (
          <div key={u.id} style={{
            display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 100px",
            padding: "12px 16px", gap: 12, alignItems: "center",
            background: i % 2 === 0 ? "transparent" : "rgba(10,18,32,0.3)",
            borderTop: "1px solid #0f1e35",
          }}>
            <div>
              <div style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600 }}>{u.full_name || "—"}</div>
              <div style={{ color: "#475569", fontSize: 11 }}>{u.email}</div>
            </div>
            <div>
              <span style={{
                padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                background: `${roleColor[u.role] || "#64748b"}22`,
                border: `1px solid ${roleColor[u.role] || "#64748b"}44`,
                color: roleColor[u.role] || "#64748b",
              }}>{u.role}</span>
            </div>
            <div style={{ color: "#64748b", fontSize: 11 }}>{LANGS.find(l => l.value === u.preferred_language)?.label || "English"}</div>
            <div style={{ color: "#475569", fontSize: 11 }}>{ago(u.last_active_at)}</div>
            <div>
              <select
                value={u.role}
                onChange={e => handleRoleChange(u.id, e.target.value)}
                disabled={saving}
                style={{ padding: "5px 8px", borderRadius: 6, border: "1px solid #1e3a5f", background: "rgba(10,18,32,0.8)", color: "#94a3b8", fontSize: 11, outline: "none", cursor: "pointer" }}
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SECTION: Settings ────────────────────────────────────────
function Settings({ token, onToast }) {
  const [form, setForm] = useState({ shopName: "Body Shop Wiz", welcomeMessage: "Hi! I'm Max, your Body Shop Wiz assistant.", defaultLanguage: "en" });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 600 }}>
      <SectionTitle>System Settings</SectionTitle>

      <div style={{ background: "rgba(10,18,32,0.5)", border: "1px solid #1e3a5f", borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ color: "#f97316", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>General</div>
        <Input label="Shop Name" value={form.shopName} onChange={e => set("shopName", e.target.value)} />
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <label style={{ color: "#64748b", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700 }}>Max's Welcome Message</label>
          <textarea value={form.welcomeMessage} onChange={e => set("welcomeMessage", e.target.value)} rows={3}
            style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #1e3a5f", background: "rgba(10,18,32,0.6)", color: "#e2e8f0", fontSize: 13, outline: "none", fontFamily: "'Barlow', sans-serif", resize: "vertical" }} />
        </div>
        <Select label="Default Language" value={form.defaultLanguage} onChange={e => set("defaultLanguage", e.target.value)}>
          {LANGS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
        </Select>
        <Btn onClick={() => onToast("Settings saved", "success")}>💾 Save Settings</Btn>
      </div>

      <div style={{ background: "rgba(10,18,32,0.5)", border: "1px solid #1e3a5f", borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ color: "#f97316", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700 }}>Environment</div>
        {[
          { label: "Backend API", value: API_BASE, status: "✓" },
          { label: "Auth Provider", value: "Supabase", status: "✓" },
          { label: "Vector DB", value: "pgvector (Supabase)", status: "✓" },
          { label: "AI Model", value: "Claude claude-sonnet-4-20250514", status: "✓" },
          { label: "Embeddings", value: "OpenAI text-embedding-3-small", status: "✓" },
        ].map(row => (
          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #0f1e35" }}>
            <span style={{ color: "#64748b", fontSize: 12 }}>{row.label}</span>
            <span style={{ color: "#94a3b8", fontSize: 12, fontFamily: "monospace" }}>{row.value}</span>
            <span style={{ color: "#22c55e", fontSize: 11 }}>{row.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Shared: section title ────────────────────────────────────
function SectionTitle({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
      <div style={{ width: 3, height: 18, background: "#f97316", borderRadius: 2 }} />
      <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 17, letterSpacing: 2, textTransform: "uppercase", color: "#f1f5f9", margin: 0 }}>{children}</h2>
    </div>
  );
}

// ─── NAV ITEM ─────────────────────────────────────────────────
const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "◈" },
  { id: "upload",    label: "Upload Doc", icon: "⬆" },
  { id: "library",   label: "Library",    icon: "📚" },
  { id: "media",     label: "Media",      icon: "🎬" },
  { id: "users",     label: "Users",      icon: "👥" },
  { id: "settings",  label: "Settings",   icon: "⚙" },
];

// ─── MAIN ADMIN APP ───────────────────────────────────────────
export default function AdminPanel() {
  const [token, setToken] = useState(
    typeof localStorage !== "undefined" ? (localStorage.getItem("bsai_token") || "") : ""
  );
  const [authForm, setAuthForm] = useState({ email: "", password: "" });
  const [authError, setAuthError] = useState("");
  const [user, setUser] = useState(null);
  const [section, setSection] = useState("dashboard");
  const [toasts, setToasts] = useState([]);
  const [stats, setStats] = useState({});
  const [recentDocs, setRecentDocs] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4000);
  };

  const api = useApi(token);

  // Fetch stats
  useEffect(() => {
    if (!token) return;
    Promise.all([
      api("/api/documents?limit=100").catch(() => ({ documents: [] })),
      api("/api/media?limit=100").catch(() => ({ media: [] })),
    ]).then(([docsData, mediaData]) => {
      const docs = docsData.documents || [];
      const byTab = {};
      TABS.forEach(t => { byTab[t.slug] = docs.filter(d => d.tab_slug === t.slug).length; });
      setStats({ docs: docs.length, media: (mediaData.media || []).length, users: "—", queries: "—", byTab });
      setRecentDocs(docs.slice(0, 6));
    });
  }, [token, refreshKey]);

  const handleLogin = async () => {
    setAuthError("");
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authForm),
      });
      const data = await res.json();
      if (data.token) {
        if (!["admin", "manager"].includes(data.user?.role)) {
          setAuthError("Admin or Manager access required.");
          return;
        }
        setToken(data.token);
        setUser(data.user);
        if (typeof localStorage !== "undefined") localStorage.setItem("bsai_token", data.token);
      } else {
        setAuthError(data.error || "Login failed");
      }
    } catch {
      setAuthError("Connection error. Is the server running?");
    }
  };

  // ── Login screen ──────────────────────────────────────────
  if (!token) {
    return (
      <div style={{ minHeight: "100vh", background: "#060c17", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Barlow', sans-serif" }}>
        <style>{globalStyles}</style>
        <div style={{ position: "fixed", inset: 0 }}>
          {/* Grid overlay */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(249,115,22,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, width: "min(92vw, 400px)", background: "rgba(8,14,24,0.9)", border: "1px solid #1e3a5f", borderRadius: 16, padding: 36, backdropFilter: "blur(20px)", boxShadow: "0 30px 70px rgba(0,0,0,0.6)" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: "linear-gradient(135deg, #f97316, #ea580c)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, margin: "0 auto 14px", boxShadow: "0 8px 24px rgba(249,115,22,0.35)" }}>⚙</div>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 22, letterSpacing: 3, textTransform: "uppercase", color: "#f1f5f9", margin: 0 }}>
              ADMIN <span style={{ color: "#f97316" }}>PANEL</span>
            </h1>
            <p style={{ color: "#475569", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginTop: 5 }}>Body Shop Wiz · Restricted Access</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Input label="Email" type="email" value={authForm.email} onChange={e => setAuthForm(p => ({ ...p, email: e.target.value }))} onKeyDown={e => e.key === "Enter" && handleLogin()} />
            <Input label="Password" type="password" value={authForm.password} onChange={e => setAuthForm(p => ({ ...p, password: e.target.value }))} onKeyDown={e => e.key === "Enter" && handleLogin()} />
            {authError && <div style={{ color: "#fca5a5", fontSize: 12, padding: "8px 12px", background: "rgba(239,68,68,0.1)", borderRadius: 6, border: "1px solid #ef444433" }}>{authError}</div>}
            <button onClick={handleLogin} style={{ padding: "12px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #f97316, #ea580c)", color: "white", fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontFamily: "'Barlow Condensed', sans-serif", marginTop: 4, boxShadow: "0 4px 20px rgba(249,115,22,0.3)" }}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Admin Layout ─────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", height: "100vh", background: "#060c17", display: "flex", fontFamily: "'Barlow', sans-serif", overflow: "hidden", color: "#e2e8f0" }}>
      <style>{globalStyles}</style>

      {/* ── Sidebar ── */}
      <aside style={{
        width: 220,
        background: "rgba(8,14,24,0.95)",
        borderRight: "1px solid #0f1e35",
        display: "flex", flexDirection: "column",
        flexShrink: 0,
        backdropFilter: "blur(10px)",
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #0f1e35" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg, #f97316, #ea580c)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>⚙</div>
            <div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", color: "#f1f5f9", lineHeight: 1 }}>
                BODY<span style={{ color: "#f97316" }}>SHOP</span>
              </div>
              <div style={{ fontSize: 9, color: "#334155", letterSpacing: 2, textTransform: "uppercase" }}>ADMIN PANEL</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV.map(item => {
            const active = section === item.id;
            return (
              <button key={item.id} onClick={() => setSection(item.id)} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 12px", borderRadius: 8,
                border: "none",
                background: active ? "rgba(249,115,22,0.12)" : "transparent",
                color: active ? "#f97316" : "#64748b",
                fontSize: 13, fontWeight: active ? 700 : 500,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s",
                width: "100%",
              }}>
                <span style={{ fontSize: 14, width: 18, textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
                {item.label}
                {active && <div style={{ marginLeft: "auto", width: 3, height: 14, background: "#f97316", borderRadius: 2 }} />}
              </button>
            );
          })}
        </nav>

        {/* User info */}
        <div style={{ padding: "14px 16px", borderTop: "1px solid #0f1e35" }}>
          <div style={{ color: "#64748b", fontSize: 10, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Signed in as</div>
          <div style={{ color: "#94a3b8", fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: 8 }}>{user?.email || "Admin"}</div>
          <button onClick={() => { localStorage.removeItem("bsai_token"); setToken(""); setUser(null); }}
            style={{ width: "100%", padding: "7px", borderRadius: 7, border: "1px solid #1e3a5f", background: "transparent", color: "#475569", fontSize: 11, cursor: "pointer", letterSpacing: 1, textTransform: "uppercase" }}>
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <div style={{
          height: 52, display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 28px",
          background: "rgba(8,14,24,0.8)",
          borderBottom: "1px solid #0f1e35",
          backdropFilter: "blur(10px)",
          flexShrink: 0,
        }}>
          <div style={{ color: "#334155", fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>
            {NAV.find(n => n.id === section)?.icon} {" "}
            <span style={{ color: "#64748b" }}>{NAV.find(n => n.id === section)?.label}</span>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Btn variant="success" onClick={() => { setRefreshKey(p => p + 1); addToast("Refreshed", "success"); }} style={{ padding: "6px 14px", fontSize: 11 }}>↻ Refresh</Btn>
            <a href="/" style={{ textDecoration: "none" }}>
              <Btn variant="secondary" style={{ padding: "6px 14px", fontSize: 11 }}>← Main App</Btn>
            </a>
          </div>
        </div>

        {/* Grid background */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(249,115,22,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.015) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        {/* Page content */}
        <div style={{ flex: 1, padding: 28, position: "relative", zIndex: 1 }}>
          {section === "dashboard" && <Dashboard stats={stats} recentDocs={recentDocs} />}
          {section === "upload"    && <UploadDocument token={token} onSuccess={() => { setRefreshKey(p => p + 1); setSection("library"); }} onToast={addToast} />}
          {section === "library"   && <DocumentLibrary token={token} onToast={addToast} refreshKey={refreshKey} />}
          {section === "media"     && <MediaManager token={token} onToast={addToast} refreshKey={refreshKey} />}
          {section === "users"     && <UserManagement token={token} onToast={addToast} />}
          {section === "settings"  && <Settings token={token} onToast={addToast} />}
        </div>
      </main>

      <Toast toasts={toasts} />
    </div>
  );
}

// ─── Global styles ────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #060c17; overflow: hidden; }
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 4px; }
  @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
  button:hover { filter: brightness(1.1); }
  input:focus { border-color: #f97316 !important; }
  select:focus { border-color: #f97316 !important; }
`;
