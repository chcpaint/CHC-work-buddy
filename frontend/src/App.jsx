import { useState, useEffect, useRef, useCallback } from "react";

// ─── Constants ────────────────────────────────────────────────
const TABS = [
  { slug: "admin-intake",  label: { en: "Admin / Intake",   fr: "Admin / Réception", es: "Admin / Recepción" },  icon: "📋", color: "#3b82f6" },
  { slug: "disassemble",   label: { en: "Disassemble",      fr: "Démontage",          es: "Desmontaje" },          icon: "🔧", color: "#f97316" },
  { slug: "prep",          label: { en: "Prep",             fr: "Préparation",        es: "Preparación" },         icon: "🎯", color: "#eab308" },
  { slug: "body-work",     label: { en: "Body Work",        fr: "Carrosserie",        es: "Carrocería" },          icon: "⚒️",  color: "#ef4444" },
  { slug: "primer-paint",  label: { en: "Primer & Paint",   fr: "Apprêt & Peinture",  es: "Imprimación" },         icon: "🎨", color: "#8b5cf6" },
  { slug: "detailing",     label: { en: "Detailing",        fr: "Finition",           es: "Detallado" },           icon: "✨", color: "#06b6d4" },
  { slug: "hand-back",     label: { en: "Hand Back",        fr: "Remise Client",      es: "Entrega" },             icon: "🤝", color: "#22c55e" },
];

const API_BASE = import.meta.env.VITE_API_URL || "https://chc-work-buddy-production-5b0e.up.railway.app";

// ─── Theme Colors ─────────────────────────────────────────────
const themes = {
  dark: {
    bg: "#0a0e1a",
    surface: "rgba(15, 25, 50, 0.6)",
    surfaceLight: "rgba(20, 35, 65, 0.4)",
    border: "rgba(6, 182, 212, 0.15)",
    borderLight: "rgba(51, 65, 85, 0.3)",
    accentPrimary: "#06b6d4",
    accentSecondary: "#f97316",
    textPrimary: "#e2e8f0",
    textSecondary: "#94a3b8",
    glow: "0 0 20px rgba(6,182,212,0.3)",
  },
  light: {
    bg: "#f0f4f8",
    surface: "rgba(255,255,255,0.8)",
    surfaceLight: "rgba(240, 244, 248, 0.6)",
    border: "rgba(0,0,0,0.08)",
    borderLight: "rgba(0,0,0,0.05)",
    accentPrimary: "#0891b2",
    accentSecondary: "#ea580c",
    textPrimary: "#1e293b",
    textSecondary: "#64748b",
    glow: "0 0 20px rgba(8,145,178,0.2)",
  },
};

// ─── Avatar Component ─────────────────────────────────────────
function MaxAvatar({ isSpeaking, isListening, language, onLanguageChange, theme = "dark" }) {
  const [mouthOpen, setMouthOpen] = useState(false);
  const [eyeBlink, setEyeBlink] = useState(false);
  const colors = themes[theme];

  useEffect(() => {
    if (!isSpeaking) { setMouthOpen(false); return; }
    const interval = setInterval(() => setMouthOpen(p => !p), 150 + Math.random() * 150);
    return () => clearInterval(interval);
  }, [isSpeaking]);

  useEffect(() => {
    const blink = setInterval(() => {
      setEyeBlink(true);
      setTimeout(() => setEyeBlink(false), 120);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(blink);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      {/* Avatar SVG */}
      <div style={{
        position: "relative",
        width: 120, height: 120,
        borderRadius: "50%",
        background: "linear-gradient(145deg, #1e3a5f, #0f2040)",
        border: `3px solid ${isListening ? "#22c55e" : isSpeaking ? colors.accentSecondary : "#334155"}`,
        boxShadow: isListening
          ? "0 0 20px rgba(34,197,94,0.5), 0 0 40px rgba(34,197,94,0.2)"
          : isSpeaking
          ? `0 0 20px rgba(249,115,22,0.5), 0 0 40px rgba(249,115,22,0.2)`
          : "0 4px 20px rgba(0,0,0,0.5)",
        transition: "all 0.3s ease",
        overflow: "hidden",
        cursor: "pointer",
        animation: "shimmer 3s ease-in-out infinite",
      }}>
        <svg viewBox="0 0 120 120" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
          {/* Background */}
          <rect width="120" height="120" fill="#0f2040" rx="60" />

          {/* Neck */}
          <rect x="46" y="80" width="28" height="20" rx="6" fill="#c8956c" />

          {/* Shirt/collar */}
          <rect x="20" y="95" width="80" height="30" rx="8" fill="#1e3a5f" />
          <polygon points="55,95 65,95 60,108" fill="white" opacity="0.9" />

          {/* Head */}
          <ellipse cx="60" cy="55" rx="28" ry="30" fill="#c8956c" />

          {/* Hair - salt & pepper, short */}
          <path d="M32 45 Q34 25 60 22 Q86 25 88 45 Q84 30 60 28 Q36 30 32 45Z" fill="#4a4a4a" />
          <path d="M34 38 Q33 30 38 27" stroke="#6a6a6a" strokeWidth="2" fill="none" />
          <path d="M86 38 Q87 30 82 27" stroke="#6a6a6a" strokeWidth="2" fill="none" />

          {/* Ears */}
          <ellipse cx="32" cy="55" rx="5" ry="7" fill="#b8845c" />
          <ellipse cx="88" cy="55" rx="5" ry="7" fill="#b8845c" />

          {/* Eyes */}
          <ellipse cx="48" cy="52" rx="8" ry={eyeBlink ? 1 : 6} fill="white" />
          <ellipse cx="72" cy="52" rx="8" ry={eyeBlink ? 1 : 6} fill="white" />
          <circle cx="50" cy="53" r="3.5" fill="#3d2b1f" />
          <circle cx="74" cy="53" r="3.5" fill="#3d2b1f" />
          <circle cx="51" cy="51" r="1" fill="white" />
          <circle cx="75" cy="51" r="1" fill="white" />
          {/* Eyebrows */}
          <path d="M41 44 Q48 41 55 44" stroke="#3a3a3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M65 44 Q72 41 79 44" stroke="#3a3a3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Nose */}
          <path d="M58 55 Q56 62 58 65 Q60 67 62 65 Q64 62 62 55" stroke="#a06040" strokeWidth="1.5" fill="none" />

          {/* Mouth */}
          <path
            d={mouthOpen
              ? "M50 74 Q60 82 70 74 Q60 78 50 74Z"
              : "M50 73 Q60 78 70 73"}
            stroke="#8b4040" strokeWidth="2" fill={mouthOpen ? "#5a1a1a" : "none"} strokeLinecap="round"
          />
          {/* Teeth visible when talking */}
          {mouthOpen && <rect x="54" y="74" width="12" height="4" rx="1" fill="white" opacity="0.9" />}

          {/* Slight smile lines / character */}
          <path d="M44 68 Q46 70 44 72" stroke="#a06040" strokeWidth="1" fill="none" />
          <path d="M76 68 Q74 70 76 72" stroke="#a06040" strokeWidth="1" fill="none" />

          {/* Status ring */}
          {isListening && (
            <circle cx="60" cy="60" r="58" fill="none" stroke="#22c55e" strokeWidth="3" opacity="0.6" strokeDasharray="20 10" />
          )}
        </svg>

        {/* Listening pulse rings */}
        {isListening && [1, 2, 3].map(i => (
          <div key={i} style={{
            position: "absolute", inset: 0,
            borderRadius: "50%",
            border: "2px solid rgba(34,197,94,0.4)",
            animation: `ping ${0.8 + i * 0.4}s ease-out infinite`,
            animationDelay: `${i * 0.2}s`,
          }} />
        ))}
      </div>

      {/* Name + Status */}
      <div style={{ textAlign: "center" }}>
        <div style={{ color: colors.textPrimary, fontWeight: 700, fontSize: 14, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 2, textTransform: "uppercase" }}>
          MAX
        </div>
        <div style={{ color: isListening ? "#22c55e" : isSpeaking ? colors.accentSecondary : colors.textSecondary, fontSize: 10, letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>
          {isListening ? "Listening..." : isSpeaking ? "Speaking..." : "Ready"}
        </div>
      </div>

      {/* Language buttons */}
      <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
        {["en", "fr", "es"].map(lang => (
          <button
            key={lang}
            onClick={() => onLanguageChange(lang)}
            style={{
              padding: "3px 8px",
              borderRadius: 4,
              border: `1px solid ${language === lang ? colors.accentSecondary : colors.borderLight}`,
              background: language === lang ? `${colors.accentSecondary}22` : "transparent",
              color: language === lang ? colors.accentSecondary : colors.textSecondary,
              fontSize: 10,
              fontWeight: 700,
              cursor: "pointer",
              textTransform: "uppercase",
              letterSpacing: 1,
              transition: "all 0.2s",
            }}
          >
            {lang}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Voice Input Button ───────────────────────────────────────
function VoiceButton({ isListening, onToggle, disabled, theme = "dark" }) {
  const colors = themes[theme];
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      style={{
        width: 52, height: 52,
        borderRadius: "50%",
        border: `2px solid ${isListening ? "#22c55e" : colors.borderLight}`,
        background: isListening ? "rgba(34,197,94,0.15)" : colors.surfaceLight,
        color: isListening ? "#22c55e" : colors.textSecondary,
        fontSize: 20,
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        flexShrink: 0,
        boxShadow: isListening ? "0 0 15px rgba(34,197,94,0.3)" : "0 4px 12px rgba(0,0,0,0.1)",
        transform: "scale(1)",
      }}
      onMouseEnter={(e) => { e.target.style.transform = "scale(1.05)"; }}
      onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; }}
      title={isListening ? "Stop listening" : "Start voice input"}
    >
      {isListening ? "⏹" : "🎤"}
    </button>
  );
}

// ─── Search Bar ───────────────────────────────────────────────
function SearchBar({ value, onChange, onSearch, loading, currentTab, theme = "dark" }) {
  const colors = themes[theme];
  return (
    <div style={{
      display: "flex", gap: 8, alignItems: "center",
      background: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: 12,
      padding: "10px 16px",
      backdropFilter: "blur(20px)",
      boxShadow: `0 4px 20px rgba(0,0,0,0.08)`,
      transition: "all 0.3s ease",
    }}>
      <span style={{ fontSize: 16, opacity: 0.6 }}>🔍</span>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => e.key === "Enter" && onSearch()}
        placeholder="Search documents, SDS sheets, procedures..."
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          outline: "none",
          color: colors.textPrimary,
          fontSize: 14,
          fontFamily: "'Barlow', sans-serif",
        }}
      />
      {loading && <span style={{ color: colors.accentSecondary, fontSize: 12, animation: "spin 1s linear infinite" }}>⏳</span>}
      <button
        onClick={onSearch}
        style={{
          padding: "6px 16px",
          borderRadius: 8,
          border: `1px solid ${colors.accentSecondary}`,
          background: `${colors.accentSecondary}15`,
          color: colors.accentSecondary,
          fontSize: 12,
          fontWeight: 700,
          cursor: "pointer",
          letterSpacing: 1,
          textTransform: "uppercase",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = `${colors.accentSecondary}25`;
          e.target.style.boxShadow = `0 0 12px ${colors.accentSecondary}40`;
        }}
        onMouseLeave={(e) => {
          e.target.style.background = `${colors.accentSecondary}15`;
          e.target.style.boxShadow = "none";
        }}
      >
        Search
      </button>
    </div>
  );
}

// ─── Document Card ────────────────────────────────────────────
function DocCard({ doc, onClick, theme = "dark" }) {
  const colors = themes[theme];
  const typeColors = {
    sds: "#ef4444", tech_sheet: "#8b5cf6", manual: "#3b82f6",
    procedure: colors.accentSecondary, checklist: "#22c55e", other: colors.textSecondary,
  };
  return (
    <div
      onClick={onClick}
      style={{
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: 14,
        padding: 16,
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        display: "flex", gap: 12, alignItems: "flex-start",
        backdropFilter: "blur(20px)",
        boxShadow: `0 4px 20px rgba(0,0,0,0.08), inset 1px 1px 0 ${colors.border}`,
        transform: "translateY(0)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
        e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.15), inset 1px 1px 0 ${colors.border}`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = `0 4px 20px rgba(0,0,0,0.08), inset 1px 1px 0 ${colors.border}`;
      }}
    >
      <span style={{ fontSize: 24, minWidth: 32 }}>
        {doc.doc_type === "sds" ? "⚠️" : doc.doc_type === "tech_sheet" ? "📊" : doc.doc_type === "video" ? "🎬" : "📄"}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: colors.textPrimary, fontWeight: 600, fontSize: 13, marginBottom: 6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {doc.title}
        </div>
        {doc.description && (
          <div style={{ color: colors.textSecondary, fontSize: 11, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: 8 }}>
            {doc.description}
          </div>
        )}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <span style={{
            padding: "4px 10px", borderRadius: 20,
            background: `${typeColors[doc.doc_type] || colors.textSecondary}15`,
            border: `1px solid ${typeColors[doc.doc_type] || colors.textSecondary}40`,
            color: typeColors[doc.doc_type] || colors.textSecondary,
            fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5,
          }}>
            {doc.doc_type?.replace("_", " ")}
          </span>
          {doc.similarity && (
            <span style={{ color: colors.textSecondary, fontSize: 10, display: "flex", alignItems: "center", gap: 4 }}>
              ✓ {doc.similarity}% match
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Video Card ───────────────────────────────────────────────
function VideoCard({ item, onClick, theme = "dark" }) {
  const colors = themes[theme];
  const [hovered, setHovered] = useState(false);
  const durationLabel = item.duration_seconds
    ? `${Math.floor(item.duration_seconds / 60)}:${String(item.duration_seconds % 60).padStart(2, "0")}`
    : null;
  const mediaIcon = item.media_type === "slideshow" ? "📊" : "🎬";
  return (
    <div
      onClick={() => onClick(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0, width: 180, borderRadius: 14,
        border: `1px solid ${hovered ? colors.accentSecondary : colors.border}`,
        background: hovered ? colors.surface : colors.surfaceLight,
        cursor: "pointer", overflow: "hidden", transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? `0 12px 28px rgba(0,0,0,0.15), 0 0 24px ${colors.accentSecondary}20` : `0 4px 16px rgba(0,0,0,0.08)`,
        backdropFilter: "blur(20px)",
      }}
    >
      <div style={{ height: 96, background: colors.surfaceLight, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        {item.thumbnail_url
          ? <img src={item.thumbnail_url} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <span style={{ fontSize: 32, opacity: 0.6 }}>{mediaIcon}</span>}
        <div style={{ position: "absolute", inset: 0, background: hovered ? `${colors.accentSecondary}30` : "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: hovered ? colors.accentSecondary : "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s", boxShadow: hovered ? `0 0 16px ${colors.accentSecondary}60` : "none" }}>
            <span style={{ fontSize: 14, marginLeft: 3 }}>▶</span>
          </div>
        </div>
        {durationLabel && (
          <div style={{ position: "absolute", bottom: 8, right: 8, background: "rgba(0,0,0,0.8)", borderRadius: 6, padding: "2px 8px", color: "#e2e8f0", fontSize: 10, fontWeight: 600 }}>{durationLabel}</div>
        )}
        <div style={{ position: "absolute", top: 8, left: 8, background: "rgba(0,0,0,0.8)", borderRadius: 4, padding: "2px 8px", color: colors.textSecondary, fontSize: 9, textTransform: "uppercase", letterSpacing: 1 }}>{item.media_type}</div>
      </div>
      <div style={{ padding: "12px 12px" }}>
        <div style={{ color: colors.textPrimary, fontSize: 12, fontWeight: 600, lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: 8 }}>{item.title}</div>
        {(item.tags || []).length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {(item.tags || []).slice(0, 3).map((tag, i) => (
              <span key={i} style={{ padding: "2px 8px", borderRadius: 20, background: `${colors.accentSecondary}12`, border: `1px solid ${colors.accentSecondary}20`, color: colors.accentSecondary, fontSize: 9, fontWeight: 600 }}>#{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function VideoResultsRow({ media, onPlay, theme = "dark" }) {
  const colors = themes[theme];
  if (!media?.length) return null;
  return (
    <div style={{ marginBottom: 12, animation: "fadeIn 0.4s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, color: colors.accentSecondary, fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700 }}>
        <span>🎬</span> Training Videos ({media.length})
      </div>
      <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
        {media.map((item) => <VideoCard key={item.id} item={item} onClick={onPlay} theme={theme} />)}
      </div>
    </div>
  );
}

// ─── Chat Message ─────────────────────────────────────────────
function ChatMessage({ message, isUser, onPlayVideo, theme = "dark" }) {
  const colors = themes[theme];
  return (
    <div style={{
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
      marginBottom: 12,
      animation: isUser ? "slideInRight 0.3s ease" : "slideInLeft 0.3s ease",
    }}>
      {!isUser && (
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: `linear-gradient(135deg, ${colors.accentSecondary}30, ${colors.accentPrimary}20)`,
          border: `2px solid ${colors.accentSecondary}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 700, flexShrink: 0, marginRight: 8, marginTop: 2,
          boxShadow: `0 0 12px ${colors.accentSecondary}30`,
        }}>M</div>
      )}
      <div style={{
        maxWidth: "80%",
        padding: "12px 16px",
        borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
        background: isUser
          ? `linear-gradient(135deg, ${colors.accentSecondary}20, ${colors.accentSecondary}10)`
          : colors.surface,
        border: `1px solid ${isUser ? `${colors.accentSecondary}30` : colors.border}`,
        backdropFilter: "blur(20px)",
        color: colors.textPrimary,
        fontSize: 13,
        lineHeight: 1.6,
        whiteSpace: "pre-wrap",
        boxShadow: isUser ? "none" : `inset 1px 1px 0 ${colors.border}`,
      }}>
        {message.media?.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <VideoResultsRow media={message.media} onPlay={onPlayVideo} theme={theme} />
          </div>
        )}
        {message.content}
        {message.sources?.length > 0 && (
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${colors.border}` }}>
            <div style={{ color: colors.textSecondary, fontSize: 10, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>📎 Sources</div>
            {message.sources.map((s, i) => (
              <div key={i} style={{ color: colors.accentPrimary, fontSize: 11, marginBottom: 3 }}>
                • {s.title} <span style={{ color: colors.textSecondary }}>({s.docType})</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Media Viewer ─────────────────────────────────────────────
function MediaViewer({ item, onClose, theme = "dark" }) {
  const colors = themes[theme];
  if (!item) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.85)",
      display: "flex", alignItems: "center", justifyContent: "center",
      backdropFilter: "blur(12px)",
      animation: "fadeIn 0.3s ease",
    }} onClick={onClose}>
      <div style={{
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: 16,
        padding: 28,
        width: "min(90vw, 900px)",
        maxHeight: "85vh",
        overflow: "auto",
        backdropFilter: "blur(20px)",
        boxShadow: `0 25px 50px rgba(0,0,0,0.3), 0 0 0 1px ${colors.border}`,
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ color: colors.textPrimary, margin: 0, fontSize: 18, fontWeight: 600 }}>{item.title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: colors.textSecondary, fontSize: 24, cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = colors.accentSecondary} onMouseLeave={(e) => e.target.style.color = colors.textSecondary}>✕</button>
        </div>
        {item.media_type === "video" ? (
          <video controls style={{ width: "100%", borderRadius: 12, boxShadow: `0 8px 24px rgba(0,0,0,0.2)` }} src={item.file_url}>
            Your browser does not support video.
          </video>
        ) : (
          <iframe src={item.file_url} style={{ width: "100%", height: 500, border: "none", borderRadius: 12, boxShadow: `0 8px 24px rgba(0,0,0,0.2)` }} title={item.title} />
        )}
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState("admin-intake");
  const [language, setLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Max, your BodyShop AI assistant. I can help you with SDS sheets, tech procedures, mixing ratios, training videos and more. Ask me anything or use the tabs above to browse resources.", sources: [] },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [mediaViewer, setMediaViewer] = useState(null);
  const [tabContent, setTabContent] = useState({});
  const [contentLoading, setContentLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("bsai_token"));
  const [user, setUser] = useState(null);
  const [loginMode, setLoginMode] = useState(true);
  const [authForm, setAuthForm] = useState({ email: "", password: "" });
  const [authError, setAuthError] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("bsai_theme") || "dark");

  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const speechSynthRef = useRef(null);
  const colors = themes[theme];

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem("bsai_theme", theme);
  }, [theme]);

  // Speech Recognition setup
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language === "fr" ? "fr-CA" : language === "es" ? "es-MX" : "en-CA";

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInputValue(transcript);
      setIsListening(false);
      setTimeout(() => handleSendMessage(transcript), 300);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognitionRef.current = recognition;
  }, [language]);

  // TTS
  const speak = useCallback((text) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.slice(0, 500));
    utterance.lang = language === "fr" ? "fr-CA" : language === "es" ? "es-MX" : "en-CA";
    utterance.rate = 0.95;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, [language]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch {}
    }
  };

  // Fetch tab content
  useEffect(() => {
    if (!token) return;
    setContentLoading(true);
    fetch(`${API_BASE}/api/documents?tab=${activeTab}&limit=20`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        setTabContent(prev => ({ ...prev, [activeTab]: data.documents || [] }));
        setContentLoading(false);
      })
      .catch(() => setContentLoading(false));
  }, [activeTab, token]);

  // Search
  const handleSearch = async () => {
    if (!searchQuery.trim() || !token) return;
    setSearchLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/search?q=${encodeURIComponent(searchQuery)}&tab=${activeTab}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSearchResults(data.results || []);
    } catch {}
    setSearchLoading(false);
  };

  // Send message to AI agent
  const handleSendMessage = async (overrideText) => {
    const text = (overrideText || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage = { role: "user", content: text, sources: [] };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    const assistantMessage = { role: "assistant", content: "", sources: [] };
    setMessages(prev => [...prev, assistantMessage]);

    try {
      const res = await fetch(`${API_BASE}/api/agent/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ message: text, sessionId, tabSlug: activeTab, language, voiceInput: !!overrideText }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      let sources = [];
      let mediaResults = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter(l => l.startsWith("data: "));

        for (const line of lines) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.type === "media") {
              mediaResults = data.media;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { ...assistantMessage, content: fullText, media: mediaResults, sources };
                return updated;
              });
            } else if (data.type === "text") {
              fullText += data.content;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { ...assistantMessage, content: fullText, media: mediaResults, sources };
                return updated;
              });
            } else if (data.type === "sources") {
              sources = data.sources;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { ...assistantMessage, content: fullText, media: mediaResults, sources };
                return updated;
              });
            } else if (data.type === "done") {
              speak(fullText.replace(/[⚠️📎🎨]/g, "").slice(0, 400));
            }
          } catch {}
        }
      }
    } catch (err) {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: "Sorry, I couldn't connect to the server. Please check your connection.", sources: [] };
        return updated;
      });
    }
    setIsLoading(false);
  };

  // Auth
  const handleAuth = async () => {
    setAuthError("");
    try {
      const endpoint = loginMode ? "/api/auth/login" : "/api/auth/register";
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authForm),
      });
      const data = await res.json();
      if (data.token) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("bsai_token", data.token);
      } else if (data.needsConfirmation) {
        setAuthError(data.message || "Account created. Please check your email to confirm, then sign in.");
        setLoginMode(true);
      } else if (data.message && !data.error) {
        setAuthError(data.message);
        setLoginMode(true);
      } else {
        setAuthError(data.error || "Authentication failed");
      }
    } catch {
      setAuthError("Connection error. Please try again.");
    }
  };

  const currentTab = TABS.find(t => t.slug === activeTab);
  const docs = tabContent[activeTab] || [];
  const displayResults = searchQuery && searchResults.length > 0 ? searchResults : docs;

  // ─── Login Screen ─────────────────────────────────────────
  if (!token) {
    return (
      <div style={{
        minHeight: "100vh",
        background: colors.bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Inter', 'Barlow', sans-serif",
        transition: "background 0.3s ease",
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: ${colors.bg}; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes shimmer { 0%, 100% { box-shadow: 0 0 20px rgba(6,182,212,0.3), 0 4px 20px rgba(0,0,0,0.5); } 50% { box-shadow: 0 0 30px rgba(6,182,212,0.5), 0 4px 20px rgba(0,0,0,0.5); } }
          @keyframes gradientShift { 0%, 100% { filter: hue-rotate(0deg); } 50% { filter: hue-rotate(10deg); } }
          @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>

        {/* Animated Background */}
        <div style={{ position: "fixed", inset: 0, overflow: "hidden", zIndex: 0 }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              width: 500, height: 500,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${theme === "dark" ? ["rgba(6,182,212,0.08)", "rgba(249,115,22,0.06)", "rgba(139,92,246,0.05)"][i % 3] : ["rgba(8,145,178,0.06)", "rgba(234,88,12,0.04)", "rgba(139,92,246,0.03)"][i % 3]} 0%, transparent 70%)`,
              left: `${[10, 60, 30, 80, 5, 50][i]}%`,
              top: `${[20, 10, 70, 40, 80, 60][i]}%`,
              transform: "translate(-50%, -50%)",
              filter: "blur(80px)",
              animation: `gradientShift ${10 + i}s ease-in-out infinite`,
            }} />
          ))}
        </div>

        <div style={{
          position: "relative", zIndex: 1,
          width: "min(90vw, 480px)",
          background: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: 24,
          padding: 48,
          backdropFilter: "blur(30px)",
          boxShadow: `0 25px 60px rgba(0,0,0,${theme === "dark" ? 0.5 : 0.1}), 0 0 0 1px ${colors.border}`,
          animation: "fadeIn 0.6s ease",
        }}>
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ transform: "scale(0.9)", transformOrigin: "center", marginBottom: 12 }}>
              <MaxAvatar isSpeaking={false} isListening={false} language="en" onLanguageChange={() => {}} theme={theme} />
            </div>
            <h1 style={{
              marginTop: 20,
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: 32,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: colors.textPrimary,
              background: `linear-gradient(135deg, ${colors.textPrimary}, ${colors.accentPrimary})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              BODY<span style={{ color: colors.accentSecondary }}>SHOP</span> AI
            </h1>
            <p style={{ color: colors.textSecondary, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginTop: 6, fontWeight: 600 }}>
              Professional Assistant
            </p>
          </div>

          {/* Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                placeholder=" "
                value={authForm.email}
                onChange={e => setAuthForm(p => ({ ...p, email: e.target.value }))}
                onKeyDown={e => e.key === "Enter" && handleAuth()}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 12,
                  border: `1px solid ${colors.border}`,
                  background: colors.surfaceLight,
                  color: colors.textPrimary,
                  fontSize: 14,
                  outline: "none",
                  fontFamily: "'Barlow', sans-serif",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.accentPrimary;
                  e.target.style.background = colors.surface;
                  e.target.style.boxShadow = `0 0 16px ${colors.accentPrimary}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.border;
                  e.target.style.background = colors.surfaceLight;
                  e.target.style.boxShadow = "none";
                }}
              />
              <label style={{ position: "absolute", left: 16, top: -8, background: colors.surface, padding: "0 4px", color: colors.textSecondary, fontSize: 12, fontWeight: 600, transition: "all 0.2s" }}>Email Address</label>
            </div>

            <div style={{ position: "relative" }}>
              <input
                type="password"
                placeholder=" "
                value={authForm.password}
                onChange={e => setAuthForm(p => ({ ...p, password: e.target.value }))}
                onKeyDown={e => e.key === "Enter" && handleAuth()}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 12,
                  border: `1px solid ${colors.border}`,
                  background: colors.surfaceLight,
                  color: colors.textPrimary,
                  fontSize: 14,
                  outline: "none",
                  fontFamily: "'Barlow', sans-serif",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.accentPrimary;
                  e.target.style.background = colors.surface;
                  e.target.style.boxShadow = `0 0 16px ${colors.accentPrimary}20`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.border;
                  e.target.style.background = colors.surfaceLight;
                  e.target.style.boxShadow = "none";
                }}
              />
              <label style={{ position: "absolute", left: 16, top: -8, background: colors.surface, padding: "0 4px", color: colors.textSecondary, fontSize: 12, fontWeight: 600, transition: "all 0.2s" }}>Password</label>
            </div>

            {authError && (
              <div style={{
                padding: 12,
                borderRadius: 8,
                background: theme === "dark" ? "rgba(239, 68, 68, 0.1)" : "rgba(220, 38, 38, 0.08)",
                border: `1px solid ${theme === "dark" ? "rgba(239, 68, 68, 0.3)" : "rgba(220, 38, 38, 0.2)"}`,
                color: theme === "dark" ? "#ef4444" : "#dc2626",
                fontSize: 12,
                lineHeight: 1.5,
              }}>
                {authError}
              </div>
            )}

            <button
              onClick={handleAuth}
              style={{
                padding: "14px 16px",
                borderRadius: 12,
                border: "none",
                background: `linear-gradient(135deg, ${colors.accentSecondary}, ${theme === "dark" ? "#ea580c" : "#dc2626"})`,
                color: "white",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: "'Barlow Condensed', sans-serif",
                boxShadow: `0 8px 24px ${colors.accentSecondary}40`,
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transform: "scale(1)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.02)";
                e.target.style.boxShadow = `0 12px 32px ${colors.accentSecondary}60`;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = `0 8px 24px ${colors.accentSecondary}40`;
              }}
            >
              {loginMode ? "Sign In" : "Create Account"}
            </button>

            <button
              onClick={() => { setLoginMode(!loginMode); setAuthError(""); }}
              style={{
                background: "none",
                border: "none",
                color: colors.textSecondary,
                fontSize: 13,
                cursor: "pointer",
                transition: "color 0.2s",
                fontWeight: 500,
              }}
              onMouseEnter={(e) => e.target.style.color = colors.accentPrimary}
              onMouseLeave={(e) => e.target.style.color = colors.textSecondary}
            >
              {loginMode ? "Need an account? Register" : "Have an account? Sign in"}
            </button>
          </div>

          {/* Theme Toggle */}
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: `1px solid ${colors.border}`, display: "flex", justifyContent: "center" }}>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              style={{
                width: 44, height: 44,
                borderRadius: "50%",
                border: `1px solid ${colors.border}`,
                background: colors.surfaceLight,
                color: colors.textSecondary,
                fontSize: 18,
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = colors.surface;
                e.target.style.color = colors.accentPrimary;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = colors.surfaceLight;
                e.target.style.color = colors.textSecondary;
              }}
              title="Toggle theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Main App ─────────────────────────────────────────────
  return (
    <div style={{
      minHeight: "100vh",
      height: "100vh",
      background: colors.bg,
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Inter', 'Barlow', sans-serif",
      overflow: "hidden",
      color: colors.textPrimary,
      transition: "background 0.3s ease",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${colors.bg}; overflow: hidden; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${colors.border}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${colors.textSecondary}; }
        @keyframes ping { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(2.5); opacity: 0; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes shimmer { 0%, 100% { box-shadow: 0 0 20px rgba(6,182,212,0.3), 0 4px 20px rgba(0,0,0,0.5); } 50% { box-shadow: 0 0 30px rgba(6,182,212,0.5), 0 4px 20px rgba(0,0,0,0.5); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .tab-btn:hover { opacity: 1 !important; }
        .doc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; }
      `}</style>

      {/* ── Top Bar ── */}
      <header style={{
        height: 64,
        background: colors.surface,
        borderBottom: `1px solid ${colors.border}`,
        display: "flex", alignItems: "center",
        padding: "0 20px",
        gap: 16,
        backdropFilter: "blur(20px)",
        zIndex: 100,
        flexShrink: 0,
        boxShadow: `0 4px 16px rgba(0,0,0,0.08)`,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 200 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: `linear-gradient(135deg, ${colors.accentSecondary}, ${theme === "dark" ? "#ea580c" : "#dc2626"})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 900, color: "white",
            boxShadow: `0 0 16px ${colors.accentSecondary}40`,
          }}>B</div>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 14, letterSpacing: 2, textTransform: "uppercase", lineHeight: 1, color: colors.textPrimary }}>
              BODY<span style={{ color: colors.accentSecondary }}>SHOP</span>
            </div>
            <div style={{ fontSize: 9, color: colors.textSecondary, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>AI ASSISTANT</div>
          </div>
        </div>

        {/* Global Search */}
        <div style={{ flex: 1, maxWidth: 600 }}>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            loading={searchLoading}
            currentTab={activeTab}
            theme={theme}
          />
        </div>

        {/* Right Controls */}
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginLeft: "auto" }}>
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            style={{
              width: 40, height: 40,
              borderRadius: 10,
              border: `1px solid ${colors.border}`,
              background: colors.surfaceLight,
              color: colors.textSecondary,
              fontSize: 16,
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = colors.surface;
              e.target.style.color = colors.accentPrimary;
              e.target.style.boxShadow = `0 0 12px ${colors.accentPrimary}30`;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = colors.surfaceLight;
              e.target.style.color = colors.textSecondary;
              e.target.style.boxShadow = "none";
            }}
            title="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              padding: "8px 16px", borderRadius: 10,
              border: `1px solid ${colors.border}`,
              background: sidebarOpen ? `${colors.accentSecondary}15` : colors.surfaceLight,
              color: sidebarOpen ? colors.accentSecondary : colors.textSecondary,
              fontSize: 12, fontWeight: 600, cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = sidebarOpen ? `${colors.accentSecondary}25` : colors.surface;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = sidebarOpen ? `${colors.accentSecondary}15` : colors.surfaceLight;
            }}
          >
            💬 Chat
          </button>

          <button
            onClick={() => { localStorage.removeItem("bsai_token"); setToken(null); setUser(null); }}
            style={{
              padding: "8px 16px", borderRadius: 10,
              border: `1px solid ${colors.border}`,
              background: colors.surfaceLight,
              color: colors.textSecondary, fontSize: 11, fontWeight: 600, cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = colors.surface;
              e.target.style.color = "#ef4444";
              e.target.style.borderColor = "rgba(239, 68, 68, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = colors.surfaceLight;
              e.target.style.color = colors.textSecondary;
              e.target.style.borderColor = colors.border;
            }}
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* ── Tab Navigation ── */}
      <nav style={{
        height: 56,
        background: colors.surface,
        borderBottom: `1px solid ${colors.border}`,
        display: "flex", alignItems: "stretch",
        overflowX: "auto",
        flexShrink: 0,
        scrollbarWidth: "none",
        backdropFilter: "blur(10px)",
      }}>
        {TABS.map(tab => {
          const isActive = tab.slug === activeTab;
          return (
            <button
              key={tab.slug}
              className="tab-btn"
              onClick={() => { setActiveTab(tab.slug); setSearchResults([]); setSearchQuery(""); }}
              style={{
                flex: "1 0 auto",
                minWidth: 130,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                background: isActive ? `${tab.color}15` : "transparent",
                border: "none",
                borderBottom: isActive ? `3px solid ${tab.color}` : `3px solid transparent`,
                color: isActive ? tab.color : colors.textSecondary,
                fontSize: 12,
                fontWeight: 700,
                fontFamily: "'Barlow Condensed', sans-serif",
                letterSpacing: 1,
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                padding: "0 12px",
                opacity: isActive ? 1 : 0.7,
                whiteSpace: "nowrap",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.opacity = "0.9";
                  e.target.style.color = tab.color;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.opacity = "0.7";
                  e.target.style.color = colors.textSecondary;
                }
              }}
            >
              <span style={{ fontSize: 16 }}>{tab.icon}</span>
              <span>{tab.label[language]}</span>
            </button>
          );
        })}
      </nav>

      {/* ── Main Content Area ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Content Panel */}
        <main style={{
          flex: 1,
          overflow: "auto",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}>
          {/* Tab header */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            paddingBottom: 16,
            borderBottom: `1px solid ${colors.border}`,
            animation: "slideUp 0.4s ease",
          }}>
            <span style={{ fontSize: 28 }}>{currentTab?.icon}</span>
            <div>
              <h2 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900, fontSize: 22, letterSpacing: 2,
                textTransform: "uppercase",
                color: currentTab?.color,
                lineHeight: 1,
              }}>
                {currentTab?.label[language]}
              </h2>
              <div style={{ color: colors.textSecondary, fontSize: 12, marginTop: 4, fontWeight: 500 }}>
                {searchResults.length > 0 ? `${searchResults.length} search result${searchResults.length !== 1 ? 's' : ''}` : `${docs.length} resource${docs.length !== 1 ? 's' : ''}`}
              </div>
            </div>
          </div>

          {/* Results grid */}
          {contentLoading ? (
            <div style={{ color: colors.textSecondary, fontSize: 14, padding: 40, textAlign: "center", animation: "pulse 1.5s ease-in-out infinite" }}>
              <div style={{ fontSize: 24, marginBottom: 12 }}>⏳</div>
              Loading resources...
            </div>
          ) : displayResults.length === 0 ? (
            <div style={{
              color: colors.textSecondary, fontSize: 14, padding: 60, textAlign: "center",
              border: `2px dashed ${colors.border}`, borderRadius: 16,
              background: colors.surfaceLight,
            }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📂</div>
              <div style={{ fontWeight: 500 }}>
                {searchQuery ? "No results found. Try different keywords." : "No resources yet. Ask Max for help or contact your admin to upload documents."}
              </div>
            </div>
          ) : (
            <div className="doc-grid" style={{ animation: "fadeIn 0.4s ease" }}>
              {displayResults.map((doc, i) => (
                <div key={doc.id || i} style={{ animation: `slideUp 0.4s ease`, animationDelay: `${i * 50}ms`, animationFillMode: "both" }}>
                  <DocCard
                    doc={doc}
                    onClick={() => doc.file_url && setMediaViewer(doc)}
                    theme={theme}
                  />
                </div>
              ))}
            </div>
          )}
        </main>

        {/* ── Chat Sidebar ── */}
        {sidebarOpen && (
          <aside style={{
            width: 400,
            borderLeft: `1px solid ${colors.border}`,
            display: "flex", flexDirection: "column",
            background: colors.surface,
            backdropFilter: "blur(20px)",
            flexShrink: 0,
            boxShadow: `-4px 0 16px rgba(0,0,0,0.08)`,
            animation: "slideInRight 0.3s ease",
          }}>
            {/* Avatar header */}
            <div style={{
              padding: 20,
              borderBottom: `1px solid ${colors.border}`,
              display: "flex", alignItems: "flex-start", gap: 16,
              background: colors.surfaceLight,
            }}>
              <div style={{ transform: "scale(0.8)", transformOrigin: "top left", marginLeft: -8, marginTop: -8 }}>
                <MaxAvatar
                  isSpeaking={isSpeaking}
                  isListening={isListening}
                  language={language}
                  onLanguageChange={setLanguage}
                  theme={theme}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: colors.textPrimary, fontSize: 13, lineHeight: 1.6, fontWeight: 500 }}>
                  <span style={{ fontWeight: 700, color: colors.accentSecondary }}>Max</span> is your BodyShop AI expert. Ask about procedures, mixing ratios, SDS safety or any repair question.
                </div>
                <div style={{ color: colors.textSecondary, fontSize: 10, marginTop: 6, letterSpacing: 1, fontWeight: 600 }}>
                  🇨🇦 Trained on collision repair · EN/FR/ES
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflow: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 4 }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ animation: "fadeIn 0.3s ease" }}>
                  <ChatMessage message={msg} isUser={msg.role === "user"} onPlayVideo={setMediaViewer} theme={theme} />
                </div>
              ))}
              {isLoading && (
                <div style={{ display: "flex", gap: 6, padding: "12px 14px", color: colors.textSecondary, fontSize: 13, alignItems: "center" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", animation: "ping 1s ease infinite", background: colors.accentPrimary }}></div>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", animation: "ping 1s ease infinite", background: colors.accentPrimary, animationDelay: "0.2s" }}></div>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", animation: "ping 1s ease infinite", background: colors.accentPrimary, animationDelay: "0.4s" }}></div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div style={{
              padding: 14,
              borderTop: `1px solid ${colors.border}`,
              background: colors.surfaceLight,
            }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
                <VoiceButton isListening={isListening} onToggle={toggleListening} disabled={isLoading} theme={theme} />
                <div style={{
                  flex: 1,
                  background: colors.surface,
                  border: `1px solid ${isListening ? "#22c55e" : colors.border}`,
                  borderRadius: 14,
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  boxShadow: isListening ? "0 0 12px rgba(34,197,94,0.3)" : "none",
                }}>
                  <textarea
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder={
                      isListening ? "Listening..." :
                      language === "fr" ? "Posez votre question..." :
                      language === "es" ? "Haz tu pregunta..." :
                      "Ask about procedures, SDS, mixing ratios..."
                    }
                    rows={2}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: colors.textPrimary,
                      fontSize: 13,
                      padding: "12px 14px",
                      resize: "none",
                      fontFamily: "'Barlow', sans-serif",
                      lineHeight: 1.5,
                    }}
                  />
                </div>
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isLoading || !inputValue.trim()}
                  style={{
                    width: 48, height: 48,
                    borderRadius: 12,
                    border: "none",
                    background: isLoading || !inputValue.trim()
                      ? colors.surfaceLight
                      : `linear-gradient(135deg, ${colors.accentSecondary}, ${theme === "dark" ? "#ea580c" : "#dc2626"})`,
                    color: isLoading || !inputValue.trim() ? colors.textSecondary : "white",
                    fontSize: 18,
                    cursor: isLoading || !inputValue.trim() ? "not-allowed" : "pointer",
                    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    flexShrink: 0,
                    boxShadow: !isLoading && inputValue.trim() ? `0 6px 20px ${colors.accentSecondary}40` : "none",
                    transform: "scale(1)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading && inputValue.trim()) {
                      e.target.style.transform = "scale(1.05)";
                      e.target.style.boxShadow = `0 8px 28px ${colors.accentSecondary}60`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    if (!isLoading && inputValue.trim()) {
                      e.target.style.boxShadow = `0 6px 20px ${colors.accentSecondary}40`;
                    }
                  }}
                  title="Send message"
                >
                  ➤
                </button>
              </div>
              <div style={{ color: colors.textSecondary, fontSize: 10, textAlign: "center", marginTop: 8, letterSpacing: 1, fontWeight: 500 }}>
                Press Enter to send · Shift+Enter for new line · 🎤 for voice
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Media Viewer Modal */}
      {mediaViewer && <MediaViewer item={mediaViewer} onClose={() => setMediaViewer(null)} theme={theme} />}
    </div>
  );
}

// Hex to RGB helper
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1],16)},${parseInt(result[2],16)},${parseInt(result[3],16)}` : "249,115,22";
}
