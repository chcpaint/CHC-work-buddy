import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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
          {/* Gradient Definitions */}
          <defs>
            <radialGradient id="skinGradient" cx="40%" cy="35%">
              <stop offset="0%" stopColor="#d8a680" />
              <stop offset="100%" stopColor="#b8845c" />
            </radialGradient>
            <radialGradient id="hairGradient" cx="50%" cy="30%">
              <stop offset="0%" stopColor="#5a5a5a" />
              <stop offset="100%" stopColor="#3a3a3a" />
            </radialGradient>
            <radialGradient id="coverallsGradient" cx="50%" cy="30%">
              <stop offset="0%" stopColor="#4a5058" />
              <stop offset="100%" stopColor="#2a2d32" />
            </radialGradient>
            <radialGradient id="glassGradient" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#99d4ff" />
              <stop offset="100%" stopColor="#4499dd" />
            </radialGradient>
            <filter id="avatarShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
              <feOffset dx="0" dy="3" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background with subtle gradient */}
          <rect width="120" height="120" fill="#0f2040" rx="60" />
          <ellipse cx="60" cy="60" rx="58" ry="58" fill="url(#skinGradient)" opacity="0.08" />

          {/* Coveralls body — charcoal gray mechanic suit with gradient */}
          <rect x="18" y="92" width="84" height="32" rx="8" fill="url(#coverallsGradient)" />
          {/* Coverall shoulders */}
          <path d="M18 100 Q18 88 35 85 L46 85 L46 100Z" fill="url(#coverallsGradient)" />
          <path d="M102 100 Q102 88 85 85 L74 85 L74 100Z" fill="url(#coverallsGradient)" />
          {/* Subtle shadow under coveralls */}
          <rect x="18" y="122" width="84" height="4" rx="2" fill="rgba(0,0,0,0.2)" />
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

          {/* Head with radial gradient for depth */}
          <ellipse cx="60" cy="55" rx="28" ry="30" fill="url(#skinGradient)" />
          {/* Subtle highlight on forehead */}
          <ellipse cx="60" cy="40" rx="16" ry="8" fill="white" opacity="0.08" />
          {/* Shadow under chin/jaw */}
          <ellipse cx="60" cy="82" rx="24" ry="6" fill="rgba(0,0,0,0.15)" />

          {/* Hair - salt & pepper, short with gradient and smooth curves */}
          <path d="M32 45 Q34 25 60 22 Q86 25 88 45 Q84 30 60 28 Q36 30 32 45Z" fill="url(#hairGradient)" />
          {/* Hair texture lines - smoother curves */}
          <path d="M34 38 Q33 30 38 27" stroke="#7a7a7a" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
          <path d="M86 38 Q87 30 82 27" stroke="#7a7a7a" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
          <path d="M44 32 Q45 26 50 24" stroke="#6a6a6a" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
          <path d="M76 32 Q75 26 70 24" stroke="#6a6a6a" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />

          {/* Ears */}
          <ellipse cx="32" cy="55" rx="5" ry="7" fill="#b8845c" />
          <ellipse cx="88" cy="55" rx="5" ry="7" fill="#b8845c" />

          {/* Safety glasses pushed up on forehead - polished */}
          <ellipse cx="42" cy="37" rx="8" ry="6" fill="url(#glassGradient)" opacity="0.7" stroke="#4499dd" strokeWidth="1.5" />
          <ellipse cx="78" cy="37" rx="8" ry="6" fill="url(#glassGradient)" opacity="0.7" stroke="#4499dd" strokeWidth="1.5" />
          <path d="M50 37 Q60 36 70 37" stroke="#4499dd" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
          {/* Glass shine/glint */}
          <ellipse cx="40" cy="35" rx="3" ry="2" fill="white" opacity="0.4" />
          <ellipse cx="76" cy="35" rx="3" ry="2" fill="white" opacity="0.4" />

          {/* Eyes - softer, rounder appearance */}
          <ellipse cx="48" cy="52" rx="8.5" ry={eyeBlink ? 1 : 6.5} fill="white" />
          <ellipse cx="72" cy="52" rx="8.5" ry={eyeBlink ? 1 : 6.5} fill="white" />
          {/* Slight white highlight for glossy effect */}
          <circle cx="48" cy="50" r="3.5" fill="rgba(255,255,255,0.3)" opacity="0.5" />
          <circle cx="72" cy="50" r="3.5" fill="rgba(255,255,255,0.3)" opacity="0.5" />
          {/* Pupils */}
          <circle cx="50" cy="53" r="3.5" fill="#3d2b1f" />
          <circle cx="74" cy="53" r="3.5" fill="#3d2b1f" />
          {/* Subtle eye shine */}
          <circle cx="51" cy="51" r="1.2" fill="white" />
          <circle cx="75" cy="51" r="1.2" fill="white" />
          {/* Eyebrows - softer curves */}
          <path d="M41 44 Q48 40.5 55 44" stroke="#3d3d3d" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
          <path d="M65 44 Q72 40.5 79 44" stroke="#3d3d3d" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />

          {/* Nose - smoother curves */}
          <path d="M59 55 Q57 61 59 64 Q60 65.5 61 64 Q63 61 61 55" stroke="#a86450" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />

          {/* Mouth - smoother, more natural */}
          <path
            d={mouthOpen
              ? "M50 74 Q60 82 70 74 Q60 78 50 74Z"
              : "M50 73 Q60 77 70 73"}
            stroke="#8b5555" strokeWidth="1.8" fill={mouthOpen ? "#6a2a2a" : "none"} strokeLinecap="round"
          />
          {/* Teeth visible when talking - glossier */}
          {mouthOpen && (
            <>
              <rect x="54" y="75" width="12" height="3" rx="1" fill="white" opacity="0.95" />
              <rect x="54" y="75" width="12" height="1" rx="0.5" fill="rgba(255,255,255,0.3)" opacity="0.6" />
            </>
          )}

          {/* Subtle smile lines / character */}
          <path d="M44 68 Q45 69.5 44 71" stroke="#a87050" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.5" />
          <path d="M76 68 Q75 69.5 76 71" stroke="#a87050" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.5" />

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
        width: 64, height: 64,
        borderRadius: "50%",
        border: `3px solid ${isListening ? "#22c55e" : colors.borderLight}`,
        background: isListening
          ? "linear-gradient(135deg, rgba(34,197,94,0.25), rgba(34,197,94,0.1))"
          : `linear-gradient(135deg, ${colors.surfaceLight}, ${colors.surface})`,
        color: isListening ? "#22c55e" : colors.textSecondary,
        fontSize: 28,
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        flexShrink: 0,
        boxShadow: isListening
          ? "0 0 20px rgba(34,197,94,0.4), 0 0 40px rgba(34,197,94,0.15)"
          : "0 4px 16px rgba(0,0,0,0.15)",
        transform: "scale(1)",
        animation: isListening ? "pulseGlow 1.5s ease-in-out infinite" : "none",
      }}
      onMouseEnter={(e) => { e.target.style.transform = "scale(1.08)"; }}
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
        background: `linear-gradient(135deg, ${colors.surface}, ${colors.surfaceLight})`,
        border: `1.5px solid ${colors.border}`,
        borderRadius: 16,
        padding: 16,
        cursor: "pointer",
        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        display: "flex", gap: 12, alignItems: "flex-start",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: `0 8px 24px rgba(0,0,0,0.1), inset 1px 1px 0 ${colors.border}`,
        transform: "translateY(0) scale(1)",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-6px) scale(1.02)";
        e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.15), inset 1px 1px 0 ${colors.border}`;
        e.currentTarget.style.borderColor = colors.accentPrimary + "40";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.1), inset 1px 1px 0 ${colors.border}`;
        e.currentTarget.style.borderColor = colors.border;
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
function ChatMessage({ message, isUser, onPlayVideo, onOpenDoc, theme = "dark", onSpeak, onStopSpeaking, isSpeaking, awaitingContinue, onContinueReading }) {
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
          ? `linear-gradient(135deg, ${colors.accentSecondary}25, ${colors.accentSecondary}12)`
          : `linear-gradient(135deg, ${colors.surface}, ${colors.surfaceLight})`,
        border: `1px solid ${isUser ? `${colors.accentSecondary}35` : colors.border}`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        color: colors.textPrimary,
        fontSize: 13,
        lineHeight: 1.6,
        whiteSpace: "pre-wrap",
        boxShadow: isUser
          ? `0 4px 16px ${colors.accentSecondary}20`
          : `inset 1px 1px 0 ${colors.border}, 0 4px 12px rgba(0,0,0,0.08)`,
      }}>
        {/* Continue Reading Banner — shown at TOP of message so it's always visible */}
        {awaitingContinue && (
          <div
            onClick={() => onContinueReading && onContinueReading()}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: "10px 16px", marginBottom: 10, borderRadius: 12,
              background: "linear-gradient(135deg, rgba(34,197,94,0.2), rgba(34,197,94,0.08))",
              border: "1.5px solid rgba(34,197,94,0.4)",
              cursor: "pointer",
              animation: "pulseGlow 1.5s ease-in-out infinite",
              boxShadow: "0 4px 16px rgba(34,197,94,0.25)",
            }}
          >
            <span style={{ fontSize: 20 }}>🎙️</span>
            <span style={{ color: "#22c55e", fontSize: 13, fontWeight: 700 }}>
              Say "YES" or tap here to hear full answer
            </span>
          </div>
        )}
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
              padding: "4px 12px", borderRadius: 20, marginBottom: 8,
              fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase",
              cursor: "pointer", transition: "all 0.25s ease",
              background: message.answerSource === "vector" ? "rgba(34,197,94,0.18)" : message.answerSource === "rag" ? "rgba(59,130,246,0.18)" : "rgba(249,115,22,0.18)",
              color: message.answerSource === "vector" ? "#22c55e" : message.answerSource === "rag" ? "#3b82f6" : "#f97316",
              border: `1.5px solid ${message.answerSource === "vector" ? "#22c55e40" : message.answerSource === "rag" ? "#3b82f640" : "#f9731640"}`,
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              boxShadow: message.answerSource === "vector"
                ? "0 0 12px rgba(34,197,94,0.15)"
                : message.answerSource === "rag"
                ? "0 0 12px rgba(59,130,246,0.15)"
                : "0 0 12px rgba(249,115,22,0.15)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.filter = "brightness(1.35)";
              e.currentTarget.style.transform = "scale(1.08) translateY(-1px)";
              e.currentTarget.style.boxShadow = message.answerSource === "vector"
                ? "0 4px 16px rgba(34,197,94,0.3)"
                : message.answerSource === "rag"
                ? "0 4px 16px rgba(59,130,246,0.3)"
                : "0 4px 16px rgba(249,115,22,0.3)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.filter = "brightness(1)";
              e.currentTarget.style.transform = "scale(1) translateY(0)";
              e.currentTarget.style.boxShadow = message.answerSource === "vector"
                ? "0 0 12px rgba(34,197,94,0.15)"
                : message.answerSource === "rag"
                ? "0 0 12px rgba(59,130,246,0.15)"
                : "0 0 12px rgba(249,115,22,0.15)";
            }}
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
                  padding: "10px 14px", marginBottom: 8,
                  borderRadius: 12,
                  background: `linear-gradient(135deg, ${colors.accentPrimary}12, ${colors.accentPrimary}06)`,
                  border: `1.5px solid ${colors.accentPrimary}30`,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  boxShadow: `0 4px 12px ${colors.accentPrimary}08`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${colors.accentPrimary}20, ${colors.accentPrimary}10)`;
                  e.currentTarget.style.borderColor = `${colors.accentPrimary}60`;
                  e.currentTarget.style.transform = "translateX(4px) translateY(-1px)";
                  e.currentTarget.style.boxShadow = `0 8px 20px ${colors.accentPrimary}15`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${colors.accentPrimary}12, ${colors.accentPrimary}06)`;
                  e.currentTarget.style.borderColor = `${colors.accentPrimary}30`;
                  e.currentTarget.style.transform = "translateX(0) translateY(0)";
                  e.currentTarget.style.boxShadow = `0 4px 12px ${colors.accentPrimary}08`;
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
      {/* Shop-friendly TTS controls — large buttons for dirty/gloved hands */}
      {!isUser && message.content && message.content.length > 80 && onSpeak && (
        <div style={{ alignSelf: "flex-end", marginLeft: 4, marginBottom: 4, zIndex: 2, display: "flex", flexDirection: "column", gap: 6 }}>
          {/* Speaking / Read controls */}
          {isSpeaking ? (
            <button
              onClick={() => onStopSpeaking && onStopSpeaking()}
              title="Stop reading"
              style={{
                background: "linear-gradient(135deg, #ef4444, #dc2626)", color: "white",
                border: "none", borderRadius: 28,
                width: 56, height: 56, fontSize: 20,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 16px rgba(239,68,68,0.5)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              ■
            </button>
          ) : (
            <button
              onClick={() => onSpeak(message.content, { fullRead: true })}
              title="Read full answer"
              style={{
                background: `linear-gradient(135deg, ${colors.accentSecondary}, ${colors.accentSecondary}cc)`, color: "white",
                border: "none", borderRadius: 28,
                width: 56, height: 56, fontSize: 22,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 4px 16px ${colors.accentSecondary}50`,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              🔊
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Document Viewer ──────────────────────────────────────────
function DocViewer({ doc, onClose, token, theme = "dark", language = "en" }) {
  const colors = themes[theme];
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [scriptLoading, setScriptLoading] = useState(false);
  const [videoScript, setVideoScript] = useState(null);
  const [showScript, setShowScript] = useState(false);

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

        {/* Video Script Panel */}
        {showScript && videoScript && (
          <div style={{
            padding: "16px 24px",
            borderTop: `1px solid ${colors.border}`,
            maxHeight: "40vh",
            overflow: "auto",
            background: `${colors.background}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ color: colors.accentSecondary, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                Video Script — {videoScript.metadata?.sceneCount} scenes, {videoScript.metadata?.estimatedDuration}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(videoScript.script);
                    const btn = document.getElementById("copy-script-btn");
                    if (btn) { btn.textContent = "Copied!"; setTimeout(() => btn.textContent = "Copy Script", 1500); }
                  }}
                  id="copy-script-btn"
                  style={{
                    background: `${colors.accentPrimary}15`, color: colors.accentPrimary,
                    border: `1px solid ${colors.accentPrimary}30`, borderRadius: 8,
                    padding: "4px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer",
                  }}
                >Copy Script</button>
                <button
                  onClick={() => setShowScript(false)}
                  style={{
                    background: `${colors.textSecondary}15`, color: colors.textSecondary,
                    border: `1px solid ${colors.textSecondary}30`, borderRadius: 8,
                    padding: "4px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer",
                  }}
                >Hide</button>
              </div>
            </div>
            <pre style={{
              color: colors.textPrimary,
              fontSize: 12,
              lineHeight: 1.7,
              whiteSpace: "pre-wrap",
              fontFamily: "'Barlow', monospace",
              background: `${colors.surface}`,
              padding: 16,
              borderRadius: 10,
              border: `1px solid ${colors.border}`,
            }}>{videoScript.script}</pre>
          </div>
        )}

        {/* Footer */}
        <div style={{ padding: "12px 24px", borderTop: `1px solid ${colors.border}`, flexShrink: 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {/* Generate Video Script button */}
            <button
              onClick={async () => {
                if (videoScript) { setShowScript(!showScript); return; }
                setScriptLoading(true);
                try {
                  const res = await authFetch(`${API_BASE}/api/video-scripts/generate/${doc.id}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ language }),
                  });
                  if (!res.ok) throw new Error(`HTTP ${res.status}`);
                  const data = await res.json();
                  setVideoScript(data);
                  setShowScript(true);
                } catch (err) {
                  console.error("Script generation error:", err);
                } finally {
                  setScriptLoading(false);
                }
              }}
              disabled={scriptLoading}
              style={{
                background: scriptLoading ? `${colors.textSecondary}15` : `${colors.accentSecondary}15`,
                color: scriptLoading ? colors.textSecondary : colors.accentSecondary,
                border: `1px solid ${scriptLoading ? colors.textSecondary + "30" : colors.accentSecondary + "30"}`,
                borderRadius: 8,
                padding: "6px 14px", fontSize: 11, fontWeight: 600,
                cursor: scriptLoading ? "wait" : "pointer",
                display: "flex", alignItems: "center", gap: 6,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => { if (!scriptLoading) e.currentTarget.style.background = `${colors.accentSecondary}25`; }}
              onMouseLeave={e => { if (!scriptLoading) e.currentTarget.style.background = `${colors.accentSecondary}15`; }}
            >
              {scriptLoading ? (
                <><span style={{ animation: "pulse 1s ease-in-out infinite" }}>Generating...</span></>
              ) : videoScript ? (
                <>{showScript ? "Hide Script" : "Show Script"}</>
              ) : (
                <>🎬 Generate Video Script</>
              )}
            </button>
          </div>
          {doc.file_url && (
            <a href={doc.file_url} target="_blank" rel="noreferrer" style={{
              color: colors.accentPrimary, fontSize: 12, textDecoration: "none", fontWeight: 500,
            }}>
              Open original file ↗
            </a>
          )}
        </div>
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

// ─── Module-level TTS guards (shared across all component instances) ──
let _ttsGeneration = 0;       // Generation counter for async TTS cancellation
let _speakLockActive = false;  // Prevents duplicate speak() calls

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
  const [paintSection, setPaintSection] = useState(null); // process section filter for painting tab

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
  const [showTerms, setShowTerms] = useState(false);

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

  // Note: Browser speechSynthesis removed — all voice output uses OpenAI cloud TTS only

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

  // All voice output is handled by OpenAI cloud TTS — no browser voices

  // Clean text for natural speech — strip markdown, symbols, URLs, formatting
  const cleanForSpeech = useCallback((text) => {
    let s = text;
    // Remove emoji (unicode ranges + common text emoji)
    s = s.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1FA00}-\u{1FA9F}]/gu, "");
    // Remove markdown bold/italic: **text** → text, *text* → text, __text__ → text
    s = s.replace(/\*{1,3}([^*]+)\*{1,3}/g, "$1");
    s = s.replace(/_{1,2}([^_]+)_{1,2}/g, "$1");
    // Remove markdown headers: ### Title → Title
    s = s.replace(/^#{1,6}\s+/gm, "");
    // Remove markdown links: [text](url) → text
    s = s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    // Remove bare URLs
    s = s.replace(/https?:\/\/[^\s)]+/g, "");
    // Remove markdown bullet markers: - item, * item, • item
    s = s.replace(/^[\s]*[-*•]\s+/gm, "");
    // Remove numbered list markers: 1. item, 2) item
    s = s.replace(/^[\s]*\d+[.)]\s+/gm, "");
    // Remove code blocks and inline code
    s = s.replace(/```[\s\S]*?```/g, "");
    s = s.replace(/`([^`]+)`/g, "$1");
    // Remove special characters that get vocalized weirdly
    s = s.replace(/[~|<>{}[\]\\/#@^&=+]/g, " ");
    // Remove repeated punctuation (!!!, ???, ...)
    s = s.replace(/([!?.]){2,}/g, "$1");
    // Remove "Sources:" section and everything after it
    s = s.replace(/sources?\s*[:—-][\s\S]*/i, "");
    // Collapse multiple spaces/newlines into single space
    s = s.replace(/\s+/g, " ");
    return s.trim();
  }, []);

  // Extract a short spoken summary — first 1-2 sentences, max ~150 chars
  const getShortSummary = useCallback((text) => {
    const clean = cleanForSpeech(text);
    // Split on sentence endings
    const sentences = clean.split(/(?<=[.!?])\s+/);
    let summary = sentences[0] || clean.slice(0, 120);
    // If first sentence is very short, grab a second
    if (summary.length < 60 && sentences[1]) {
      summary += " " + sentences[1];
    }
    // Cap at ~150 chars for a quick read
    if (summary.length > 150) {
      summary = summary.slice(0, 147) + "...";
    }
    return summary;
  }, [cleanForSpeech]);

  // ── Cloud TTS (OpenAI) — consistent natural voice for all speech ──
  const [awaitingContinue, setAwaitingContinue] = useState(false);
  const pendingFullTextRef = useRef(null);
  const continueListenerRef = useRef(null);
  const ttsAudioRef = useRef(null);  // Current playing Audio element
  // ttsGenRef replaced by module-level _ttsGeneration
  const prefetchedAudioRef = useRef(null);  // Pre-fetched continuation audio blob URL

  // ── Cloud TTS only — no browser voice fallback ──
  // Uses module-level generation counter: each new call increments _ttsGeneration.
  // If a stale call finishes after a newer call started, it detects the mismatch
  // and silently aborts. Module-level ensures it works even if component double-mounts.
  const playCloudTTS = useCallback(async (text, { onStart, onEnd, onError } = {}) => {
    // Stop any currently playing audio
    if (ttsAudioRef.current) {
      try { ttsAudioRef.current.pause(); } catch(e) {}
      ttsAudioRef.current.src = "";
      ttsAudioRef.current = null;
    }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();

    // Increment module-level generation — stale requests from any instance will be discarded
    const thisGen = ++_ttsGeneration;
    console.log("[TTS] Gen", thisGen, "— Requesting cloud TTS, lang:", language, "text length:", text.length);

    try {
      const res = await authFetch(`${API_BASE}/api/tts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language }),
      });

      // Stale check — a newer speak() call happened while we were fetching
      if (thisGen !== _ttsGeneration) {
        console.log("[TTS] Gen", thisGen, "— Stale, discarding (current gen:", _ttsGeneration + ")");
        return;
      }

      if (!res.ok) {
        console.error("[TTS] API error:", res.status);
        onError?.();
        return;
      }

      const cacheStatus = res.headers.get("X-TTS-Cache") || "unknown";
      const blob = await res.blob();

      // Stale check again after blob download
      if (thisGen !== _ttsGeneration) {
        console.log("[TTS] Gen", thisGen, "— Stale after download, discarding");
        return;
      }

      console.log("[TTS] Gen", thisGen, "— Received audio:", blob.size, "bytes, cache:", cacheStatus);

      if (blob.size < 100) {
        console.error("[TTS] Audio too small:", blob.size, "bytes — skipping");
        onError?.();
        return;
      }

      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.volume = 1.0;
      ttsAudioRef.current = audio;

      audio.onplay = () => {
        console.log("[TTS] Gen", thisGen, "— Playing audio (" + blob.size + " bytes)");
        onStart?.();
      };
      audio.onended = () => {
        console.log("[TTS] Gen", thisGen, "— Ended");
        URL.revokeObjectURL(url);
        if (ttsAudioRef.current === audio) ttsAudioRef.current = null;
        onEnd?.();
      };
      audio.onerror = (e) => {
        console.error("[TTS] Gen", thisGen, "— Playback error:", e?.target?.error?.message || e);
        URL.revokeObjectURL(url);
        if (ttsAudioRef.current === audio) ttsAudioRef.current = null;
        onError?.();
      };

      await audio.play();
    } catch (err) {
      if (thisGen === _ttsGeneration) {
        console.warn("[TTS] Gen", thisGen, "— Cloud TTS unavailable:", err.message);
        ttsAudioRef.current = null;
        onError?.();
      }
    }
  }, [language]);

  // Pre-fetch TTS audio without playing — returns blob URL for instant playback later
  const prefetchTTS = useCallback(async (text) => {
    try {
      console.log("[TTS] Pre-fetching remainder audio, length:", text.length);
      const res = await authFetch(`${API_BASE}/api/tts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language }),
      });
      if (!res.ok) return null;
      const blob = await res.blob();
      if (blob.size < 100) return null;
      const url = URL.createObjectURL(blob);
      console.log("[TTS] Pre-fetch complete:", blob.size, "bytes ready");
      return url;
    } catch (err) {
      console.warn("[TTS] Pre-fetch failed:", err.message);
      return null;
    }
  }, [language]);

  // Play pre-fetched audio instantly (no API call needed)
  const playPrefetched = useCallback((blobUrl, { onStart, onEnd, onError } = {}) => {
    if (ttsAudioRef.current) {
      try { ttsAudioRef.current.pause(); } catch(e) {}
      ttsAudioRef.current.src = "";
      ttsAudioRef.current = null;
    }
    const audio = new Audio(blobUrl);
    audio.volume = 1.0;
    ttsAudioRef.current = audio;
    audio.onplay = () => { console.log("[TTS] Playing pre-fetched audio"); onStart?.(); };
    audio.onended = () => { URL.revokeObjectURL(blobUrl); ttsAudioRef.current = null; onEnd?.(); };
    audio.onerror = (e) => { URL.revokeObjectURL(blobUrl); ttsAudioRef.current = null; onError?.(); };
    audio.play().catch(() => { onError?.(); });
  }, []);

  // Start a brief voice listener for "continue" / "yes" / "read it" commands
  // Uses interimResults for near-instant detection + debounce to prevent repeats
  const continueTriggeredRef = useRef(false);
  const startContinueListener = useCallback((remainderText) => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) return;
    continueTriggeredRef.current = false;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const listener = new SR();
    listener.continuous = true;        // Keep listening for the full timeout
    listener.interimResults = true;    // React to partial speech instantly
    listener.lang = language === "fr" ? "fr-CA" : language === "es" ? "es-MX" : "en-US";

    const continueWords = language === "fr"
      ? ["oui", "continue", "lis", "vas-y", "lire", "go"]
      : language === "es"
      ? ["si", "sí", "continua", "lee", "dale", "leer", "go"]
      : ["yes", "yeah", "continue", "read", "go", "go ahead", "read it", "keep going", "sure", "yep", "okay"];

    listener.onresult = (event) => {
      // Check ALL results including interim (partial) ones for speed
      for (let i = 0; i < event.results.length; i++) {
        const transcript = event.results[i][0]?.transcript?.toLowerCase().trim() || "";
        const shouldContinue = continueWords.some(w => transcript.includes(w));
        if (shouldContinue && pendingFullTextRef.current && !continueTriggeredRef.current) {
          continueTriggeredRef.current = true; // Debounce — only trigger once
          try { listener.stop(); } catch(e) {}
          setAwaitingContinue(false);
          const remainderClean = pendingFullTextRef.current;
          pendingFullTextRef.current = null;
          // Use pre-fetched audio for instant playback, fall back to live TTS
          const prefetched = prefetchedAudioRef.current;
          prefetchedAudioRef.current = null;
          if (prefetched) {
            console.log("[TTS] Using pre-fetched remainder — instant playback");
            playPrefetched(prefetched, {
              onStart: () => setIsSpeaking(true),
              onEnd: () => setIsSpeaking(false),
              onError: () => setIsSpeaking(false),
            });
          } else {
            console.log("[TTS] No pre-fetch ready, fetching remainder live");
            playCloudTTS(remainderClean.slice(0, 3000), {
              onStart: () => setIsSpeaking(true),
              onEnd: () => setIsSpeaking(false),
              onError: () => setIsSpeaking(false),
            });
          }
          return;
        }
      }
    };
    listener.onerror = () => {
      if (!continueTriggeredRef.current) setAwaitingContinue(false);
    };
    listener.onend = () => {
      if (!continueTriggeredRef.current) {
        setTimeout(() => { setAwaitingContinue(false); }, 300);
      }
    };

    continueListenerRef.current = listener;
    try { listener.start(); } catch(e) {}

    // Auto-timeout after 10 seconds
    setTimeout(() => {
      if (!continueTriggeredRef.current) {
        try { listener.stop(); } catch(e) {}
        setAwaitingContinue(false);
      }
    }, 10000);
  }, [language, playCloudTTS, playPrefetched]);

  const speak = useCallback(async (text, { fullRead = false } = {}) => {
    // Module-level lock — prevents duplicate speak() calls even across component instances
    console.log("[TTS] speak() called — fullRead:", fullRead, "lockActive:", _speakLockActive, "textLen:", text?.length);
    console.trace("[TTS] speak() call trace");
    if (!fullRead && _speakLockActive) {
      console.log("[TTS] speak() BLOCKED — already in progress");
      return;
    }
    if (!fullRead) _speakLockActive = true;

    // Stop any current audio (generation counter in playCloudTTS handles the rest)
    if (ttsAudioRef.current) {
      ttsAudioRef.current.pause();
      ttsAudioRef.current.src = "";
      ttsAudioRef.current = null;
    }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setAwaitingContinue(false);
    pendingFullTextRef.current = null;
    // Clean up any stale pre-fetched audio
    if (prefetchedAudioRef.current) {
      try { URL.revokeObjectURL(prefetchedAudioRef.current); } catch(e) {}
      prefetchedAudioRef.current = null;
    }

    const clean = cleanForSpeech(text);
    const isLongAnswer = clean.length > 200;

    if (fullRead) {
      // Direct full read — remainder only (already stripped of summary)
      await playCloudTTS(clean.slice(0, 3000), {
        onStart: () => setIsSpeaking(true),
        onEnd: () => { setIsSpeaking(false); _speakLockActive = false; },
        onError: () => { setIsSpeaking(false); _speakLockActive = false; },
      });
      return;
    }

    // Speak summary via cloud TTS, then immediately listen for "yes" / "continue"
    const summary = getShortSummary(clean);
    setIsSpeaking(true);

    // Compute remainder (everything after the summary) so we never repeat
    const remainder = clean.slice(summary.length).trim();
    const hasRemainder = remainder.length > 20;

    // Start pre-fetching the remainder audio NOW while summary plays
    // This way it's ready instantly when the user says "yes"
    if (isLongAnswer && hasRemainder) {
      console.log("[TTS] Pre-fetching remainder while summary plays, remainder length:", remainder.length);
      prefetchTTS(remainder.slice(0, 3000)).then((blobUrl) => {
        if (blobUrl) {
          prefetchedAudioRef.current = blobUrl;
          console.log("[TTS] Remainder audio pre-fetched and ready");
        }
      });
    }

    await playCloudTTS(summary, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => {
        setIsSpeaking(false);
        _speakLockActive = false;  // Release lock after summary finishes
        if (isLongAnswer && hasRemainder) {
          // Store REMAINDER only — not the full text
          pendingFullTextRef.current = remainder;
          setAwaitingContinue(true);
          // Start listening immediately — no second TTS prompt needed
          startContinueListener(remainder);
        }
      },
      onError: () => { setIsSpeaking(false); _speakLockActive = false; },
    });
  }, [language, getShortSummary, cleanForSpeech, playCloudTTS, prefetchTTS, startContinueListener]);

  const stopSpeaking = useCallback(() => {
    // Stop cloud TTS audio
    if (ttsAudioRef.current) {
      ttsAudioRef.current.pause();
      ttsAudioRef.current.src = "";
      ttsAudioRef.current = null;
    }
    // Also cancel any browser TTS (legacy cleanup)
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setAwaitingContinue(false);
    pendingFullTextRef.current = null;
    _speakLockActive = false;  // Release speak lock
    // Clean up pre-fetched audio
    if (prefetchedAudioRef.current) {
      try { URL.revokeObjectURL(prefetchedAudioRef.current); } catch(e) {}
      prefetchedAudioRef.current = null;
    }
    try { continueListenerRef.current?.stop(); } catch(e) {}
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      // Stop any current speech before listening
      if (ttsAudioRef.current) { try { ttsAudioRef.current.pause(); } catch(e) {} ttsAudioRef.current = null; }
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      setIsSpeaking(false);
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch {}
    }
  }, [isListening]);

  // ── Spacebar & tap-to-listen (hands-free activation) ──
  // Spacebar toggles mic when NOT typing in the textarea
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only activate on spacebar
      if (e.code !== "Space") return;
      // Don't activate when typing in inputs/textareas/contenteditable
      const tag = e.target?.tagName?.toLowerCase();
      if (tag === "textarea" || tag === "input" || tag === "select" || e.target?.isContentEditable) return;
      // Don't activate when modifiers are held
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
      e.preventDefault();
      toggleListening();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleListening]);

  // Fetch tab content (uses authFetch for auto token refresh)
  useEffect(() => {
    if (!token) return;
    setContentLoading(true);
    authFetch(`${API_BASE}/api/documents?tab=${activeTab}&limit=${activeTab === 'painting' ? 200 : 50}`)
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
  const sendingRef = useRef(false);  // Ref-based guard — React state batching can't defeat this
  // speakLockRef replaced by module-level _speakLockActive
  const handleSendMessage = async (overrideText) => {
    const text = (overrideText || inputValue).trim();
    if (!text || isLoading || sendingRef.current) return;
    sendingRef.current = true;  // Lock immediately — synchronous, no batching delay

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
      let hasSpoken = false;  // Guard against multiple speak() calls

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
              // Only speak once per response — guard against SSE double-fire
              if (!hasSpoken) {
                hasSpoken = true;
                console.log("[TTS] handleSendMessage calling speak(), fullText length:", fullText.length);
                speak(fullText);
              } else {
                console.log("[TTS] handleSendMessage — hasSpoken already true, skipping");
              }
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
    sendingRef.current = false;  // Release the send lock
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
  const filteredDocs = (activeTab === "painting" && paintSection)
    ? docs.filter(d => d.metadata?.process_section === paintSection)
    : docs;
  const displayResults = searchQuery && searchResults.length > 0 ? searchResults : filteredDocs;

  // Process sections for Paint tab filter
  const PAINT_SECTIONS = [
    { key: "repair-process", label: "Repair Process" },
    { key: "cleaning", label: "Cleaning" },
    { key: "pre-paint-considerations", label: "Pre-Paint" },
    { key: "masking", label: "Masking" },
    { key: "surface-prep", label: "Surface Prep" },
    { key: "equipment-and-tools", label: "Equipment & Tools" },
    { key: "primer-application", label: "Primers" },
    { key: "surfacer-application", label: "Surfacers" },
    { key: "sealer-application", label: "Sealers" },
    { key: "basecoats-and-tricoats", label: "Basecoats & Tricoats" },
    { key: "blending", label: "Blending" },
    { key: "clearcoat-application", label: "Clearcoats" },
    { key: "unique-finishes", label: "Unique Finishes" },
    { key: "finished-paint-procedures", label: "Finished Paint" },
  ];

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
        @keyframes pulseGlow { 0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 4px 20px rgba(34,197,94,0.5); } 50% { opacity: 0.85; transform: scale(1.08); box-shadow: 0 4px 30px rgba(34,197,94,0.7); } }
        @keyframes shimmer { 0%, 100% { box-shadow: 0 0 20px rgba(6,182,212,0.3), 0 4px 20px rgba(0,0,0,0.5); } 50% { box-shadow: 0 0 30px rgba(6,182,212,0.5), 0 4px 20px rgba(0,0,0,0.5); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .tab-btn:hover { opacity: 1 !important; }
        .doc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; }
      `}</style>

      {/* ── Top Bar with enhanced glass-morphism ── */}
      <header style={{
        height: 64,
        background: theme === "dark"
          ? "rgba(15, 25, 50, 0.5)"
          : "rgba(255, 255, 255, 0.6)",
        borderBottom: `1px solid ${colors.border}`,
        display: "flex", alignItems: "center",
        padding: "0 20px",
        gap: 16,
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        zIndex: 100,
        flexShrink: 0,
        boxShadow: `0 8px 32px ${theme === "dark" ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.08)"}, inset 1px 1px 0 ${colors.border}`,
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
              onClick={() => { setActiveTab(tab.slug); setSearchResults([]); setSearchQuery(""); setPaintSection(null); }}
              style={{
                flex: "1 1 0",
                minWidth: 160,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                background: isActive ? `${tab.color}20` : "transparent",
                border: "none",
                borderBottom: isActive ? `4px solid ${tab.color}` : `4px solid transparent`,
                color: isActive ? tab.color : "rgba(255,255,255,0.75)",
                fontSize: 17,
                fontWeight: 600,
                fontFamily: "'Barlow Condensed', sans-serif",
                letterSpacing: 1.8,
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                padding: "0 20px",
                opacity: isActive ? 1 : 0.85,
                whiteSpace: "nowrap",
                position: "relative",
                textShadow: isActive ? `0 0 16px ${tab.color}70, 0 1px 2px rgba(0,0,0,0.5)` : "0 1px 3px rgba(0,0,0,0.6)",
                boxShadow: isActive ? `0 -4px 12px ${tab.color}40` : "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.opacity = "1";
                  e.target.style.color = tab.color;
                  e.target.style.textShadow = `0 0 14px ${tab.color}70, 0 1px 2px rgba(0,0,0,0.5)`;
                  e.target.style.boxShadow = `0 -4px 16px ${tab.color}30, inset 0 1px 0 ${colors.border}`;
                  e.target.style.background = `${tab.color}15`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.opacity = "0.85";
                  e.target.style.color = "rgba(255,255,255,0.75)";
                  e.target.style.textShadow = "0 1px 3px rgba(0,0,0,0.6)";
                  e.target.style.boxShadow = "none";
                  e.target.style.background = "transparent";
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
          padding: "20px 20px 60px 20px",
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
                    : `Quiz: ${activeQuiz?.title?.[language] || activeQuiz?.[`title_${language}`] || activeQuiz?.title_en || activeQuiz?.title?.en || "Loading..."}`
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
                                {guide.title?.[language] || guide[`title_${language}`] || guide.title_en || guide.title?.en || guide.title || "Guide"}
                              </h4>
                              <p style={{ color: colors.textSecondary, fontSize: 13, margin: "8px 0 0 0", lineHeight: 1.4 }}>
                                {guide.description?.[language] || guide[`description_${language}`] || guide.description_en || guide.description?.en || guide.description || ""}
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

                {/* Skill Assessments Section - Grouped by Tier */}
                <div>
                  {learningQuizzes.length === 0 ? (
                    <div style={{
                      color: colors.textSecondary, fontSize: 14, padding: 30, textAlign: "center",
                      border: `1px dashed ${colors.border}`, borderRadius: 12,
                      background: colors.surfaceLight,
                    }}>
                      No quizzes available
                    </div>
                  ) : (
                    [
                      { type: "product-knowledge", label: "Product Knowledge", icon: "📚", desc: "Learn PPG product specifications, mixing ratios, and application details" },
                      { type: "skill-check", label: "Skill Checks", icon: "🔧", desc: "Validate hands-on procedure knowledge for each repair step" },
                      { type: "safety-certification", label: "Safety & Certification", icon: "🏆", desc: "PPE safety, application conditions, and mastery certification exams" },
                    ].map(tier => {
                      const tierQuizzes = learningQuizzes.filter(q => q.quiz_type === tier.type);
                      if (tierQuizzes.length === 0) return null;
                      const passedCount = tierQuizzes.filter(q => q.passed).length;
                      return (
                        <div key={tier.type} style={{ marginBottom: 28 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                            <span style={{ fontSize: 22 }}>{tier.icon}</span>
                            <h3 style={{
                              fontFamily: "'Barlow Condensed', sans-serif",
                              fontWeight: 900, fontSize: 18, letterSpacing: 2,
                              textTransform: "uppercase",
                              color: colors.textPrimary,
                              margin: 0,
                            }}>
                              {tier.label}
                            </h3>
                            <span style={{
                              fontSize: 12, color: colors.textSecondary, fontWeight: 500,
                              background: colors.surfaceLight, padding: "3px 10px", borderRadius: 20,
                              marginLeft: 4,
                            }}>
                              {passedCount}/{tierQuizzes.length} passed
                            </span>
                          </div>
                          <p style={{ color: colors.textSecondary, fontSize: 13, margin: "0 0 14px 32px", lineHeight: 1.4 }}>
                            {tier.desc}
                          </p>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
                      {tierQuizzes.map((quiz, i) => (
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
                            <div style={{ fontSize: 24 }}>{quiz.icon || "✓"}</div>
                            <div style={{ flex: 1 }}>
                              <h4 style={{ color: colors.textPrimary, margin: 0, fontWeight: 600, fontSize: 15 }}>
                                {quiz.title?.[language] || quiz[`title_${language}`] || quiz.title_en || quiz.title?.en || quiz.title || "Quiz"}
                              </h4>
                              <p style={{ color: colors.textSecondary, fontSize: 13, margin: "8px 0 0 0", lineHeight: 1.4 }}>
                                {quiz.description?.[language] || quiz[`description_${language}`] || quiz.description_en || quiz.description?.en || quiz.description || ""}
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
                        </div>
                      );
                    })
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
                      {activeQuiz.title?.[language] || activeQuiz[`title_${language}`] || activeQuiz.title_en || activeQuiz.title?.en || activeQuiz.title || "Quiz"}
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
                              {(() => {
                                const q = quizQuestions[quizCurrentQ];
                                return q.text?.[language] || q[`question_text_${language}`] || q.question_text_en || q.text?.en || q.text || "";
                              })()}
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
                                    {ans.text?.[language] || ans[`answer_text_${language}`] || ans.answer_text_en || ans.text?.en || ans.text || ""}
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
          ) : (
            <>
            {/* Paint Process Section Filter */}
            {activeTab === "painting" && !searchQuery && (
              <div style={{
                display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16,
                paddingBottom: 16, borderBottom: `1px solid ${colors.border}`,
              }}>
                <button
                  onClick={() => setPaintSection(null)}
                  style={{
                    padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                    border: `1px solid ${!paintSection ? colors.accentPrimary : colors.border}`,
                    background: !paintSection ? colors.accentPrimary : "transparent",
                    color: !paintSection ? "white" : colors.textSecondary,
                    cursor: "pointer", transition: "all 0.2s",
                    whiteSpace: "nowrap",
                  }}
                >
                  All ({docs.length})
                </button>
                {PAINT_SECTIONS.map(s => {
                  const count = docs.filter(d => d.metadata?.process_section === s.key).length;
                  if (count === 0) return null;
                  return (
                    <button
                      key={s.key}
                      onClick={() => setPaintSection(paintSection === s.key ? null : s.key)}
                      style={{
                        padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                        border: `1px solid ${paintSection === s.key ? colors.accentPrimary : colors.border}`,
                        background: paintSection === s.key ? colors.accentPrimary : "transparent",
                        color: paintSection === s.key ? "white" : colors.textSecondary,
                        cursor: "pointer", transition: "all 0.2s",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={(e) => {
                        if (paintSection !== s.key) {
                          e.target.style.borderColor = colors.accentPrimary;
                          e.target.style.color = colors.accentPrimary;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (paintSection !== s.key) {
                          e.target.style.borderColor = colors.border;
                          e.target.style.color = colors.textSecondary;
                        }
                      }}
                    >
                      {s.label} ({count})
                    </button>
                  );
                })}
              </div>
            )}
            {displayResults.length === 0 ? (
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
          </>
          )}
        </main>

        {/* ── Chat Sidebar ── */}
        {sidebarOpen && (
          <aside style={{
            width: 400,
            borderLeft: `1px solid ${colors.border}`,
            display: "flex", flexDirection: "column",
            background: theme === "dark"
              ? "rgba(15, 25, 50, 0.5)"
              : "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            flexShrink: 0,
            boxShadow: `-8px 0 24px ${theme === "dark" ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.08)"}`,
            animation: "slideInRight 0.3s ease",
          }}>
            {/* Avatar header with gradient overlay */}
            <div style={{
              padding: 20,
              borderBottom: `1px solid ${colors.border}`,
              display: "flex", alignItems: "flex-start", gap: 16,
              background: `linear-gradient(135deg, ${colors.surfaceLight}, ${colors.surface})`,
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              boxShadow: `inset 0 1px 0 ${colors.border}`,
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

            {/* Messages — tap empty space to start voice input */}
            <div
              onClick={(e) => {
                // Only trigger if tapping empty chat area, not on buttons/links/text
                if (e.target === e.currentTarget && !isListening && !isLoading) {
                  toggleListening();
                }
              }}
              style={{ flex: 1, overflow: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 4, cursor: "default" }}>
              {messages.map((msg, i) => {
                const isLastAssistant = msg.role === "assistant" && !messages.slice(i + 1).some(m => m.role === "assistant");
                return (
                <div key={i} style={{ animation: "fadeIn 0.3s ease" }}>
                  <ChatMessage message={msg} isUser={msg.role === "user"} onPlayVideo={setMediaViewer} onOpenDoc={setDocViewer} theme={theme} onSpeak={speak} onStopSpeaking={stopSpeaking} isSpeaking={isSpeaking} awaitingContinue={isLastAssistant && awaitingContinue} onContinueReading={() => { setAwaitingContinue(false); try { continueListenerRef.current?.stop(); } catch(e) {} if (pendingFullTextRef.current) { const remainder = pendingFullTextRef.current; pendingFullTextRef.current = null; const prefetched = prefetchedAudioRef.current; prefetchedAudioRef.current = null; if (prefetched) { playPrefetched(prefetched, { onStart: () => setIsSpeaking(true), onEnd: () => setIsSpeaking(false), onError: () => setIsSpeaking(false) }); } else { speak(remainder, { fullRead: true }); } } }} />
                </div>
                );
              })}
              {/* Tap to Talk hint when chat is empty */}
              {messages.length === 0 && !isLoading && !isListening && (
                <div
                  onClick={toggleListening}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    padding: "40px 20px", cursor: "pointer", opacity: 0.6, transition: "opacity 0.3s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "1"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "0.6"; }}
                >
                  <div style={{ fontSize: 40, marginBottom: 8 }}>🎤</div>
                  <div style={{ color: colors.textSecondary, fontSize: 13, fontWeight: 600, textAlign: "center" }}>
                    {language === "fr" ? "Appuyez ici ou sur Espace pour parler" :
                     language === "es" ? "Toque aquí o presione Espacio para hablar" :
                     "Tap here or press Spacebar to talk"}
                  </div>
                  <div style={{ color: colors.textSecondary, fontSize: 10, marginTop: 4, opacity: 0.7 }}>
                    {language === "fr" ? "Mains libres — pas besoin de toucher le clavier" :
                     language === "es" ? "Manos libres — no necesita tocar el teclado" :
                     "Hands-free — no need to touch the keyboard"}
                  </div>
                </div>
              )}
              {/* Listening indicator overlay */}
              {isListening && (
                <div style={{
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  padding: "20px", animation: "fadeIn 0.3s ease",
                }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: "50%",
                    background: "rgba(34,197,94,0.15)", border: "3px solid #22c55e",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 36, animation: "pulseGlow 1.5s ease-in-out infinite",
                    boxShadow: "0 0 30px rgba(34,197,94,0.3)",
                  }}>🎙️</div>
                  <div style={{ color: "#22c55e", fontSize: 14, fontWeight: 700, marginTop: 10, letterSpacing: 1 }}>
                    {language === "fr" ? "J'écoute..." : language === "es" ? "Escuchando..." : "Listening..."}
                  </div>
                  <div style={{ color: colors.textSecondary, fontSize: 10, marginTop: 4 }}>
                    {language === "fr" ? "Appuyez sur Espace pour arrêter" :
                     language === "es" ? "Presione Espacio para detener" :
                     "Press Spacebar or tap to stop"}
                  </div>
                </div>
              )}
              {isLoading && (
                <div style={{ display: "flex", gap: 6, padding: "12px 14px", color: colors.textSecondary, fontSize: 13, alignItems: "center" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", animation: "ping 1s ease infinite", background: colors.accentPrimary }}></div>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", animation: "ping 1s ease infinite", background: colors.accentPrimary, animationDelay: "0.2s" }}></div>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", animation: "ping 1s ease infinite", background: colors.accentPrimary, animationDelay: "0.4s" }}></div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area with enhanced glass effect */}
            <div style={{
              padding: 14,
              borderTop: `1px solid ${colors.border}`,
              background: `linear-gradient(180deg, ${colors.surfaceLight}, ${colors.surface})`,
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
                <VoiceButton isListening={isListening} onToggle={toggleListening} disabled={isLoading} theme={theme} />
                <div style={{
                  flex: 1,
                  background: `linear-gradient(135deg, ${colors.surface}, ${colors.surfaceLight})`,
                  border: `1.5px solid ${isListening ? "#22c55e" : colors.border}`,
                  borderRadius: 14,
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  boxShadow: isListening
                    ? "0 0 16px rgba(34,197,94,0.4), inset 1px 1px 0 rgba(34,197,94,0.2)"
                    : "inset 1px 1px 0 " + colors.border,
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
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
                Press Enter to send · Spacebar or 🎤 for voice · Say "yes" or "continue" to hear full answer
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Document Viewer Modal */}
      {docViewer && <DocViewer doc={docViewer} onClose={() => setDocViewer(null)} token={token} theme={theme} language={language} />}

      {/* Media Viewer Modal */}
      {mediaViewer && <MediaViewer item={mediaViewer} onClose={() => setMediaViewer(null)} theme={theme} />}

      {/* Resources & Attribution Footer Bar — does NOT overlap chat sidebar */}
      <div id="resources-footer-bar" style={{
        position: "fixed", bottom: 0, left: 0,
        right: sidebarOpen ? 400 : 0,
        zIndex: 999,
        background: colors.background,
        borderTop: `2px solid ${colors.accentPrimary}`,
        boxShadow: `0 -4px 24px rgba(0,0,0,0.6)`,
        transition: "all 0.3s ease",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
          padding: "10px 16px", background: colors.surface,
        }}>
          <button onClick={() => { setShowResources(p => !p); setShowTerms(false); }} style={{
            padding: "6px 16px", border: `1px solid ${showResources ? colors.accentPrimary : colors.border}`, borderRadius: 20,
            background: showResources ? colors.accentPrimary : "transparent",
            color: showResources ? "#fff" : colors.textSecondary,
            cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600,
            transition: "all 0.2s",
          }}>
            <span style={{ fontSize: 10 }}>{showResources ? "▼" : "▲"}</span>
            Resources & Attribution
          </button>
          <button onClick={() => { setShowTerms(p => !p); setShowResources(false); }} style={{
            padding: "6px 16px", border: `1px solid ${showTerms ? colors.accentPrimary : colors.border}`, borderRadius: 20,
            background: showTerms ? colors.accentPrimary : "transparent",
            color: showTerms ? "#fff" : colors.textSecondary, fontSize: 12, fontWeight: 600,
            cursor: "pointer", transition: "all 0.2s",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{ fontSize: 10 }}>{showTerms ? "▼" : "▲"}</span>
            Terms & Conditions
          </button>
          <span style={{ color: colors.textSecondary, fontSize: 10, opacity: 0.6 }}>Refinish AI</span>
        </div>

        {showResources && (
          <div style={{
            maxHeight: 380, overflowY: "auto", padding: "0 24px 16px",
            background: colors.background, borderTop: `1px solid ${colors.border}`,
            fontSize: 12, lineHeight: 1.6, color: colors.textSecondary,
          }}>
            <div style={{ position: "sticky", top: 0, background: colors.background, padding: "12px 0 8px", display: "flex", justifyContent: "flex-end", zIndex: 1 }}>
              <button onClick={() => setShowResources(false)} style={{
                background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 8,
                color: colors.textPrimary, cursor: "pointer", padding: "4px 14px", fontSize: 12, fontWeight: 600,
                display: "flex", alignItems: "center", gap: 4,
              }}>✕ Close</button>
            </div>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <p style={{ fontWeight: 600, color: colors.textPrimary, marginBottom: 8, fontSize: 13 }}>
                Data Sources & Attribution
              </p>
              <p style={{ marginBottom: 12 }}>
                Body Shop Wiz by Refinish AI uses information from the following public domain and freely accessible sources.
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
                  Body Shop Wiz is an AI-powered assistant provided by Refinish AI. AI-generated content may contain inaccuracies.
                  This tool does NOT replace professional judgment, OEM repair procedures, hands-on vehicle inspection, or qualified technician expertise.
                  All AI outputs must be independently verified before use in any repair, estimate, or safety-critical decision.
                  By using this application, you agree to our Terms of Use and accept full responsibility for verifying all information before relying on it.
                  Refinish AI is not liable for decisions made based on AI outputs. See full Terms & Conditions for details.
                </p>
                <p style={{ fontSize: 11, marginTop: 6, opacity: 0.7 }}>
                  © {new Date().getFullYear()} Refinish AI. All rights reserved. Powered by Anthropic Claude.
                </p>
              </div>
            </div>
          </div>
        )}

        {showTerms && (
          <div style={{
            maxHeight: 420, overflowY: "auto", padding: "0 24px 20px",
            background: colors.background, borderTop: `1px solid ${colors.border}`,
            fontSize: 12, lineHeight: 1.7, color: colors.textSecondary,
          }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <div style={{ position: "sticky", top: 0, background: colors.background, padding: "12px 0 8px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 1 }}>
                <p style={{ fontWeight: 700, color: colors.textPrimary, fontSize: 15, margin: 0 }}>
                  Terms & Conditions of Use
                </p>
                <button onClick={() => setShowTerms(false)} style={{
                  background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 8,
                  color: colors.textPrimary, cursor: "pointer", padding: "4px 14px", fontSize: 12, fontWeight: 600,
                  display: "flex", alignItems: "center", gap: 4,
                }}>✕ Close</button>
              </div>
              <p style={{ fontWeight: 600, color: colors.accentPrimary, marginBottom: 4 }}>1. AI Disclaimer & Accuracy</p>
              <p style={{ marginBottom: 12 }}>Body Shop Wiz ("the App") uses artificial intelligence. AI-generated responses may contain inaccuracies, hallucinations, or outdated information. All outputs are for informational purposes only and do not constitute professional advice. Users must independently verify all AI responses before making any repair, safety, or business decisions.</p>

              <p style={{ fontWeight: 600, color: colors.accentPrimary, marginBottom: 4 }}>2. No Professional Advice</p>
              <p style={{ marginBottom: 12 }}>The App does not replace certified technician training, OEM repair procedures, hands-on vehicle inspection, or qualified professional judgment. Always follow manufacturer guidelines, I-CAR standards, and local regulations.</p>

              <p style={{ fontWeight: 600, color: colors.accentPrimary, marginBottom: 4 }}>3. Assumption of Risk</p>
              <p style={{ marginBottom: 12 }}>By using this App, you acknowledge that automotive body repair and refinishing involves inherent risks including exposure to hazardous chemicals, physical injury, and property damage. You assume all risks associated with acting on information provided by the App.</p>

              <p style={{ fontWeight: 600, color: colors.accentPrimary, marginBottom: 4 }}>4. Limitation of Liability</p>
              <p style={{ marginBottom: 12 }}>Refinish AI and its officers, directors, employees, and affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from the use of or reliance on this App, including but not limited to: incorrect repairs, safety incidents, environmental violations, regulatory fines, property damage, or personal injury. Total aggregate liability shall not exceed the amount paid for access to the App in the preceding 12 months.</p>

              <p style={{ fontWeight: 600, color: colors.accentPrimary, marginBottom: 4 }}>5. Indemnification</p>
              <p style={{ marginBottom: 12 }}>You agree to indemnify and hold harmless Refinish AI from any claims, losses, damages, liabilities, and expenses (including attorneys' fees) arising from your use of the App or reliance on its outputs.</p>

              <p style={{ fontWeight: 600, color: colors.accentPrimary, marginBottom: 4 }}>6. Data & Privacy</p>
              <p style={{ marginBottom: 12 }}>Queries and interactions may be logged for quality improvement and knowledge gap analysis. No personally identifiable information is shared with third parties. Shop-specific documents uploaded to the App remain the property of the uploading party.</p>

              <p style={{ fontWeight: 600, color: colors.accentPrimary, marginBottom: 4 }}>7. Acceptance</p>
              <p style={{ marginBottom: 12 }}>By creating an account or using the App, you agree to these Terms & Conditions in their entirety. Refinish AI reserves the right to update these terms at any time. Continued use constitutes acceptance of updated terms.</p>

              <p style={{ fontSize: 11, marginTop: 8, opacity: 0.7 }}>
                © {new Date().getFullYear()} Refinish AI. All rights reserved. Contact: support@refinishai.com
              </p>
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
