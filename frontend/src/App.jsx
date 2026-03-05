import { useState, useEffect, useRef, useCallback } from "react";
import { authFetch } from "./authFetch.js";

// ─── API Base ────────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_URL || "https://chc-work-buddy-production-5b0e.up.railway.app";

// ─── Industry SVG Icons ──────────────────────────────────────
const TabIcon = ({ type, size = 22, color = "currentColor" }) => {
  const icons = {
    disassembly: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Wrench + bolt disassembly */}
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        <line x1="18" y1="2" x2="22" y2="6" opacity="0.5"/>
        <line x1="15" y1="2" x2="15" y2="5" opacity="0.4"/>
      </svg>
    ),
    bodyrepair: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Hammer + dent repair */}
        <path d="M15 12l-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9"/>
        <path d="M17.64 2.36a2.12 2.12 0 0 1 3 3L14.5 11.5"/>
        <path d="M21 11l-3-3" opacity="0.6"/>
        <path d="M19 13c.5 3.5-1.5 6.5-5 8" opacity="0.4" strokeDasharray="2 2"/>
      </svg>
    ),
    paintgun: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Spray paint gun */}
        <rect x="2" y="6" width="10" height="8" rx="1"/>
        <path d="M12 9h4l3-3h2v12h-2l-3-3h-4"/>
        <circle cx="7" cy="10" r="2" fill={color} opacity="0.3"/>
        {/* Paint spray dots */}
        <circle cx="22" cy="7" r="0.8" fill={color} opacity="0.5"/>
        <circle cx="23" cy="10" r="0.6" fill={color} opacity="0.4"/>
        <circle cx="22" cy="13" r="0.7" fill={color} opacity="0.5"/>
        <circle cx="24" cy="8.5" r="0.5" fill={color} opacity="0.3"/>
        <circle cx="24" cy="11.5" r="0.5" fill={color} opacity="0.3"/>
      </svg>
    ),
    reassembly: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Gears / assembly */}
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        <circle cx="12" cy="12" r="7" opacity="0.3" strokeDasharray="3 3"/>
      </svg>
    ),
    detailing: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Magnifying glass + sparkle for QC */}
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        {/* Sparkle / check inside */}
        <path d="M8 11l2 2 4-4" strokeWidth="2.5"/>
      </svg>
    ),
    learning: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Open book */}
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  };
  return icons[type] || null;
};

// ─── Constants ────────────────────────────────────────────────
const TABS = [
  { slug: "vehicle-disassembly", label: { en: "Vehicle Disassembly", fr: "Démontage Véhicule",   es: "Desmontaje de Vehículo" },   iconType: "disassembly", color: "#f97316" },
  { slug: "auto-body-repairs",   label: { en: "Auto Body Repairs",   fr: "Réparations Carrosserie", es: "Reparaciones de Carrocería" }, iconType: "bodyrepair", color: "#ef4444" },
  { slug: "painting",            label: { en: "Painting",            fr: "Peinture",             es: "Pintura" },                    iconType: "paintgun",  color: "#8b5cf6" },
  { slug: "reassembly",          label: { en: "Reassembly",          fr: "Réassemblage",         es: "Reensamblaje" },               iconType: "reassembly", color: "#3b82f6" },
  { slug: "detailing-qc",        label: { en: "Detailing & QC",      fr: "Finition & CQ",        es: "Detallado y CC" },             iconType: "detailing", color: "#22c55e" },
  { slug: "learning",            label: { en: "Learning",            fr: "Apprentissage",        es: "Aprendizaje" },                iconType: "learning",  color: "#ec4899" },
];

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

          {/* Coveralls body — charcoal gray mechanic suit */}
          <rect x="18" y="92" width="84" height="32" rx="8" fill="#3a3d42" />
          {/* Coverall shoulders */}
          <path d="M18 100 Q18 88 35 85 L46 85 L46 100Z" fill="#3a3d42" />
          <path d="M102 100 Q102 88 85 85 L74 85 L74 100Z" fill="#3a3d42" />
          {/* Coverall collar — folded down */}
          <path d="M42 88 L38 96 L48 92Z" fill="#4a4e54" />
          <path d="M78 88 L82 96 L72 92Z" fill="#4a4e54" />
          {/* Lapel lines */}
          <line x1="45" y1="89" x2="42" y2="100" stroke="#2d3035" strokeWidth="1.5" />
          <line x1="75" y1="89" x2="78" y2="100" stroke="#2d3035" strokeWidth="1.5" />
          {/* Center zipper line */}
          <line x1="60" y1="92" x2="60" y2="120" stroke="#555960" strokeWidth="1.5" />
          {/* Zipper pull */}
          <rect x="58" y="93" width="4" height="5" rx="1" fill="#888d94" />
          {/* Chest pocket — left */}
          <rect x="35" y="98" width="14" height="10" rx="2" fill="none" stroke="#555960" strokeWidth="1" />
          {/* Name patch on pocket */}
          <rect x="36" y="99" width="12" height="4" rx="1" fill="#1e3a5f" />
          <text x="42" y="102.5" textAnchor="middle" fill="white" fontSize="3" fontWeight="bold" fontFamily="sans-serif">MAX</text>
          {/* Chest pocket — right */}
          <rect x="71" y="98" width="14" height="10" rx="2" fill="none" stroke="#555960" strokeWidth="1" />
          {/* Pen in right pocket */}
          <line x1="76" y1="96" x2="76" y2="102" stroke="#e85d3a" strokeWidth="1.5" strokeLinecap="round" />
          {/* Shoulder seam stitching */}
          <path d="M35 87 Q44 84 46 87" stroke="#555960" strokeWidth="0.8" fill="none" strokeDasharray="2 1.5" />
          <path d="M85 87 Q76 84 74 87" stroke="#555960" strokeWidth="0.8" fill="none" strokeDasharray="2 1.5" />

          {/* Neck / visible undershirt */}
          <rect x="47" y="80" width="26" height="14" rx="6" fill="#c8956c" />
          {/* Crew-neck t-shirt visible */}
          <path d="M48 88 Q60 92 72 88 Q70 90 60 91 Q50 90 48 88Z" fill="#e8e8e8" />

          {/* Hood gathered behind neck (paint suit hood down) */}
          <path d="M36 86 Q38 80 46 82 L46 87 Q40 86 36 86Z" fill="#4a4e54" opacity="0.7" />
          <path d="M84 86 Q82 80 74 82 L74 87 Q80 86 84 86Z" fill="#4a4e54" opacity="0.7" />
          {/* Hood fabric folds */}
          <path d="M38 84 Q42 81 46 83" stroke="#555960" strokeWidth="0.8" fill="none" />
          <path d="M82 84 Q78 81 74 83" stroke="#555960" strokeWidth="0.8" fill="none" />

          {/* Head */}
          <ellipse cx="60" cy="55" rx="28" ry="30" fill="#c8956c" />

          {/* Hair - salt & pepper, short */}
          <path d="M32 45 Q34 25 60 22 Q86 25 88 45 Q84 30 60 28 Q36 30 32 45Z" fill="#4a4a4a" />
          <path d="M34 38 Q33 30 38 27" stroke="#6a6a6a" strokeWidth="2" fill="none" />
          <path d="M86 38 Q87 30 82 27" stroke="#6a6a6a" strokeWidth="2" fill="none" />

          {/* Ears */}
          <ellipse cx="32" cy="55" rx="5" ry="7" fill="#b8845c" />
          <ellipse cx="88" cy="55" rx="5" ry="7" fill="#b8845c" />

          {/* Safety glasses pushed up on forehead */}
          <path d="M36 38 Q42 36 48 38" stroke="#66b2ff" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M72 38 Q78 36 84 38" stroke="#66b2ff" strokeWidth="2" fill="none" opacity="0.6" />
          <line x1="48" y1="38" x2="72" y2="38" stroke="#66b2ff" strokeWidth="1" opacity="0.4" />

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
function ChatMessage({ message, isUser, onPlayVideo, onOpenDoc, theme = "dark" }) {
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
        {/* Answer Source Badge — clickable */}
        {!isUser && message.answerSource && (
          <div
            onClick={() => {
              if ((message.answerSource === "vector" || message.answerSource === "rag") && message.sources?.length > 0) {
                const s = message.sources[0];
                onOpenDoc && onOpenDoc({ id: s.id, title: s.title, doc_type: s.docType, tab_slug: s.tabSlug, file_url: s.fileUrl });
              } else if (message.answerSource === "llm") {
                const el = document.getElementById("resources-footer-bar");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                  const expandBtn = el.querySelector("button");
                  if (expandBtn) expandBtn.click();
                } else { window.open("https://www.osha.gov/auto-body-repair", "_blank"); }
              }
            }}
            title={
              message.answerSource === "vector" ? "Click to view source document" :
              message.answerSource === "rag" ? "Click to view matched document" :
              "Click to view authoritative resources"
            }
            style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "3px 10px", borderRadius: 20, marginBottom: 8,
              fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase",
              cursor: "pointer", transition: "all 0.2s ease",
              background: message.answerSource === "vector" ? "rgba(34,197,94,0.15)" : message.answerSource === "rag" ? "rgba(59,130,246,0.15)" : "rgba(249,115,22,0.15)",
              color: message.answerSource === "vector" ? "#22c55e" : message.answerSource === "rag" ? "#3b82f6" : "#f97316",
              border: `1px solid ${message.answerSource === "vector" ? "#22c55e33" : message.answerSource === "rag" ? "#3b82f633" : "#f9731633"}`,
            }}
            onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.3)"; e.currentTarget.style.transform = "scale(1.05)"; }}
            onMouseLeave={e => { e.currentTarget.style.filter = "brightness(1)"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            <span style={{ fontSize: 8 }}>{message.answerSource === "vector" ? "✅" : message.answerSource === "rag" ? "🔍" : "⚠️"}</span>
            {message.answerSource === "vector" ? "Verified Source" : message.answerSource === "rag" ? "Database Match" : "AI General Knowledge"}
            <span style={{ fontSize: 10, opacity: 0.7 }}>→</span>
          </div>
        )}
        {message.media?.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <VideoResultsRow media={message.media} onPlay={onPlayVideo} theme={theme} />
          </div>
        )}
        {message.content}
        {message.sources?.length > 0 && (
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${colors.border}` }}>
            <div style={{ color: colors.textSecondary, fontSize: 10, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>📎 Sources — tap to view full document</div>
            {message.sources.map((s, i) => (
              <div
                key={i}
                onClick={() => onOpenDoc && onOpenDoc({ id: s.id, title: s.title, doc_type: s.docType, tab_slug: s.tabSlug, file_url: s.fileUrl })}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "8px 12px", marginBottom: 6,
                  borderRadius: 10,
                  background: `${colors.accentPrimary}08`,
                  border: `1px solid ${colors.accentPrimary}25`,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `${colors.accentPrimary}18`;
                  e.currentTarget.style.borderColor = `${colors.accentPrimary}50`;
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = `${colors.accentPrimary}08`;
                  e.currentTarget.style.borderColor = `${colors.accentPrimary}25`;
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <span style={{ fontSize: 14 }}>
                  {s.docType === "sds" ? "⚠️" : s.docType === "tech_sheet" ? "📊" : s.docType === "procedure" ? "📋" : s.docType === "checklist" ? "✅" : "📄"}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: colors.accentPrimary, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {s.title}
                  </div>
                  <div style={{ color: colors.textSecondary, fontSize: 10, marginTop: 1 }}>
                    {s.docType?.replace("_", " ").toUpperCase()} {s.similarity ? `• ${s.similarity}% match` : ""}
                  </div>
                </div>
                <span style={{ color: colors.accentPrimary, fontSize: 16, flexShrink: 0, opacity: 0.6 }}>→</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Document Viewer ──────────────────────────────────────────
function DocViewer({ doc, onClose, token, theme = "dark" }) {
  const colors = themes[theme];
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (!doc?.id) { setLoading(false); return; }
    setLoading(true);
    setContent(null);
    setFetchError(null);
    authFetch(`${API_BASE}/api/documents/${doc.id}`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(data => {
        setContent(data.document?.full_content || data.document?.description || null);
        setLoading(false);
      })
      .catch(err => {
        console.error("DocViewer fetch error:", err);
        setFetchError(err.message);
        setLoading(false);
      });
  }, [doc?.id, token]);

  if (!doc) return null;

  const typeColors = {
    sds: "#ef4444", tech_sheet: "#8b5cf6", manual: "#3b82f6",
    procedure: colors.accentSecondary, checklist: "#22c55e", other: colors.textSecondary,
  };

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
        width: "min(90vw, 800px)",
        maxHeight: "85vh",
        display: "flex",
        flexDirection: "column",
        backdropFilter: "blur(20px)",
        boxShadow: `0 25px 50px rgba(0,0,0,0.3), 0 0 0 1px ${colors.border}`,
      }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ padding: "20px 24px 16px", borderBottom: `1px solid ${colors.border}`, flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 22 }}>
                  {doc.doc_type === "sds" ? "⚠️" : doc.doc_type === "tech_sheet" ? "📊" : doc.doc_type === "procedure" ? "📋" : doc.doc_type === "checklist" ? "✅" : "📄"}
                </span>
                <h3 style={{ color: colors.textPrimary, margin: 0, fontSize: 18, fontWeight: 600 }}>{doc.title}</h3>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                <span style={{
                  padding: "3px 10px", borderRadius: 20,
                  background: `${typeColors[doc.doc_type] || colors.textSecondary}15`,
                  border: `1px solid ${typeColors[doc.doc_type] || colors.textSecondary}40`,
                  color: typeColors[doc.doc_type] || colors.textSecondary,
                  fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5,
                }}>
                  {doc.doc_type?.replace("_", " ")}
                </span>
                {doc.tags?.length > 0 && doc.tags.slice(0, 4).map(tag => (
                  <span key={tag} style={{
                    padding: "3px 8px", borderRadius: 12,
                    background: `${colors.accentPrimary}10`,
                    color: colors.textSecondary,
                    fontSize: 10, fontWeight: 500,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button onClick={onClose} style={{
              background: "none", border: "none", color: colors.textSecondary,
              fontSize: 24, cursor: "pointer", transition: "color 0.2s", flexShrink: 0,
              padding: "0 4px",
            }}
              onMouseEnter={e => e.target.style.color = colors.accentSecondary}
              onMouseLeave={e => e.target.style.color = colors.textSecondary}
            >✕</button>
          </div>
          {doc.description && (
            <p style={{ color: colors.textSecondary, fontSize: 12, margin: "10px 0 0", lineHeight: 1.6 }}>{doc.description}</p>
          )}
        </div>

        {/* Content body */}
        <div style={{
          padding: 24,
          overflow: "auto",
          flex: 1,
          minHeight: 0,
        }}>
          {loading ? (
            <div style={{ color: colors.textSecondary, textAlign: "center", padding: 40 }}>
              <div style={{ fontSize: 24, marginBottom: 12, animation: "pulse 1.5s ease-in-out infinite" }}>⏳</div>
              Loading document...
            </div>
          ) : fetchError ? (
            <div style={{ color: colors.textSecondary, textAlign: "center", padding: 40 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>Failed to load document</div>
              <div style={{ fontSize: 12, color: "#ef4444" }}>{fetchError}</div>
              {doc.description && (
                <div style={{ marginTop: 20, textAlign: "left", color: colors.textPrimary, fontSize: 14, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
                  {doc.description}
                </div>
              )}
            </div>
          ) : content ? (
            <div style={{
              color: colors.textPrimary,
              fontSize: 14,
              lineHeight: 1.8,
              whiteSpace: "pre-wrap",
              fontFamily: "'Barlow', sans-serif",
            }}>
              {content}
            </div>
          ) : (
            <div style={{ color: colors.textSecondary, textAlign: "center", padding: 40 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>📄</div>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>
                {doc.description ? "Document content:" : "No content preview available"}
              </div>
              {doc.description && (
                <div style={{ marginTop: 12, textAlign: "left", color: colors.textPrimary, fontSize: 14, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
                  {doc.description}
                </div>
              )}
              {doc.file_url && (
                <a href={doc.file_url} target="_blank" rel="noreferrer" style={{
                  display: "inline-block", marginTop: 16,
                  padding: "8px 20px", borderRadius: 8,
                  background: `${colors.accentPrimary}20`,
                  color: colors.accentPrimary,
                  fontSize: 13, fontWeight: 600, textDecoration: "none",
                  border: `1px solid ${colors.accentPrimary}40`,
                }}>
                  Open Original File ↗
                </a>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {doc.file_url && content && (
          <div style={{ padding: "12px 24px", borderTop: `1px solid ${colors.border}`, flexShrink: 0 }}>
            <a href={doc.file_url} target="_blank" rel="noreferrer" style={{
              color: colors.accentPrimary, fontSize: 12, textDecoration: "none", fontWeight: 500,
            }}>
              Open original file ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Media Viewer ─────────────────────────────────────────────
function getEmbedUrl(fileUrl) {
  if (!fileUrl) return null;
  // YouTube
  const ytMatch = fileUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return { type: "youtube", embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1` };
  // Vimeo — dnt=0 ensures player works, quality=auto for best streaming
  const vimeoMatch = fileUrl.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) return { type: "vimeo", embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?badge=0&autopause=0&player_id=0&app_id=58479&quality=auto` };
  return null;
}

function MediaViewer({ item, onClose, theme = "dark" }) {
  const colors = themes[theme];
  if (!item) return null;
  const embed = getEmbedUrl(item.file_url);
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
        {embed ? (
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: 12, boxShadow: `0 8px 24px rgba(0,0,0,0.2)` }}>
            <iframe
              src={embed.embedUrl}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              title={item.title}
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
            />
          </div>
        ) : item.media_type === "video" ? (
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
  const [activeTab, setActiveTab] = useState("vehicle-disassembly");
  const [language, setLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Max, your Body Shop Wiz. I can help with SDS sheets, tech procedures, mixing ratios, training videos and more. Ask me anything or use the tabs above to browse resources.", sources: [] },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [mediaViewer, setMediaViewer] = useState(null);
  const [docViewer, setDocViewer] = useState(null);
  const [tabContent, setTabContent] = useState({});
  const [contentLoading, setContentLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("bsai_token"));
  const [user, setUser] = useState(null);
  const [loginMode, setLoginMode] = useState(true);
  const [authForm, setAuthForm] = useState({ email: "", password: "" });
  const [authError, setAuthError] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("bsai_theme") || "dark");

  // Learning tab state
  const [learningView, setLearningView] = useState("menu");
  const [learningGuides, setLearningGuides] = useState([]);
  const [learningQuizzes, setLearningQuizzes] = useState([]);
  const [activeGuide, setActiveGuide] = useState(null);
  const [guideHistory, setGuideHistory] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizCurrentQ, setQuizCurrentQ] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResults, setQuizResults] = useState(null);
  const [quizSubmitting, setQuizSubmitting] = useState(false);
  const [learningLoading, setLearningLoading] = useState(false);
  const [showResources, setShowResources] = useState(false);

  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const speechSynthRef = useRef(null);
  const colors = themes[theme];

  // Listen for token refresh / session expiry from authFetch
  useEffect(() => {
    const onRefreshed = (e) => {
      const d = e.detail;
      if (d?.token) setToken(d.token);
      if (d?.user) setUser(d.user);
    };
    const onExpired = () => {
      setToken(null);
      setUser(null);
      setAuthError("Your session has expired. Please sign in again.");
    };
    window.addEventListener("bsai_token_refreshed", onRefreshed);
    window.addEventListener("bsai_session_expired", onExpired);
    return () => {
      window.removeEventListener("bsai_token_refreshed", onRefreshed);
      window.removeEventListener("bsai_session_expired", onExpired);
    };
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem("bsai_theme", theme);
  }, [theme]);

  // Preload TTS voices (browsers load them async)
  useEffect(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
  }, []);

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

  // TTS — prefer a natural male voice for Max
  const speak = useCallback((text) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.slice(0, 500));
    utterance.lang = language === "fr" ? "fr-CA" : language === "es" ? "es-MX" : "en-US";
    utterance.rate = 0.95;
    utterance.pitch = 0.9;

    // Find a male voice — prefer natural/enhanced voices
    const voices = window.speechSynthesis.getVoices();
    const langPrefix = utterance.lang.slice(0, 2);
    const maleKeywords = ["daniel", "james", "aaron", "david", "gordon", "male", "guy", "tom", "alex", "fred", "rishi", "jorge", "thomas", "reed", "evan"];
    const naturalKeywords = ["premium", "enhanced", "natural", "neural"];

    // Priority 1: Natural/premium male voice
    let voice = voices.find(v => v.lang.startsWith(langPrefix) && maleKeywords.some(k => v.name.toLowerCase().includes(k)) && naturalKeywords.some(k => v.name.toLowerCase().includes(k)));
    // Priority 2: Any male voice in the right language
    if (!voice) voice = voices.find(v => v.lang.startsWith(langPrefix) && maleKeywords.some(k => v.name.toLowerCase().includes(k)));
    // Priority 3: Any voice with "male" in name
    if (!voice) voice = voices.find(v => maleKeywords.some(k => v.name.toLowerCase().includes(k)));

    if (voice) utterance.voice = voice;

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

  // Fetch tab content (uses authFetch for auto token refresh)
  useEffect(() => {
    if (!token) return;
    setContentLoading(true);
    authFetch(`${API_BASE}/api/documents?tab=${activeTab}&limit=50`)
      .then(r => {
        if (!r.ok) {
          console.error(`[BSW] Documents fetch failed: ${r.status} ${r.statusText}`);
          return { documents: [] };
        }
        return r.json();
      })
      .then(data => {
        console.log(`[BSW] Tab "${activeTab}" documents:`, data.documents?.length || 0);
        setTabContent(prev => ({ ...prev, [activeTab]: data.documents || [] }));
        setContentLoading(false);
      })
      .catch(err => {
        console.error('[BSW] Documents fetch error:', err);
        setContentLoading(false);
      });
  }, [activeTab, token]);

  // Learning tab data fetching
  useEffect(() => {
    if (activeTab !== "learning" || !token) return;
    setLearningLoading(true);
    Promise.all([
      authFetch(`${API_BASE}/api/learning/guides`).then(r => r.json()),
      authFetch(`${API_BASE}/api/learning/quizzes`).then(r => r.json()),
    ]).then(([g, q]) => {
      const mapFields = (obj, fields) => {
        const out = { ...obj };
        for (const f of fields) out[f] = { en: obj[`${f}_en`] || "", fr: obj[`${f}_fr`] || "", es: obj[`${f}_es`] || "" };
        return out;
      };
      setLearningGuides((g.guides || []).map(x => mapFields(x, ["title", "description"])));
      setLearningQuizzes((q.quizzes || []).map(x => mapFields(x, ["title", "description"])));
      setLearningLoading(false);
    }).catch(() => setLearningLoading(false));
  }, [activeTab, token]);

  // Search
  const handleSearch = async () => {
    if (!searchQuery.trim() || !token) return;
    setSearchLoading(true);
    try {
      const res = await authFetch(`${API_BASE}/api/search?q=${encodeURIComponent(searchQuery)}&tab=${activeTab}`);
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
      const res = await authFetch(`${API_BASE}/api/agent/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
              // Store answer source on the message for badge display
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { ...updated[updated.length - 1], content: fullText, media: mediaResults, sources, answerSource: data.answerSource || "unknown" };
                return updated;
              });
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
        if (data.refreshToken) localStorage.setItem("bsai_refresh", data.refreshToken);
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

  // Learning tab handlers
  const openGuide = async (slug) => {
    try {
      const res = await authFetch(`${API_BASE}/api/learning/guides/${slug}`);
      const data = await res.json();
      setActiveGuide(data.guide);
      setGuideHistory(["root"]);
      setLearningView("guide");
    } catch {
      console.error("Failed to open guide:", slug);
    }
  };

  const navigateGuide = (nodeId) => {
    setGuideHistory(prev => [...prev, nodeId]);
  };

  const guideBack = () => {
    setGuideHistory(prev => prev.slice(0, -1));
  };

  // Helper: map flat i18n DB fields (title_en, title_fr) → nested { title: {en, fr, es} }
  const mapI18n = (obj, fields) => {
    const out = { ...obj };
    for (const f of fields) {
      out[f] = { en: obj[`${f}_en`] || "", fr: obj[`${f}_fr`] || "", es: obj[`${f}_es`] || "" };
    }
    return out;
  };

  const openQuiz = async (slug) => {
    try {
      const res = await authFetch(`${API_BASE}/api/learning/quizzes/${slug}`);
      const data = await res.json();
      const quiz = mapI18n(data.quiz || {}, ["title", "description"]);
      const questions = (data.questions || []).map(q => {
        const mapped = mapI18n(q, ["question_text", "explanation"]);
        mapped.text = mapped.question_text; // frontend expects .text
        mapped.answers = (q.answers || []).map(a => {
          const ma = mapI18n(a, ["answer_text"]);
          ma.text = ma.answer_text; // frontend expects .text
          return ma;
        });
        return mapped;
      });
      setActiveQuiz(quiz);
      setQuizQuestions(questions);
      setQuizCurrentQ(0);
      setQuizAnswers({});
      setQuizResults(null);
      setLearningView("quiz");
    } catch (err) {
      console.error("Failed to open quiz:", slug, err);
    }
  };

  const submitQuiz = async () => {
    if (!activeQuiz) return;
    setQuizSubmitting(true);
    try {
      const res = await authFetch(`${API_BASE}/api/learning/quizzes/${activeQuiz.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: Object.fromEntries(
          Object.entries(quizAnswers).map(([idx, ansId]) => [quizQuestions[idx]?.id, ansId])
        ) }),
      });
      const data = await res.json();
      setQuizResults(data);
    } catch {
      console.error("Failed to submit quiz");
    }
    setQuizSubmitting(false);
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
              BODY SHOP<span style={{ color: colors.accentSecondary }}> WIZ</span>
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
              BODY SHOP<span style={{ color: colors.accentSecondary }}> WIZ</span>
            </div>
            <div style={{ fontSize: 9, color: colors.textSecondary, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>COLLISION REPAIR</div>
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
            onClick={() => { localStorage.removeItem("bsai_token"); localStorage.removeItem("bsai_refresh"); setToken(null); setUser(null); }}
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
        height: 72,
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
                flex: "1 1 0",
                minWidth: 160,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                background: isActive ? `${tab.color}18` : "transparent",
                border: "none",
                borderBottom: isActive ? `4px solid ${tab.color}` : `4px solid transparent`,
                color: isActive ? tab.color : "rgba(255,255,255,0.75)",
                fontSize: 17,
                fontWeight: 600,
                fontFamily: "'Barlow Condensed', sans-serif",
                letterSpacing: 1.8,
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                padding: "0 20px",
                opacity: isActive ? 1 : 0.85,
                whiteSpace: "nowrap",
                position: "relative",
                textShadow: isActive ? `0 0 12px ${tab.color}60, 0 1px 2px rgba(0,0,0,0.5)` : "0 1px 3px rgba(0,0,0,0.6)",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.opacity = "1";
                  e.target.style.color = tab.color;
                  e.target.style.textShadow = `0 0 12px ${tab.color}60, 0 1px 2px rgba(0,0,0,0.5)`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.opacity = "0.85";
                  e.target.style.color = "rgba(255,255,255,0.75)";
                  e.target.style.textShadow = "0 1px 3px rgba(0,0,0,0.6)";
                }
              }}
            >
              <TabIcon type={tab.iconType} size={isActive ? 24 : 22} color={isActive ? tab.color : "rgba(255,255,255,0.75)"} />
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
            <span style={{ display: "flex", alignItems: "center" }}><TabIcon type={currentTab?.iconType} size={30} color={currentTab?.color} /></span>
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
                {activeTab === "learning"
                  ? learningView === "menu"
                    ? `${learningGuides.length} guide${learningGuides.length !== 1 ? 's' : ''} · ${learningQuizzes.length} quiz${learningQuizzes.length !== 1 ? 'zes' : ''}`
                    : learningView === "guide"
                    ? `Guide: ${activeGuide?.title?.[language] || "Loading..."}`
                    : `Quiz: ${activeQuiz?.title?.[language] || "Loading..."}`
                  : searchResults.length > 0 ? `${searchResults.length} search result${searchResults.length !== 1 ? 's' : ''}` : `${docs.length} resource${docs.length !== 1 ? 's' : ''}`
                }
              </div>
            </div>
          </div>

          {/* Learning tab content */}
          {activeTab === "learning" ? (
            learningLoading ? (
              <div style={{ color: colors.textSecondary, fontSize: 14, padding: 40, textAlign: "center", animation: "pulse 1.5s ease-in-out infinite" }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>⏳</div>
                Loading learning resources...
              </div>
            ) : learningView === "menu" ? (
              // Learning menu view
              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                {/* Troubleshooting Guides Section */}
                <div>
                  <h3 style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900, fontSize: 18, letterSpacing: 2,
                    textTransform: "uppercase",
                    color: colors.textPrimary,
                    marginBottom: 16,
                  }}>
                    Troubleshooting Guides
                  </h3>
                  {learningGuides.length === 0 ? (
                    <div style={{
                      color: colors.textSecondary, fontSize: 14, padding: 30, textAlign: "center",
                      border: `1px dashed ${colors.border}`, borderRadius: 12,
                      background: colors.surfaceLight,
                    }}>
                      No guides available
                    </div>
                  ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
                      {learningGuides.map((guide, i) => (
                        <div
                          key={i}
                          onClick={() => openGuide(guide.slug)}
                          style={{
                            background: colors.surface,
                            border: `1px solid ${colors.border}`,
                            borderRadius: 14,
                            padding: 16,
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            animation: `slideUp 0.4s ease ${i * 50}ms both`,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = colors.surfaceLight;
                            e.currentTarget.style.borderColor = colors.accentPrimary;
                            e.currentTarget.style.boxShadow = `0 8px 24px rgba(6,182,212,0.1)`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = colors.surface;
                            e.currentTarget.style.borderColor = colors.border;
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                            <div style={{ fontSize: 24 }}>📚</div>
                            <div style={{ flex: 1 }}>
                              <h4 style={{ color: colors.textPrimary, margin: 0, fontWeight: 600, fontSize: 15 }}>
                                {guide.title?.[language] || guide.title}
                              </h4>
                              <p style={{ color: colors.textSecondary, fontSize: 13, margin: "8px 0 0 0", lineHeight: 1.4 }}>
                                {guide.description?.[language] || guide.description}
                              </p>
                              {guide.category && (
                                <div style={{
                                  display: "inline-block",
                                  marginTop: 10,
                                  paddingX: 8,
                                  paddingY: 4,
                                  background: `${colors.accentPrimary}15`,
                                  color: colors.accentPrimary,
                                  fontSize: 11,
                                  fontWeight: 600,
                                  borderRadius: 6,
                                  padding: "4px 8px",
                                }}>
                                  {guide.category}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Skill Assessments Section */}
                <div>
                  <h3 style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900, fontSize: 18, letterSpacing: 2,
                    textTransform: "uppercase",
                    color: colors.textPrimary,
                    marginBottom: 16,
                  }}>
                    Skill Assessments
                  </h3>
                  {learningQuizzes.length === 0 ? (
                    <div style={{
                      color: colors.textSecondary, fontSize: 14, padding: 30, textAlign: "center",
                      border: `1px dashed ${colors.border}`, borderRadius: 12,
                      background: colors.surfaceLight,
                    }}>
                      No quizzes available
                    </div>
                  ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
                      {learningQuizzes.map((quiz, i) => (
                        <div
                          key={i}
                          onClick={() => openQuiz(quiz.slug)}
                          style={{
                            background: colors.surface,
                            border: `1px solid ${colors.border}`,
                            borderRadius: 14,
                            padding: 16,
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            animation: `slideUp 0.4s ease ${i * 50}ms both`,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = colors.surfaceLight;
                            e.currentTarget.style.borderColor = colors.accentPrimary;
                            e.currentTarget.style.boxShadow = `0 8px 24px rgba(6,182,212,0.1)`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = colors.surface;
                            e.currentTarget.style.borderColor = colors.border;
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                            <div style={{ fontSize: 24 }}>✓</div>
                            <div style={{ flex: 1 }}>
                              <h4 style={{ color: colors.textPrimary, margin: 0, fontWeight: 600, fontSize: 15 }}>
                                {quiz.title?.[language] || quiz.title}
                              </h4>
                              <p style={{ color: colors.textSecondary, fontSize: 13, margin: "8px 0 0 0", lineHeight: 1.4 }}>
                                {quiz.description?.[language] || quiz.description}
                              </p>
                              <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                                {quiz.passed ? (
                                  <div style={{
                                    paddingX: 8,
                                    paddingY: 4,
                                    background: "#22c55e",
                                    color: "white",
                                    fontSize: 11,
                                    fontWeight: 600,
                                    borderRadius: 6,
                                    padding: "4px 8px",
                                  }}>
                                    ✓ Passed
                                  </div>
                                ) : quiz.bestScore !== undefined && quiz.bestScore !== null ? (
                                  <div style={{
                                    paddingX: 8,
                                    paddingY: 4,
                                    background: "#ef4444",
                                    color: "white",
                                    fontSize: 11,
                                    fontWeight: 600,
                                    borderRadius: 6,
                                    padding: "4px 8px",
                                  }}>
                                    Not Passed
                                  </div>
                                ) : (
                                  <div style={{
                                    paddingX: 8,
                                    paddingY: 4,
                                    background: colors.borderLight,
                                    color: colors.textSecondary,
                                    fontSize: 11,
                                    fontWeight: 600,
                                    borderRadius: 6,
                                    padding: "4px 8px",
                                  }}>
                                    Not Attempted
                                  </div>
                                )}
                                {quiz.bestScore !== undefined && quiz.bestScore !== null && (
                                  <div style={{
                                    paddingX: 8,
                                    paddingY: 4,
                                    background: colors.borderLight,
                                    color: colors.textSecondary,
                                    fontSize: 11,
                                    fontWeight: 600,
                                    borderRadius: 6,
                                    padding: "4px 8px",
                                  }}>
                                    Best: {quiz.bestScore}%
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : learningView === "guide" ? (
              // Guide view
              activeGuide ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16, borderBottom: `1px solid ${colors.border}` }}>
                    <h3 style={{ color: colors.textPrimary, margin: 0, fontSize: 18, fontWeight: 600 }}>
                      {activeGuide.title?.[language] || activeGuide.title}
                    </h3>
                    <button
                      onClick={() => {
                        setLearningView("menu");
                        setActiveGuide(null);
                        setGuideHistory([]);
                      }}
                      style={{
                        padding: "8px 16px",
                        background: colors.surfaceLight,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 8,
                        color: colors.textPrimary,
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = colors.accentSecondary;
                        e.target.style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = colors.surfaceLight;
                        e.target.style.color = colors.textPrimary;
                      }}
                    >
                      ← Back to Menu
                    </button>
                  </div>

                  {/* Guide node rendering */}
                  {(() => {
                    const currentNodeId = guideHistory[guideHistory.length - 1];
                    const currentNode = activeGuide.node_tree?.find(n => n.id === currentNodeId);

                    if (!currentNode) return <div>Node not found</div>;

                    return (
                      <div>
                        {currentNode.type === "question" ? (
                          <div style={{ padding: 20, background: colors.surfaceLight, borderRadius: 12, marginBottom: 16 }}>
                            <p style={{ color: colors.textPrimary, fontSize: 16, fontWeight: 600, margin: 0, marginBottom: 16 }}>
                              {currentNode.text?.[language] || currentNode.text}
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                              {currentNode.options?.map((opt, i) => (
                                <button
                                  key={i}
                                  onClick={() => navigateGuide(opt.next)}
                                  style={{
                                    padding: "12px 16px",
                                    background: colors.surface,
                                    border: `1px solid ${colors.border}`,
                                    borderRadius: 8,
                                    color: colors.textPrimary,
                                    fontSize: 14,
                                    fontWeight: 500,
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    textAlign: "left",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.target.style.background = colors.accentPrimary;
                                    e.target.style.borderColor = colors.accentPrimary;
                                    e.target.style.color = "white";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.background = colors.surface;
                                    e.target.style.borderColor = colors.border;
                                    e.target.style.color = colors.textPrimary;
                                  }}
                                >
                                  → {opt.label?.[language] || opt.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : currentNode.type === "diagnosis" ? (
                          <div style={{ padding: 20, background: colors.surfaceLight, borderRadius: 12, marginBottom: 16 }}>
                            <h4 style={{ color: colors.accentSecondary, margin: "0 0 16px 0", fontSize: 14, fontWeight: 700, textTransform: "uppercase" }}>
                              Diagnosis
                            </h4>
                            <p style={{ color: colors.textPrimary, fontSize: 15, fontWeight: 500, margin: "0 0 16px 0", lineHeight: 1.6 }}>
                              {currentNode.text?.[language] || currentNode.text}
                            </p>
                            {currentNode.steps && currentNode.steps.length > 0 && (
                              <div>
                                <h5 style={{ color: colors.textPrimary, margin: "16px 0 12px 0", fontSize: 13, fontWeight: 600 }}>
                                  Steps:
                                </h5>
                                <ol style={{ margin: 0, paddingLeft: 20, color: colors.textSecondary, fontSize: 14, lineHeight: 1.8 }}>
                                  {currentNode.steps.map((step, i) => (
                                    <li key={i} style={{ marginBottom: 8 }}>
                                      {typeof step === "string" ? step : step[language] || step.en}
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            )}
                          </div>
                        ) : null}

                        <div style={{ display: "flex", gap: 12, justifyContent: "space-between" }}>
                          <button
                            onClick={guideBack}
                            disabled={guideHistory.length <= 1}
                            style={{
                              padding: "10px 16px",
                              background: guideHistory.length <= 1 ? colors.borderLight : colors.surface,
                              border: `1px solid ${colors.border}`,
                              borderRadius: 8,
                              color: guideHistory.length <= 1 ? colors.textSecondary : colors.textPrimary,
                              fontSize: 13,
                              fontWeight: 600,
                              cursor: guideHistory.length <= 1 ? "not-allowed" : "pointer",
                              opacity: guideHistory.length <= 1 ? 0.5 : 1,
                              transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              if (guideHistory.length > 1) {
                                e.target.style.background = colors.accentSecondary;
                                e.target.style.color = "white";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (guideHistory.length > 1) {
                                e.target.style.background = colors.surface;
                                e.target.style.color = colors.textPrimary;
                              }
                            }}
                          >
                            ← Previous
                          </button>
                          <button
                            onClick={() => {
                              setLearningView("menu");
                              setActiveGuide(null);
                              setGuideHistory([]);
                            }}
                            style={{
                              padding: "10px 16px",
                              background: colors.surface,
                              border: `1px solid ${colors.border}`,
                              borderRadius: 8,
                              color: colors.textPrimary,
                              fontSize: 13,
                              fontWeight: 600,
                              cursor: "pointer",
                              transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = colors.accentSecondary;
                              e.target.style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = colors.surface;
                              e.target.style.color = colors.textPrimary;
                            }}
                          >
                            Start Over
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <div>Guide not loaded</div>
              )
            ) : learningView === "quiz" ? (
              // Quiz view
              activeQuiz ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16, borderBottom: `1px solid ${colors.border}` }}>
                    <h3 style={{ color: colors.textPrimary, margin: 0, fontSize: 18, fontWeight: 600 }}>
                      {activeQuiz.title?.[language] || activeQuiz.title}
                    </h3>
                    <button
                      onClick={() => {
                        setLearningView("menu");
                        setActiveQuiz(null);
                        setQuizResults(null);
                      }}
                      style={{
                        padding: "8px 16px",
                        background: colors.surfaceLight,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 8,
                        color: colors.textPrimary,
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = colors.accentSecondary;
                        e.target.style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = colors.surfaceLight;
                        e.target.style.color = colors.textPrimary;
                      }}
                    >
                      ← Back to Menu
                    </button>
                  </div>

                  {quizResults === null ? (
                    // Taking quiz
                    quizQuestions.length === 0 ? (
                      <div style={{ textAlign: "center", padding: 40, color: colors.textSecondary }}>Loading questions...</div>
                    ) : (
                    <div>
                      {/* Progress bar */}
                      <div style={{ marginBottom: 24 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 12, color: colors.textSecondary }}>
                          <span>Question {quizCurrentQ + 1} of {quizQuestions.length}</span>
                          <span>{quizQuestions.length > 0 ? Math.round((quizCurrentQ / quizQuestions.length) * 100) : 0}%</span>
                        </div>
                        <div style={{ height: 8, background: colors.surfaceLight, borderRadius: 4, overflow: "hidden" }}>
                          <div
                            style={{
                              height: "100%",
                              background: "#ec4899",
                              width: `${(quizCurrentQ / quizQuestions.length) * 100}%`,
                              transition: "width 0.3s ease",
                            }}
                          />
                        </div>
                      </div>

                      {/* Current question */}
                      {quizQuestions[quizCurrentQ] && (
                        <div>
                          <div style={{ padding: 20, background: colors.surfaceLight, borderRadius: 12, marginBottom: 20 }}>
                            <h4 style={{ color: colors.textPrimary, margin: "0 0 16px 0", fontSize: 15, fontWeight: 600 }}>
                              {quizQuestions[quizCurrentQ].text?.[language] || quizQuestions[quizCurrentQ].text}
                            </h4>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                              {quizQuestions[quizCurrentQ].answers?.map((ans, i) => {
                                const isSelected = quizAnswers[quizCurrentQ] === ans.id;
                                return (
                                  <button
                                    key={i}
                                    onClick={() => setQuizAnswers(prev => ({ ...prev, [quizCurrentQ]: ans.id }))}
                                    style={{
                                      padding: "12px 16px",
                                      background: isSelected ? colors.accentPrimary : colors.surface,
                                      border: `2px solid ${isSelected ? colors.accentPrimary : colors.border}`,
                                      borderRadius: 8,
                                      color: isSelected ? "white" : colors.textPrimary,
                                      fontSize: 14,
                                      fontWeight: 500,
                                      cursor: "pointer",
                                      transition: "all 0.2s",
                                      textAlign: "left",
                                    }}
                                    onMouseEnter={(e) => {
                                      if (!isSelected) {
                                        e.target.style.background = colors.surfaceLight;
                                        e.target.style.borderColor = colors.accentPrimary;
                                      }
                                    }}
                                    onMouseLeave={(e) => {
                                      if (!isSelected) {
                                        e.target.style.background = colors.surface;
                                        e.target.style.borderColor = colors.border;
                                      }
                                    }}
                                  >
                                    {ans.text?.[language] || ans.text}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Quiz navigation */}
                          <div style={{ display: "flex", gap: 12, justifyContent: "space-between" }}>
                            <button
                              onClick={() => setQuizCurrentQ(prev => Math.max(0, prev - 1))}
                              disabled={quizCurrentQ === 0}
                              style={{
                                padding: "10px 16px",
                                background: quizCurrentQ === 0 ? colors.borderLight : colors.surface,
                                border: `1px solid ${colors.border}`,
                                borderRadius: 8,
                                color: quizCurrentQ === 0 ? colors.textSecondary : colors.textPrimary,
                                fontSize: 13,
                                fontWeight: 600,
                                cursor: quizCurrentQ === 0 ? "not-allowed" : "pointer",
                                opacity: quizCurrentQ === 0 ? 0.5 : 1,
                                transition: "all 0.2s",
                              }}
                              onMouseEnter={(e) => {
                                if (quizCurrentQ > 0) {
                                  e.target.style.background = colors.accentSecondary;
                                  e.target.style.color = "white";
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (quizCurrentQ > 0) {
                                  e.target.style.background = colors.surface;
                                  e.target.style.color = colors.textPrimary;
                                }
                              }}
                            >
                              ← Previous
                            </button>

                            {quizCurrentQ === quizQuestions.length - 1 ? (
                              <button
                                onClick={submitQuiz}
                                disabled={quizSubmitting || quizAnswers[quizCurrentQ] === undefined}
                                style={{
                                  padding: "10px 24px",
                                  background: quizAnswers[quizCurrentQ] === undefined ? colors.borderLight : colors.accentPrimary,
                                  border: "none",
                                  borderRadius: 8,
                                  color: "white",
                                  fontSize: 13,
                                  fontWeight: 600,
                                  cursor: quizAnswers[quizCurrentQ] === undefined ? "not-allowed" : "pointer",
                                  opacity: quizAnswers[quizCurrentQ] === undefined ? 0.5 : 1,
                                  transition: "all 0.2s",
                                }}
                                onMouseEnter={(e) => {
                                  if (quizAnswers[quizCurrentQ] !== undefined && !quizSubmitting) {
                                    e.target.style.boxShadow = `0 0 12px ${colors.accentPrimary}60`;
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.boxShadow = "none";
                                }}
                              >
                                {quizSubmitting ? "Submitting..." : "Submit Quiz"}
                              </button>
                            ) : (
                              <button
                                onClick={() => setQuizCurrentQ(prev => Math.min(quizQuestions.length - 1, prev + 1))}
                                style={{
                                  padding: "10px 24px",
                                  background: colors.accentPrimary,
                                  border: "none",
                                  borderRadius: 8,
                                  color: "white",
                                  fontSize: 13,
                                  fontWeight: 600,
                                  cursor: "pointer",
                                  transition: "all 0.2s",
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.boxShadow = `0 0 12px ${colors.accentPrimary}60`;
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.boxShadow = "none";
                                }}
                              >
                                Next →
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    )
                  ) : (
                    // Quiz results
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      {/* Score display */}
                      <div style={{
                        padding: 40,
                        background: colors.surfaceLight,
                        borderRadius: 14,
                        textAlign: "center",
                      }}>
                        <div style={{ fontSize: 64, fontWeight: 900, color: quizResults.passed ? "#22c55e" : "#ef4444", marginBottom: 12 }}>
                          {quizResults.percentage}%
                        </div>
                        <div style={{
                          padding: "8px 16px",
                          background: quizResults.passed ? "#22c55e" : "#ef4444",
                          color: "white",
                          fontSize: 12,
                          fontWeight: 700,
                          borderRadius: 6,
                          display: "inline-block",
                          marginBottom: 12,
                        }}>
                          {quizResults.passed ? "PASSED" : "NOT PASSED"}
                        </div>
                        <p style={{ color: colors.textSecondary, fontSize: 14, margin: 0 }}>
                          You answered {quizResults.score} out of {quizResults.totalQuestions} questions correctly.
                        </p>
                      </div>

                      {/* Per-question breakdown */}
                      {quizResults.results && quizResults.results.length > 0 && (
                        <div>
                          <h4 style={{ color: colors.textPrimary, margin: "0 0 16px 0", fontSize: 14, fontWeight: 700, textTransform: "uppercase" }}>
                            Answer Breakdown
                          </h4>
                          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {quizResults.results.map((result, i) => (
                              <div
                                key={i}
                                style={{
                                  padding: 16,
                                  background: colors.surfaceLight,
                                  borderRadius: 12,
                                  borderLeft: `4px solid ${result.is_correct ? "#22c55e" : "#ef4444"}`,
                                }}
                              >
                                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                                  <div style={{
                                    fontSize: 20,
                                    fontWeight: 700,
                                    color: result.is_correct ? "#22c55e" : "#ef4444",
                                  }}>
                                    {result.is_correct ? "✓" : "✕"}
                                  </div>
                                  <div style={{ flex: 1 }}>
                                    <p style={{ color: colors.textPrimary, margin: 0, fontWeight: 500, marginBottom: 8 }}>
                                      Question {i + 1}: {result.question?.[language] || result.question}
                                    </p>
                                    <p style={{ color: colors.textSecondary, margin: 0, fontSize: 13, marginBottom: 6 }}>
                                      Your answer: <span style={{ color: colors.textPrimary, fontWeight: 500 }}>{result.userAnswer?.[language] || result.userAnswer}</span>
                                    </p>
                                    {!result.is_correct && (
                                      <p style={{ color: "#22c55e", margin: 0, fontSize: 13, fontWeight: 500 }}>
                                        Correct answer: {result.correctAnswer?.[language] || result.correctAnswer}
                                      </p>
                                    )}
                                    {result.explanation && (
                                      <p style={{ color: colors.textSecondary, margin: "8px 0 0 0", fontSize: 12, fontStyle: "italic", lineHeight: 1.5 }}>
                                        {result.explanation?.[language] || result.explanation}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action buttons */}
                      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                        <button
                          onClick={() => openQuiz(activeQuiz.slug)}
                          style={{
                            padding: "10px 24px",
                            background: colors.accentPrimary,
                            border: "none",
                            borderRadius: 8,
                            color: "white",
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.boxShadow = `0 0 12px ${colors.accentPrimary}60`;
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.boxShadow = "none";
                          }}
                        >
                          Retake Quiz
                        </button>
                        <button
                          onClick={() => {
                            setLearningView("menu");
                            setActiveQuiz(null);
                            setQuizResults(null);
                          }}
                          style={{
                            padding: "10px 24px",
                            background: colors.surface,
                            border: `1px solid ${colors.border}`,
                            borderRadius: 8,
                            color: colors.textPrimary,
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = colors.surfaceLight;
                            e.target.style.borderColor = colors.accentSecondary;
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = colors.surface;
                            e.target.style.borderColor = colors.border;
                          }}
                        >
                          Back to Menu
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>Quiz not loaded</div>
              )
            ) : null
          ) : contentLoading ? (
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
                    onClick={() => setDocViewer(doc)}
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
                  <span style={{ fontWeight: 700, color: colors.accentSecondary }}>Max</span> is your Body Shop Wiz. Ask about procedures, mixing ratios, SDS safety or any repair question.
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
                  <ChatMessage message={msg} isUser={msg.role === "user"} onPlayVideo={setMediaViewer} onOpenDoc={setDocViewer} theme={theme} />
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

      {/* Document Viewer Modal */}
      {docViewer && <DocViewer doc={docViewer} onClose={() => setDocViewer(null)} token={token} theme={theme} />}

      {/* Media Viewer Modal */}
      {mediaViewer && <MediaViewer item={mediaViewer} onClose={() => setMediaViewer(null)} theme={theme} />}

      {/* Resources & Attribution Footer Bar */}
      <div id="resources-footer-bar" style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 900,
        background: colors.surface, borderTop: `1px solid ${colors.border}`,
        transition: "all 0.3s ease",
      }}>
        <button onClick={() => setShowResources(p => !p)} style={{
          width: "100%", padding: "8px 16px", border: "none", background: "transparent",
          color: colors.textSecondary, cursor: "pointer", display: "flex", alignItems: "center",
          justifyContent: "center", gap: 8, fontSize: 12,
        }}>
          <span>{showResources ? "▼" : "▲"}</span>
          <span>Resources & Attribution</span>
          <span style={{ opacity: 0.5 }}>|</span>
          <span>Terms of Use</span>
        </button>

        {showResources && (
          <div style={{
            maxHeight: 320, overflowY: "auto", padding: "12px 24px 16px",
            background: colors.background, borderTop: `1px solid ${colors.border}`,
            fontSize: 12, lineHeight: 1.6, color: colors.textSecondary,
          }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <p style={{ fontWeight: 600, color: colors.textPrimary, marginBottom: 8, fontSize: 13 }}>
                Data Sources & Attribution
              </p>
              <p style={{ marginBottom: 12 }}>
                Body Shop Wiz by Refinish AI (Ease AI Works) uses information from the following public domain and freely accessible sources.
                All government publications are U.S. federal works in the public domain.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 16 }}>
                <div>
                  <p style={{ fontWeight: 600, color: colors.accentPrimary, marginBottom: 4 }}>OSHA (Public Domain)</p>
                  <p>Autobody Repair & Refinishing Standards — <a href="https://www.osha.gov/autobody" target="_blank" rel="noopener" style={{ color: colors.accentPrimary }}>osha.gov/autobody</a></p>
                  <p>Hazard Communication Standard (29 CFR 1910.1200)</p>
                  <p>Respiratory Protection (29 CFR 1910.134)</p>
                  <p>Spray Finishing Operations (29 CFR 1910.94)</p>
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: colors.accentPrimary, marginBottom: 4 }}>EPA (Public Domain)</p>
                  <p>VOC Limits: 40 CFR 59 Subpart B — <a href="https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-59/subpart-B" target="_blank" rel="noopener" style={{ color: colors.accentPrimary }}>ecfr.gov</a></p>
                  <p>6H Rule / NESHAP: 40 CFR 63 Subpart HHHHHH</p>
                  <p>RCRA Hazardous Waste (40 CFR 260-270)</p>
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: colors.accentPrimary, marginBottom: 4 }}>NIOSH / CDC (Public Domain)</p>
                  <p>Sanding Dust Control (Pub. 96-105) — <a href="https://www.cdc.gov/niosh/docs/hazardcontrol/hc1.html" target="_blank" rel="noopener" style={{ color: colors.accentPrimary }}>cdc.gov/niosh</a></p>
                  <p>Paint Overspray Control (Pub. 96-106) — <a href="https://www.cdc.gov/niosh/docs/hazardcontrol/hc2.html" target="_blank" rel="noopener" style={{ color: colors.accentPrimary }}>cdc.gov/niosh</a></p>
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: colors.accentPrimary, marginBottom: 4 }}>Manufacturer Resources (Free Access)</p>
                  <p>PPG SDS/TDS — <a href="https://www.ppg.com/en-US/refinish/support/health-and-safety/sds-search" target="_blank" rel="noopener" style={{ color: colors.accentPrimary }}>ppg.com</a></p>
                  <p>Axalta/Cromax — <a href="https://www.axalta.com/cromax_us/en_US/products/technical-center.html" target="_blank" rel="noopener" style={{ color: colors.accentPrimary }}>axalta.com</a></p>
                  <p>Sherwin-Williams — <a href="https://tds.sherwin-automotive.com/en/show_region_products/all" target="_blank" rel="noopener" style={{ color: colors.accentPrimary }}>sherwin-automotive.com</a></p>
                  <p>BASF — <a href="https://products.basf.com/global/en/downloads" target="_blank" rel="noopener" style={{ color: colors.accentPrimary }}>basf.com</a></p>
                  <p>3M — <a href="https://www.3m.com/3M/en_US/company-us/SDS-search/" target="_blank" rel="noopener" style={{ color: colors.accentPrimary }}>3m.com</a></p>
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: colors.accentPrimary, marginBottom: 4 }}>Industry Training (Reference)</p>
                  <p>I-CAR — <a href="https://www.i-car.com/" target="_blank" rel="noopener" style={{ color: colors.accentPrimary }}>i-car.com</a></p>
                  <p>PaintDocs.com — <a href="https://paintdocs.com/" target="_blank" rel="noopener" style={{ color: colors.accentPrimary }}>paintdocs.com</a></p>
                </div>
              </div>

              <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: 12, marginTop: 4 }}>
                <p style={{ fontWeight: 600, color: colors.textPrimary, marginBottom: 6, fontSize: 13 }}>Important Disclaimer</p>
                <p style={{ fontSize: 11 }}>
                  Body Shop Wiz is an AI-powered assistant provided by Refinish AI (Ease AI Works). AI-generated content may contain inaccuracies.
                  This tool does NOT replace professional judgment, OEM repair procedures, hands-on vehicle inspection, or qualified technician expertise.
                  All AI outputs must be independently verified before use in any repair, estimate, or safety-critical decision.
                  By using this application, you agree to our Terms of Use and accept full responsibility for verifying all information before relying on it.
                  Refinish AI is not liable for decisions made based on AI outputs. See full Terms & Conditions for details.
                </p>
                <p style={{ fontSize: 11, marginTop: 6, opacity: 0.7 }}>
                  © {new Date().getFullYear()} Refinish AI — Ease AI Works. All rights reserved. Powered by Anthropic Claude.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Hex to RGB helper
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1],16)},${parseInt(result[2],16)},${parseInt(result[3],16)}` : "249,115,22";
}
