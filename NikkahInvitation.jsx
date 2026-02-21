import { useState, useRef } from "react";
import { GOLD, GOLD_LIGHT, GOLD_DARK, DEEP_GREEN, EMERALD, floralPatterns } from "./constants";
import StarBurst from "./components/StarBurst";
import IslamicPattern from "./components/IslamicPattern";
import OrnamentalDivider from "./components/OrnamentalDivider";
import MosqueIcon from "./components/MosqueIcon";
import CountdownTimer from "./components/CountdownTimer";
import ParticleField from "./components/ParticleField";
import FallingPetals from "./components/FallingPetals";

/* ── Elegant floral branch rendered inline ── */
const RoseBranch = ({ flip = false }) => (
  <svg
    width="180" height="40"
    viewBox="0 0 180 40"
    style={{
      opacity: 0.48,
      transform: flip ? "scaleX(-1)" : "none",
      display: "block",
      maxWidth: "min(180px, 82vw)",
      margin: "0 auto",
    }}
  >
    {/* Main curved stem */}
    <path d="M 14,26 Q 45,16 90,20 Q 135,16 166,26"
      stroke={GOLD} strokeWidth="0.9" fill="none" strokeLinecap="round" />
    {/* Left branch */}
    <path d="M 47,18 Q 44,9 38,12" stroke={GOLD} strokeWidth="0.7" fill="none" strokeLinecap="round" />
    {/* Right branch */}
    <path d="M 133,18 Q 136,9 142,12" stroke={GOLD} strokeWidth="0.7" fill="none" strokeLinecap="round" />
    {/* Left leaf */}
    <path d="M 62,17 Q 65,10 70,14" stroke={GOLD} strokeWidth="0.5" fill={GOLD} fillOpacity="0.22" strokeLinecap="round" />
    {/* Right leaf */}
    <path d="M 118,17 Q 115,10 110,14" stroke={GOLD} strokeWidth="0.5" fill={GOLD} fillOpacity="0.22" strokeLinecap="round" />

    {/* Centre 5-petal rose */}
    <g transform="translate(90, 20)">
      {[0, 72, 144, 216, 288].map(a => (
        <path key={a} transform={`rotate(${a})`}
          d="M 0,1 C 3.5,-3 3.5,-9 0,-13 C -3.5,-9 -3.5,-3 0,1 Z"
          fill={GOLD} opacity="0.9" />
      ))}
      <circle cx="0" cy="0" r="3" fill={GOLD_LIGHT} opacity="0.95" />
    </g>

    {/* Left small 3-petal blossom */}
    <g transform="translate(34, 12)">
      {[0, 120, 240].map(a => (
        <path key={a} transform={`rotate(${a})`}
          d="M 0,0.5 C 1.5,-1.5 1.5,-6 0,-8 C -1.5,-6 -1.5,-1.5 0,0.5 Z"
          fill={GOLD} opacity="0.72" />
      ))}
      <circle cx="0" cy="0" r="2" fill={GOLD_LIGHT} opacity="0.85" />
    </g>

    {/* Right small 3-petal blossom */}
    <g transform="translate(146, 12)">
      {[0, 120, 240].map(a => (
        <path key={a} transform={`rotate(${a})`}
          d="M 0,0.5 C 1.5,-1.5 1.5,-6 0,-8 C -1.5,-6 -1.5,-1.5 0,0.5 Z"
          fill={GOLD} opacity="0.72" />
      ))}
      <circle cx="0" cy="0" r="2" fill={GOLD_LIGHT} opacity="0.85" />
    </g>

    {/* Far-left tiny bud */}
    <g transform="translate(11, 26)">
      {[0, 120, 240].map(a => (
        <path key={a} transform={`rotate(${a})`}
          d="M 0,0.5 C 1,-1 1,-4 0,-5.5 C -1,-4 -1,-1 0,0.5 Z"
          fill={GOLD} opacity="0.5" />
      ))}
    </g>
    {/* Far-right tiny bud */}
    <g transform="translate(169, 26)">
      {[0, 120, 240].map(a => (
        <path key={a} transform={`rotate(${a})`}
          d="M 0,0.5 C 1,-1 1,-4 0,-5.5 C -1,-4 -1,-1 0,0.5 Z"
          fill={GOLD} opacity="0.5" />
      ))}
    </g>
  </svg>
);

/* ── Eight-pointed star accent ── */
const StarAccent = ({ size = 16, style = {} }) => (
  <svg width={size} height={size} viewBox="-12 -12 24 24" style={style}>
    {[0, 45].map(r => (
      <path key={r} transform={`rotate(${r})`}
        d="M 0,-10 L 2.5,-2.5 L 10,0 L 2.5,2.5 L 0,10 L -2.5,2.5 L -10,0 L -2.5,-2.5 Z"
        fill={GOLD} opacity="0.55" />
    ))}
    <circle cx="0" cy="0" r="2" fill={GOLD_LIGHT} opacity="0.9" />
  </svg>
);

export default function NikkahInvitation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => setShowContent(true), 800);
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMusic = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(160deg, ${DEEP_GREEN} 0%, #06122e 30%, #030a1e 60%, ${DEEP_GREEN}90 100%)`,
        fontFamily: "'Cormorant Garamond', serif",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap');

        /* ── Existing keyframes ── */
        @keyframes floatIn {
          from { opacity: 0; transform: translate(0, 20px) scale(0.8); }
          to { opacity: 0.15; transform: translate(0, 0) scale(1); }
        }
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0) rotate(var(--r, 0deg)); }
          50% { transform: translateY(-8px) rotate(var(--r, 0deg)); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes particleGlow {
          0%, 100% { opacity: 0; transform: scale(0.5) translateY(0); }
          50% { opacity: 0.6; transform: scale(1.2) translateY(-20px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes rotateIn {
          from { opacity: 0; transform: rotate(-10deg) scale(0.8); }
          to { opacity: 1; transform: rotate(0) scale(1); }
        }
        @keyframes letterSpaceIn {
          from { opacity: 0; letter-spacing: 15px; }
          to { opacity: 1; letter-spacing: 6px; }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.15); }
          28% { transform: scale(1); }
          42% { transform: scale(1.1); }
          56% { transform: scale(1); }
        }
        @keyframes musicGlow {
          0%, 100% { box-shadow: 0 0 14px ${GOLD}40, 0 4px 20px rgba(0,0,0,0.5); }
          50% { box-shadow: 0 0 28px ${GOLD}70, 0 4px 20px rgba(0,0,0,0.5); }
        }

        /* ── New keyframes ── */
        @keyframes petalFallR {
          0%   { transform: translateY(-60px) translateX(0px)  rotate(0deg);   opacity: 0; }
          7%   { opacity: 1; }
          30%  { transform: translateY(28vh)  translateX(28px)  rotate(110deg); }
          60%  { transform: translateY(58vh)  translateX(-10px) rotate(250deg); }
          90%  { opacity: 0.55; }
          100% { transform: translateY(108vh) translateX(22px)  rotate(390deg); opacity: 0; }
        }
        @keyframes petalFallL {
          0%   { transform: translateY(-60px) translateX(0px)   rotate(0deg);   opacity: 0; }
          7%   { opacity: 1; }
          30%  { transform: translateY(28vh)  translateX(-28px) rotate(-110deg); }
          60%  { transform: translateY(58vh)  translateX(12px)  rotate(-250deg); }
          90%  { opacity: 0.55; }
          100% { transform: translateY(108vh) translateX(-18px) rotate(-390deg); opacity: 0; }
        }
        @keyframes glowFloat {
          0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1);    }
          50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.18); }
        }
        @keyframes cardGlow {
          0%, 100% {
            box-shadow: 0 30px 80px rgba(0,0,0,0.65),
                        0 0 0 1px ${GOLD}20,
                        inset 0 1px 0 ${GOLD}12;
          }
          50% {
            box-shadow: 0 30px 80px rgba(0,0,0,0.65),
                        0 0 0 1.5px ${GOLD}50,
                        0 0 40px ${GOLD}12,
                        inset 0 1px 0 ${GOLD}25;
          }
        }
        @keyframes starSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes borderScroll {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -120; }
        }
        @keyframes auroraShift {
          0%, 100% { opacity: 0.07; transform: scale(1)    rotate(0deg);  }
          50%       { opacity: 0.14; transform: scale(1.12) rotate(6deg);  }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes roseBranchReveal {
          from { opacity: 0; transform: scaleX(0.6); }
          to   { opacity: 0.48; transform: scaleX(1); }
        }

        /* ── Component classes ── */
        .invitation-card {
          animation: scaleIn 1.1s cubic-bezier(0.22,1,0.36,1) both,
                     cardGlow 5s ease-in-out 2.5s infinite;
        }
        .bismillah {
          animation: fadeSlideDown 1s ease-out 0.3s both;
        }
        .couple-name {
          background: linear-gradient(90deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_LIGHT}, ${GOLD}, ${GOLD_DARK});
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite, fadeSlideUp 1s ease-out 0.8s both;
        }
        .ampersand {
          animation: rotateIn 0.8s ease-out 1s both, heartbeat 3s ease-in-out 2s infinite;
        }
        .envelope-wrapper {
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        .envelope-wrapper:hover { transform: scale(1.03); }
        .venue-text:hover {
          color: ${GOLD_LIGHT} !important;
          text-shadow: 0 0 20px ${GOLD}40;
        }
        .rose-branch-top {
          animation: roseBranchReveal 1.2s cubic-bezier(0.22,1,0.36,1) 1.0s both;
        }
        .rose-branch-bot {
          animation: roseBranchReveal 1.2s cubic-bezier(0.22,1,0.36,1) 1.3s both;
        }
        .star-spin {
          animation: starSpin 18s linear infinite;
          transform-origin: center;
        }

        /* ── Music button ── */
        .music-btn {
          position: fixed;
          bottom: 24px; right: 24px;
          width: 50px; height: 50px;
          border-radius: 50%;
          border: 1.5px solid ${GOLD}55;
          background: radial-gradient(circle at center, ${DEEP_GREEN} 0%, #030a1e 100%);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          z-index: 1000;
          box-shadow: 0 4px 16px rgba(0,0,0,0.55);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          outline: none;
        }
        .music-btn:hover { border-color: ${GOLD}90; }
        .music-btn.playing {
          border-color: ${GOLD}90;
          animation: musicGlow 2.5s ease-in-out infinite;
        }
        .music-label {
          position: fixed;
          bottom: 82px; right: 18px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 11px; color: ${GOLD_LIGHT};
          letter-spacing: 2px; text-transform: uppercase;
          opacity: 0.55; pointer-events: none;
          writing-mode: vertical-rl; text-orientation: mixed;
        }

        /* ── Responsive ── */
        .countdown-circle {
          width: clamp(52px, 14vw, 68px) !important;
          height: clamp(52px, 14vw, 68px) !important;
        }
        .countdown-value { font-size: clamp(15px, 4.2vw, 22px) !important; }
        @media (max-width: 520px) {
          .invitation-card { padding: 32px 20px !important; }
        }
        @media (max-width: 380px) {
          .invitation-card { padding: 26px 14px !important; border-radius: 12px !important; }
        }
      `}</style>

      {/* Surah Ar-Rahman — starts on envelope tap */}
      <audio ref={audioRef} src="https://cdn.islamic.network/quran/audio/128/ar.alafasy/55.mp3"
        loop preload="none" />

      {/* Music toggle */}
      <button onClick={toggleMusic}
        className={`music-btn${isPlaying ? " playing" : ""}`}
        title={isPlaying ? "Pause recitation" : "Play Surah Ar-Rahman"}
        aria-label={isPlaying ? "Pause" : "Play Surah Ar-Rahman"}
      >
        {isPlaying ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill={`${GOLD}25`} />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" fill={`${GOLD}25`} />
            <circle cx="18" cy="16" r="3" fill={`${GOLD}25`} />
          </svg>
        )}
      </button>
      <span className="music-label">{isPlaying ? "♪ Playing" : "♪ Music"}</span>

      {/* ── Background layers ── */}
      <ParticleField />
      <FallingPetals />

      {/* Islamic geometric patterns + stars */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        {floralPatterns.map((p, i) => (
          <IslamicPattern key={i} x={`${p.x}%`} y={`${p.y}%`} size={p.size} delay={p.delay} rotation={p.rotation} />
        ))}
        {[
          { cx: "15%", cy: "20%", r: 1.5, d: 0 },
          { cx: "80%", cy: "15%", r: 1,   d: 1 },
          { cx: "90%", cy: "50%", r: 1.2, d: 2 },
          { cx: "10%", cy: "70%", r: 1.8, d: 0.5 },
          { cx: "75%", cy: "85%", r: 1,   d: 1.5 },
          { cx: "25%", cy: "90%", r: 1.3, d: 2.5 },
          { cx: "50%", cy: "30%", r: 0.8, d: 3 },
          { cx: "60%", cy: "65%", r: 1.1, d: 1.8 },
        ].map((s, i) => (
          <StarBurst key={i} cx={s.cx} cy={s.cy} r={s.r} delay={s.d} />
        ))}
      </svg>

      {!isOpen ? (
        /* ═══════════════ ENVELOPE ═══════════════ */
        <div
          className="envelope-wrapper"
          onClick={handleOpen}
          style={{ width: "min(340px, 90vw)", aspectRatio: "340 / 420", position: "relative", animation: "pulse 2.5s ease-in-out infinite" }}
        >
          <div style={{
            width: "100%", height: "100%",
            background: `linear-gradient(145deg, ${DEEP_GREEN}, ${EMERALD}80, ${DEEP_GREEN})`,
            borderRadius: "12px",
            border: `2px solid ${GOLD}50`,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: "clamp(12px, 3.5vw, 22px)",
            boxShadow: `0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 ${GOLD}20`,
            position: "relative", overflow: "hidden",
          }}>
            {/* Outer dashed border */}
            <svg style={{ position: "absolute", inset: "12px", width: "calc(100% - 24px)", height: "calc(100% - 24px)" }}>
              <rect x="0" y="0" width="100%" height="100%" rx="6"
                fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.3" strokeDasharray="8,4" />
            </svg>

            {/* Spinning star accents at envelope corners */}
            {[{ top: "18px", left: "18px" }, { top: "18px", right: "18px" },
              { bottom: "18px", left: "18px" }, { bottom: "18px", right: "18px" }].map((pos, i) => (
              <div key={i} className="star-spin" style={{ position: "absolute", ...pos, opacity: 0.35 }}>
                <StarAccent size={14} />
              </div>
            ))}

            {/* Top floral arc */}
            <div style={{ position: "absolute", top: "28px", left: "50%", transform: "translateX(-50%)", animation: "fadeIn 1.5s ease-out 0.5s both" }}>
              <svg width="110" height="28" viewBox="0 0 110 28" style={{ opacity: 0.4 }}>
                <path d="M 10,22 Q 30,10 55,14 Q 80,10 100,22"
                  stroke={GOLD} strokeWidth="0.8" fill="none" strokeLinecap="round" />
                <g transform="translate(55,14)">
                  {[0, 72, 144, 216, 288].map(a => (
                    <path key={a} transform={`rotate(${a})`}
                      d="M 0,0.5 C 2,-2 2,-6 0,-8.5 C -2,-6 -2,-2 0,0.5 Z"
                      fill={GOLD} opacity="0.85" />
                  ))}
                  <circle cx="0" cy="0" r="2" fill={GOLD_LIGHT} opacity="0.9" />
                </g>
                <g transform="translate(20,18)">
                  {[0, 120, 240].map(a => (
                    <path key={a} transform={`rotate(${a})`}
                      d="M 0,0.5 C 1,-1 1,-4 0,-5.5 C -1,-4 -1,-1 0,0.5 Z"
                      fill={GOLD} opacity="0.65" />
                  ))}
                </g>
                <g transform="translate(90,18)">
                  {[0, 120, 240].map(a => (
                    <path key={a} transform={`rotate(${a})`}
                      d="M 0,0.5 C 1,-1 1,-4 0,-5.5 C -1,-4 -1,-1 0,0.5 Z"
                      fill={GOLD} opacity="0.65" />
                  ))}
                </g>
              </svg>
            </div>

            <div style={{ animation: "fadeSlideDown 1s ease-out both", marginTop: "18px" }}>
              <MosqueIcon />
            </div>

            <div style={{ textAlign: "center", animation: "fadeSlideUp 1s ease-out 0.3s both", padding: "0 18px" }}>
              <p style={{ fontFamily: "'Amiri', serif", fontSize: "clamp(18px, 6vw, 26px)", color: GOLD, margin: "0 0 4px 0", direction: "rtl" }}>
                بِسْمِ ٱللّٰهِ ٱلرَّحْمٰنِ ٱلرَّحِيمِ
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(9px, 2.5vw, 11px)", color: GOLD_LIGHT, margin: 0, letterSpacing: "2px", textTransform: "uppercase", opacity: 0.7 }}>
                In the name of Allah, the Most Gracious, the Most Merciful
              </p>
            </div>

            <div style={{ textAlign: "center", animation: "fadeSlideUp 1s ease-out 0.6s both" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(10px, 3vw, 14px)", color: GOLD_LIGHT, letterSpacing: "5px", textTransform: "uppercase", margin: "0 0 8px 0", opacity: 0.8 }}>
                Nikkah Invitation
              </p>
              <p style={{
                fontFamily: "'Playfair Display', serif", fontSize: "clamp(20px, 7vw, 28px)", fontWeight: "700",
                background: `linear-gradient(90deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_LIGHT}, ${GOLD}, ${GOLD_DARK})`,
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                animation: "shimmer 3s linear infinite", margin: 0,
              }}>
                Zainab & Adeel
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", animation: "fadeSlideUp 1s ease-out 0.9s both" }}>
              <div style={{ width: "36px", height: "1px", background: `linear-gradient(to right, transparent, ${GOLD})` }} />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(10px, 3vw, 13px)", color: GOLD, letterSpacing: "3px", textTransform: "uppercase" }}>
                Open to View
              </span>
              <div style={{ width: "36px", height: "1px", background: `linear-gradient(to left, transparent, ${GOLD})` }} />
            </div>

            <div style={{ position: "absolute", bottom: "clamp(16px, 4vw, 28px)", animation: "pulse 1.5s ease-in-out infinite" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 3v14m0 0l-5-5m5 5l5-5" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
              </svg>
            </div>
          </div>
        </div>

      ) : (
        /* ═══════════════ MAIN INVITATION CARD ═══════════════ */
        <div
          className="invitation-card"
          style={{
            width: "100%", maxWidth: "520px",
            background: `linear-gradient(175deg, ${DEEP_GREEN} 0%, #050f28 40%, #06122e 70%, ${DEEP_GREEN}95 100%)`,
            borderRadius: "16px",
            border: `1.5px solid ${GOLD}35`,
            padding: "50px 36px",
            position: "relative", overflow: "hidden",
          }}
        >
          {/* Animated scrolling inner border */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
            preserveAspectRatio="none" viewBox="0 0 100 100">
            <rect x="1.5" y="0.8" width="97" height="98.4" rx="2.5"
              fill="none" stroke={GOLD} strokeWidth="0.25" opacity="0.28"
              strokeDasharray="5 3.5"
              style={{ animation: "borderScroll 22s linear infinite" }}
              vectorEffect="non-scaling-stroke" />
            <rect x="3.5" y="2" width="93" height="96" rx="2"
              fill="none" stroke={GOLD} strokeWidth="0.15" opacity="0.14"
              strokeDasharray="3 7"
              style={{ animation: "borderScroll 35s linear infinite reverse" }}
              vectorEffect="non-scaling-stroke" />
          </svg>

          {/* Aurora glow behind content */}
          <div style={{
            position: "absolute", top: "42%", left: "50%",
            width: "340px", height: "260px",
            background: `radial-gradient(ellipse, ${GOLD}07 0%, transparent 70%)`,
            pointerEvents: "none", zIndex: 0,
            animation: "auroraShift 7s ease-in-out infinite",
            transform: "translate(-50%, -50%)",
          }} />

          {/* Enhanced corner ornaments */}
          {[
            { top: 0,    left: 0,  sx: 1,  sy: 1  },
            { top: 0,    right: 0, sx: -1, sy: 1  },
            { bottom: 0, left: 0,  sx: 1,  sy: -1 },
            { bottom: 0, right: 0, sx: -1, sy: -1 },
          ].map((pos, i) => {
            const { sx, sy, ...placement } = pos;
            return (
              <svg key={i} width="80" height="80" viewBox="0 0 80 80" style={{
                position: "absolute",
                ...placement,
                transform: `scaleX(${sx}) scaleY(${sy})`,
                opacity: 0.45, zIndex: 0,
              }}>
                <path d="M 0,0 Q 40,5 75,0 Q 70,40 75,75" fill="none" stroke={GOLD} strokeWidth="1" />
                <path d="M 0,0 Q 28,8 55,4 Q 50,28 55,55"  fill="none" stroke={GOLD} strokeWidth="0.5" />
                <path d="M 0,0 Q 16,12 32,8 Q 28,16 32,32"  fill="none" stroke={GOLD} strokeWidth="0.3" opacity="0.6" />
                <circle cx="8" cy="8" r="3.5" fill={GOLD} opacity="0.55" />
                <circle cx="16" cy="5" r="1.5" fill={GOLD} opacity="0.35" />
                <circle cx="5" cy="16" r="1.5" fill={GOLD} opacity="0.35" />
                {/* Corner rose bud */}
                <g transform="translate(8,8)" opacity="0.6">
                  {[0,120,240].map(a => (
                    <path key={a} transform={`rotate(${a})`}
                      d="M 0,0.5 C 1.2,-1 1.2,-3.5 0,-5 C -1.2,-3.5 -1.2,-1 0,0.5 Z"
                      fill={GOLD} />
                  ))}
                </g>
              </svg>
            );
          })}

          {/* Spinning star accents — card corners inner */}
          {[{ top: "22px", left: "22px" }, { top: "22px", right: "22px" },
            { bottom: "22px", left: "22px" }, { bottom: "22px", right: "22px" }].map((pos, i) => (
            <div key={i} className="star-spin" style={{ position: "absolute", ...pos, opacity: 0.3, zIndex: 1, animationDuration: `${20 + i * 4}s` }}>
              <StarAccent size={12} />
            </div>
          ))}

          {showContent && (
            <div style={{ position: "relative", zIndex: 2 }}>

              {/* Bismillah */}
              <div className="bismillah" style={{ textAlign: "center", marginBottom: "28px" }}>
                <p style={{ fontFamily: "'Amiri', serif", fontSize: "clamp(22px, 6vw, 30px)", color: GOLD, margin: "0 0 6px 0", direction: "rtl", lineHeight: 1.6 }}>
                  بِسْمِ ٱللّٰهِ ٱلرَّحْمٰنِ ٱلرَّحِيمِ
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(10px, 2.5vw, 12px)", color: GOLD_LIGHT, letterSpacing: "2px", margin: 0, opacity: 0.7, textTransform: "uppercase" }}>
                  In the name of Allah, the Most Gracious, the Most Merciful
                </p>
              </div>

              <OrnamentalDivider width={280} />

              {/* Quranic Verse */}
              <div style={{ textAlign: "center", margin: "24px 0", animation: "fadeSlideUp 0.8s ease-out 0.5s both" }}>
                <p style={{ fontFamily: "'Amiri', serif", fontSize: "clamp(15px, 4.5vw, 20px)", color: GOLD, direction: "rtl", margin: "0 0 8px 0", lineHeight: 1.8 }}>
                  وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(11px, 3vw, 13px)", color: GOLD_LIGHT, margin: 0, opacity: 0.8, lineHeight: 1.7, padding: "0 10px" }}>
                  "And among His signs is that He created for you mates from among yourselves,
                  that you may dwell in tranquility with them, and He has put love and mercy between your hearts."
                  <br /><span style={{ opacity: 0.6, fontSize: "11px" }}>— Surah Ar-Rum (30:21)</span>
                </p>
              </div>

              <OrnamentalDivider width={200} />

              {/* Title */}
              <div style={{ textAlign: "center", margin: "28px 0 8px", animation: "letterSpaceIn 1s ease-out 0.7s both" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(10px, 2.8vw, 13px)", color: GOLD_LIGHT, letterSpacing: "6px", textTransform: "uppercase", margin: 0, opacity: 0.7 }}>
                  Together with the blessings of Allah
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(10px, 2.8vw, 13px)", color: GOLD_LIGHT, letterSpacing: "4px", textTransform: "uppercase", margin: "4px 0 0 0", opacity: 0.6 }}>
                  We request the honour of your presence at the Nikkah ceremony of
                </p>
              </div>

              {/* ── Names with Rose Branches ── */}
              <div style={{ textAlign: "center", margin: "26px 0" }}>
                {/* Rose branch above names */}
                <div className="rose-branch-top" style={{ marginBottom: "16px" }}>
                  <RoseBranch />
                </div>

                <h1 className="couple-name" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 11vw, 52px)", fontWeight: "700", margin: 0, lineHeight: 1.1 }}>
                  Zainab
                </h1>

                <div className="ampersand" style={{ display: "inline-block", margin: "10px 0" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(26px, 8vw, 36px)", color: GOLD, opacity: 0.8 }}>
                    &
                  </span>
                </div>

                <h1 className="couple-name" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 11vw, 52px)", fontWeight: "700", margin: 0, lineHeight: 1.1, animationDelay: "1s" }}>
                  Adeel
                </h1>

                {/* Rose branch below names (mirrored) */}
                <div className="rose-branch-bot" style={{ marginTop: "16px" }}>
                  <RoseBranch flip />
                </div>
              </div>

              <OrnamentalDivider width={240} />

              {/* Date & Venue */}
              <div style={{ textAlign: "center", margin: "28px 0", animation: "fadeSlideUp 0.8s ease-out 1.2s both" }}>
                <div style={{ marginBottom: "20px" }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(10px, 2.5vw, 12px)", color: GOLD_LIGHT, letterSpacing: "4px", textTransform: "uppercase", margin: "0 0 6px 0", opacity: 0.6 }}>Saturday</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(15px, 5vw, 20px)", color: GOLD, letterSpacing: "3px", margin: "0 0 4px 0" }}>7th March, 2026</p>
                  <p style={{ fontFamily: "'Amiri', serif", fontSize: "clamp(13px, 3.5vw, 16px)", color: GOLD_LIGHT, margin: 0, opacity: 0.6, direction: "rtl" }}>١١ شعبان ١٤٤٧ هـ</p>
                </div>

                <div style={{ margin: "22px 0" }}><MosqueIcon /></div>

                <div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(10px, 2.5vw, 12px)", color: GOLD_LIGHT, letterSpacing: "4px", textTransform: "uppercase", margin: "0 0 8px 0", opacity: 0.6 }}>Venue</p>
                  <p className="venue-text" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(18px, 6vw, 24px)", fontWeight: "600", color: GOLD, margin: "0 0 4px 0", transition: "all 0.3s ease", cursor: "default" }}>Al Haram</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(13px, 4vw, 16px)", color: GOLD_LIGHT, margin: 0, opacity: 0.7 }}>Makkah Al-Mukarramah</p>
                  <p style={{ fontFamily: "'Amiri', serif", fontSize: "clamp(14px, 4vw, 18px)", color: GOLD, margin: "6px 0 0 0", opacity: 0.5, direction: "rtl" }}>المسجد الحرام ، مكة المكرمة</p>
                </div>
              </div>

              <OrnamentalDivider width={180} />

              {/* Countdown */}
              <div style={{ textAlign: "center", margin: "28px 0", animation: "fadeSlideUp 0.8s ease-out 1.5s both" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(10px, 2.5vw, 12px)", color: GOLD_LIGHT, letterSpacing: "4px", textTransform: "uppercase", margin: "0 0 16px 0", opacity: 0.6 }}>
                  Counting Down To The Blessed Day
                </p>
                <CountdownTimer targetDate="2026-03-07T00:00:00" />
              </div>

              <OrnamentalDivider width={160} />

              {/* Dua */}
              <div style={{ textAlign: "center", margin: "28px 0 10px", animation: "fadeSlideUp 0.8s ease-out 2s both" }}>
                <p style={{ fontFamily: "'Amiri', serif", fontSize: "clamp(15px, 4.5vw, 20px)", color: GOLD, direction: "rtl", margin: "0 0 10px 0", lineHeight: 1.8 }}>
                  بَارَكَ ٱللّٰهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(11px, 3vw, 13px)", color: GOLD_LIGHT, margin: 0, opacity: 0.7, lineHeight: 1.6 }}>
                  "May Allah bless you, shower His blessings upon you,<br />and unite you both in goodness."
                </p>
              </div>

              {/* Footer */}
              <div style={{ textAlign: "center", marginTop: "30px", animation: "fadeSlideUp 0.8s ease-out 2.2s both" }}>
                {/* Small bottom floral row */}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", marginBottom: "10px", opacity: 0.45 }}>
                  <div style={{ width: "40px", height: "1px", background: `linear-gradient(to right, transparent, ${GOLD})` }} />
                  <StarAccent size={12} style={{ animation: "starSpin 12s linear infinite" }} />
                  <svg width="22" height="22" viewBox="-11 -11 22 22">
                    {[0, 72, 144, 216, 288].map(a => (
                      <path key={a} transform={`rotate(${a})`}
                        d="M 0,0.5 C 2,-2 2,-6.5 0,-9 C -2,-6.5 -2,-2 0,0.5 Z"
                        fill={GOLD} opacity="0.85" />
                    ))}
                    <circle cx="0" cy="0" r="2.2" fill={GOLD_LIGHT} opacity="0.95" />
                  </svg>
                  <StarAccent size={12} style={{ animation: "starSpin 12s linear infinite reverse" }} />
                  <div style={{ width: "40px", height: "1px", background: `linear-gradient(to left, transparent, ${GOLD})` }} />
                </div>

                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(10px, 2.5vw, 12px)", color: GOLD_LIGHT, opacity: 0.4, letterSpacing: "2px", margin: 0, textTransform: "uppercase" }}>
                  Your presence & prayers are humbly requested
                </p>
              </div>

            </div>
          )}
        </div>
      )}
    </div>
  );
}
