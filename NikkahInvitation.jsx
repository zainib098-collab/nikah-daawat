import { useState, useRef } from "react";
import {
  GOLD, GOLD_LIGHT, GOLD_DARK, GOLD_RICH,
  DEEP_GREEN, EMERALD, CREAM, SOFT_WHITE,
  TEXT_DARK, TEXT_MID, floralPatterns,
} from "./constants";
import StarBurst        from "./components/StarBurst";
import IslamicPattern   from "./components/IslamicPattern";
import OrnamentalDivider from "./components/OrnamentalDivider";
import MosqueIcon       from "./components/MosqueIcon";
import CountdownTimer   from "./components/CountdownTimer";
import ParticleField    from "./components/ParticleField";
import FallingPetals    from "./components/FallingPetals";
import coupleImage      from "./Generated_image.png";

/* ── Pre-computed arabesque 8-pointed star ── */
const STAR8 = (() =>
  Array.from({ length: 16 }, (_, i) => {
    const a = (i * 22.5 - 90) * Math.PI / 180;
    const r = i % 2 === 0 ? 24 : 14;
    return `${(Math.cos(a) * r + 35).toFixed(1)},${(Math.sin(a) * r + 35).toFixed(1)}`;
  }).join(" ")
)();

/* ── Elegant floral branch ── */
const RoseBranch = ({ flip = false }) => (
  <svg width="200" height="44" viewBox="0 0 200 44"
    style={{ opacity:0.52, transform:flip?"scaleX(-1)":"none",
             display:"block", maxWidth:"min(200px,85vw)", margin:"0 auto" }}>
    <path d="M 12,28 Q 50,16 100,22 Q 150,16 188,28"
      stroke={GOLD} strokeWidth="0.9" fill="none" strokeLinecap="round" />
    {/* branch twigs */}
    <path d="M 50,19 Q 47,8 40,12"  stroke={GOLD} strokeWidth="0.7" fill="none" strokeLinecap="round" />
    <path d="M 150,19 Q 153,8 160,12" stroke={GOLD} strokeWidth="0.7" fill="none" strokeLinecap="round" />
    <path d="M 72,18 Q 76,9 80,13"   stroke={GOLD} strokeWidth="0.5" fill={GOLD} fillOpacity="0.2" strokeLinecap="round" />
    <path d="M 128,18 Q 124,9 120,13" stroke={GOLD} strokeWidth="0.5" fill={GOLD} fillOpacity="0.2" strokeLinecap="round" />
    {/* Centre rose */}
    <g transform="translate(100,22)">
      {[0,72,144,216,288].map(a=>(
        <path key={a} transform={`rotate(${a})`}
          d="M 0,1 C 3.5,-3 3.5,-9 0,-13 C -3.5,-9 -3.5,-3 0,1 Z" fill={GOLD} opacity="0.9"/>
      ))}
      <circle cx="0" cy="0" r="3" fill={GOLD_LIGHT} opacity="0.95"/>
    </g>
    {/* side buds */}
    {[36,164].map((x,i)=>(
      <g key={i} transform={`translate(${x},12)`}>
        {[0,120,240].map(a=>(<path key={a} transform={`rotate(${a})`}
          d="M 0,0.5 C 1.5,-1.5 1.5,-6 0,-8 C -1.5,-6 -1.5,-1.5 0,0.5 Z" fill={GOLD} opacity="0.72"/>))}
        <circle cx="0" cy="0" r="2" fill={GOLD_LIGHT} opacity="0.85"/>
      </g>
    ))}
  </svg>
);

/* ── Animated name — letter-by-letter 3-D drop + wave + glow ── */
/* Words are kept together (white-space:nowrap per word) with a real gap between them.
   Spaces are rendered as a margin so inline-block collapse doesn't swallow them. */
const AnimatedName = ({ name, entryDelay = 1.0 }) => {
  // Pre-compute per-letter delays across all words
  const words = name.split(" ");
  let runningIdx = 0;
  const wordData = words.map(word =>
    [...word].map(char => {
      const ed = +(entryDelay + runningIdx++ * 0.09).toFixed(2);
      return { char, ed };
    })
  );

  return (
    <div style={{ lineHeight:1.25, display:"block", textAlign:"center" }}>
      {wordData.map((letters, wi) => (
        <span key={wi} style={{
          display:"inline-block",
          whiteSpace:"nowrap",
          marginLeft: wi > 0 ? "0.3em" : 0,
        }}>
          {letters.map(({ char, ed }, ci) => (
            <span key={ci} className="name-letter-wave"
              style={{ display:"inline-block", animationDelay:`${(ed + 1.4).toFixed(2)}s` }}>
              <span className="name-letter"
                style={{
                  fontFamily:"'Playfair Display',serif",
                  fontSize:"clamp(20px,5.2vw,34px)",
                  fontWeight:"800",
                  display:"inline-block",
                  /* delay order: letterDrop, letterShimmer, letterGlow */
                  animationDelay:`${ed}s, ${(ed+1.2).toFixed(2)}s, ${(ed+1.6).toFixed(2)}s`,
                }}>
                {char}
              </span>
            </span>
          ))}
        </span>
      ))}
    </div>
  );
};

/* ── 8-pointed star ── */
const StarAccent = ({ size=16, style={} }) => (
  <svg width={size} height={size} viewBox="-12 -12 24 24" style={style}>
    {[0,45].map(r=>(
      <path key={r} transform={`rotate(${r})`}
        d="M 0,-10 L 2.5,-2.5 L 10,0 L 2.5,2.5 L 0,10 L -2.5,2.5 L -10,0 L -2.5,-2.5 Z"
        fill={GOLD} opacity="0.6"/>
    ))}
    <circle cx="0" cy="0" r="2" fill={GOLD_LIGHT}/>
  </svg>
);

export default function NikkahInvitation() {
  const [isOpen, setIsOpen]           = useState(false);
  const [isExiting, setIsExiting]     = useState(false);   // envelope flip-out phase
  const [showContent, setShowContent] = useState(false);
  const [isPlaying, setIsPlaying]     = useState(false);
  const audioRef = useRef(null);

  const handleOpen = () => {
    if (isExiting || isOpen) return;
    setIsExiting(true);                          // 1. start envelope flip-out
    setTimeout(() => {
      setIsOpen(true);                           // 2. swap to card mid-flip
      audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => {});
    }, 480);
    setTimeout(() => setShowContent(true), 1300); // 3. reveal card content
  };

  const toggleMusic = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {}); }
  };

  /* warm ivory card background — matches image bottom section */
  const CARD_BG = `linear-gradient(180deg, ${SOFT_WHITE} 0%, ${CREAM} 25%, #fdf1d6 55%, ${CREAM} 80%, ${SOFT_WHITE} 100%)`;

  return (
    <div style={{
      minHeight:"100vh",
      display:"flex", alignItems:"center", justifyContent:"center",
      background:`linear-gradient(160deg, ${DEEP_GREEN} 0%, #0a0805 40%, #060402 65%, ${DEEP_GREEN}cc 100%)`,
      fontFamily:"'Cormorant Garamond', serif",
      padding:"clamp(10px,3vw,20px)",
      position:"relative", overflow:"hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap');

        @keyframes floatIn {
          from { opacity:0; transform:translate(0,20px) scale(0.8); }
          to   { opacity:0.15; transform:translate(0,0) scale(1); }
        }
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeSlideDown {
          from { opacity:0; transform:translateY(-20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity:0; transform:scale(0.90); }
          to   { opacity:1; transform:scale(1); }
        }
        @keyframes shimmer {
          0%   { background-position:-200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse {
          0%,100% { transform:scale(1); }
          50%     { transform:scale(1.05); }
        }
        @keyframes rotateIn {
          from { opacity:0; transform:rotate(-10deg) scale(0.8); }
          to   { opacity:1; transform:rotate(0) scale(1); }
        }
        @keyframes letterSpaceIn {
          from { opacity:0; letter-spacing:15px; }
          to   { opacity:1; letter-spacing:6px; }
        }
        @keyframes heartbeat {
          0%,100% { transform:scale(1); }
          14%     { transform:scale(1.16); }
          28%     { transform:scale(1); }
          42%     { transform:scale(1.1); }
          56%     { transform:scale(1); }
        }
        @keyframes petalFallR {
          0%   { transform:translateY(-60px) translateX(0) rotate(0deg);   opacity:0; }
          7%   { opacity:1; }
          30%  { transform:translateY(28vh) translateX(28px) rotate(110deg); }
          60%  { transform:translateY(58vh) translateX(-10px) rotate(250deg); }
          90%  { opacity:0.5; }
          100% { transform:translateY(108vh) translateX(22px) rotate(390deg); opacity:0; }
        }
        @keyframes petalFallL {
          0%   { transform:translateY(-60px) translateX(0) rotate(0deg);    opacity:0; }
          7%   { opacity:1; }
          30%  { transform:translateY(28vh) translateX(-28px) rotate(-110deg); }
          60%  { transform:translateY(58vh) translateX(12px) rotate(-250deg); }
          90%  { opacity:0.5; }
          100% { transform:translateY(108vh) translateX(-18px) rotate(-390deg); opacity:0; }
        }
        @keyframes borderScroll {
          from { stroke-dashoffset:0; }
          to   { stroke-dashoffset:-120; }
        }
        @keyframes starSpin {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }
        @keyframes glowFloat {
          0%,100% { opacity:0.55; transform:translate(-50%,-50%) scale(1); }
          50%     { opacity:0.9;  transform:translate(-50%,-50%) scale(1.18); }
        }
        @keyframes cardGlow {
          0%,100% {
            box-shadow: 0 0 0 1px ${GOLD}40,
                        0 0 0 4px ${GOLD}0c,
                        0 50px 100px rgba(0,0,0,0.88),
                        0 0 60px ${GOLD}16;
          }
          50% {
            box-shadow: 0 0 0 2px ${GOLD}75,
                        0 0 0 6px ${GOLD}18,
                        0 50px 100px rgba(0,0,0,0.88),
                        0 0 100px ${GOLD}32;
          }
        }
        @keyframes fadeIn    { from{opacity:0;} to{opacity:1;} }
        @keyframes roseBranchReveal {
          from { opacity:0; transform:scaleX(0.55); }
          to   { opacity:0.52; transform:scaleX(1); }
        }
        @keyframes musicGlow {
          0%,100% { box-shadow:0 0 14px ${GOLD}40, 0 4px 20px rgba(0,0,0,0.5); }
          50%     { box-shadow:0 0 28px ${GOLD}70, 0 4px 20px rgba(0,0,0,0.5); }
        }
        @keyframes imageReveal {
          from { opacity:0; transform:scale(1.04); }
          to   { opacity:1; transform:scale(1); }
        }
        @keyframes namesFadeIn {
          from { opacity:0; transform:translateY(20px) scale(0.95); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }

        /* ── Card opening animation ── */
        @keyframes envelopeFlipOut {
          0%   { transform:perspective(1200px) rotateY(0deg)   scale(1);    opacity:1; }
          20%  { transform:perspective(1200px) rotateY(0deg)   scale(1.05); opacity:1; }
          100% { transform:perspective(1200px) rotateY(-90deg) scale(0.8);  opacity:0; }
        }
        @keyframes cardFlipIn {
          0%   { transform:perspective(1200px) rotateY(90deg)  scale(0.8);  opacity:0; }
          45%  { transform:perspective(1200px) rotateY(-6deg)  scale(1.02); opacity:1; }
          70%  { transform:perspective(1200px) rotateY(3deg); }
          88%  { transform:perspective(1200px) rotateY(-1deg); }
          100% { transform:perspective(1200px) rotateY(0deg)  scale(1);    opacity:1; }
        }

        /* ── Name letter animations ── */
        @keyframes letterDrop {
          0%   { opacity:0; transform:translateY(-55px) rotateX(90deg) scale(1.3); }
          55%  { opacity:1; transform:translateY(7px) rotateX(-12deg) scale(0.96); }
          75%  { transform:translateY(-4px) rotateX(5deg) scale(1.02); }
          90%  { transform:translateY(2px) rotateX(-1deg) scale(1); }
          100% { opacity:1; transform:translateY(0) rotateX(0deg) scale(1); }
        }
        @keyframes letterShimmer {
          0%   { background-position:250% center; }
          100% { background-position:-250% center; }
        }
        @keyframes letterWave {
          0%,100% { transform:translateY(0); }
          50%     { transform:translateY(-7px); }
        }
        @keyframes letterGlow {
          0%,100% { filter:drop-shadow(0 0 2px ${GOLD}40); }
          50%     { filter:drop-shadow(0 0 9px ${GOLD}cc) drop-shadow(0 0 20px ${GOLD}55); }
        }

        /* Outer wrapper — handles vertical wave only (no transform conflict with drop) */
        .name-letter-wave {
          display: inline-block;
          animation: letterWave 3s ease-in-out infinite;
        }

        /* Inner span — drop-in entry + continuous shimmer + glow
           animation-delay is set inline per-letter */
        .name-letter {
          background: linear-gradient(135deg,
            ${GOLD_DARK} 0%, ${GOLD_RICH} 25%,
            ${GOLD_LIGHT} 50%, ${GOLD_RICH} 75%, ${GOLD_DARK} 100%);
          background-size: 350% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation:
            letterDrop    0.7s cubic-bezier(0.34,1.56,0.64,1) both,
            letterShimmer 3.5s linear   infinite,
            letterGlow    2.8s ease-in-out infinite;
        }

        /* ── Component classes ── */
        .invitation-card {
          animation: cardFlipIn 0.9s cubic-bezier(0.22,1,0.36,1) both,
                     cardGlow 5s ease-in-out 2.5s infinite;
        }
        .bismillah    { animation: fadeSlideDown 1s ease-out 0.4s both; }
        .ampersand {
          animation: rotateIn 0.8s ease-out 1.2s both, heartbeat 3s ease-in-out 2s infinite;
        }
        .envelope-wrapper { cursor:pointer; transition:transform 0.3s ease; }
        .envelope-wrapper:hover { transform:scale(1.03); }
        .envelope-exit {
          animation: envelopeFlipOut 0.48s cubic-bezier(0.4,0,0.6,1) forwards;
          pointer-events: none;
        }
        .venue-text:hover { color:${GOLD_RICH} !important; }
        .rose-branch-top { animation: roseBranchReveal 1.2s cubic-bezier(0.22,1,0.36,1) 1.2s both; }
        .rose-branch-bot { animation: roseBranchReveal 1.2s cubic-bezier(0.22,1,0.36,1) 1.5s both; }
        .star-spin { animation: starSpin 18s linear infinite; transform-origin:center; }
        .hero-image { animation: imageReveal 1.4s cubic-bezier(0.22,1,0.36,1) 0.2s both; }

        /* ── Music button ── */
        .music-btn {
          position:fixed; bottom:24px; right:24px;
          width:50px; height:50px; border-radius:50%;
          border:1.5px solid ${GOLD}55;
          background:radial-gradient(circle at center, #1a1208 0%, #060402 100%);
          cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          z-index:1000;
          box-shadow:0 4px 16px rgba(0,0,0,0.7);
          transition:border-color 0.3s ease; outline:none;
        }
        .music-btn:hover { border-color:${GOLD}90; }
        .music-btn.playing { border-color:${GOLD}90; animation:musicGlow 2.5s ease-in-out infinite; }
        .music-label {
          position:fixed; bottom:82px; right:18px;
          font-family:'Cormorant Garamond',serif; font-size:11px;
          color:${GOLD_LIGHT}; letter-spacing:2px; text-transform:uppercase;
          opacity:0.5; pointer-events:none;
          writing-mode:vertical-rl; text-orientation:mixed;
        }

        /* ── Responsive ── */
        .countdown-circle {
          width:clamp(48px,13vw,68px) !important;
          height:clamp(48px,13vw,68px) !important;
          background: radial-gradient(circle, ${GOLD}22, ${GOLD}06) !important;
          border-color: ${GOLD}70 !important;
        }
        .countdown-value { font-size:clamp(14px,4vw,22px) !important; }
        .countdown-label { color:${TEXT_MID} !important; font-size:clamp(9px,2.5vw,11px) !important; }
        .countdown-wrapper {
          display:flex !important;
          flex-wrap:wrap !important;
          justify-content:center !important;
          gap:clamp(6px,2vw,14px) !important;
        }
        .card-content {
          padding: clamp(22px,6vw,36px) clamp(14px,5vw,36px) clamp(28px,7vw,48px);
        }
        @media (max-width:480px) {
          .invitation-card { border-radius:12px !important; }
          .card-content   { padding:20px 14px 32px !important; }
          .name-letter    { font-size:clamp(18px,5vw,28px) !important; }
          .music-btn      { width:42px !important; height:42px !important; bottom:16px !important; right:16px !important; }
          .music-label    { display:none !important; }
        }
        @media (max-width:360px) {
          .card-content   { padding:16px 10px 26px !important; }
          .name-letter    { font-size:clamp(16px,4.5vw,24px) !important; }
          .countdown-circle { width:44px !important; height:44px !important; }
        }
      `}</style>

      <audio ref={audioRef} src="https://cdn.islamic.network/quran/audio/128/ar.alafasy/55.mp3"
        loop preload="none" />

      {/* Music toggle */}
      <button onClick={toggleMusic}
        className={`music-btn${isPlaying?" playing":""}`}
        title={isPlaying?"Pause":"Play Surah Ar-Rahman"}>
        {isPlaying ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill={`${GOLD}25`}/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13"/>
            <circle cx="6" cy="18" r="3" fill={`${GOLD}25`}/>
            <circle cx="18" cy="16" r="3" fill={`${GOLD}25`}/>
          </svg>
        )}
      </button>
      <span className="music-label">{isPlaying?"♪ Playing":"♪ Music"}</span>

      {/* ── Background layers ── */}
      <ParticleField />
      <FallingPetals />
      <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}>
        {floralPatterns.map((p,i)=>(
          <IslamicPattern key={i} x={`${p.x}%`} y={`${p.y}%`} size={p.size} delay={p.delay} rotation={p.rotation}/>
        ))}
        {[{cx:"15%",cy:"20%",r:1.5,d:0},{cx:"80%",cy:"15%",r:1,d:1},{cx:"90%",cy:"50%",r:1.2,d:2},
          {cx:"10%",cy:"70%",r:1.8,d:0.5},{cx:"75%",cy:"85%",r:1,d:1.5},{cx:"25%",cy:"90%",r:1.3,d:2.5},
          {cx:"50%",cy:"30%",r:0.8,d:3},{cx:"60%",cy:"65%",r:1.1,d:1.8}
        ].map((s,i)=><StarBurst key={i} cx={s.cx} cy={s.cy} r={s.r} delay={s.d}/>)}
      </svg>

      {!isOpen ? (
        /* ═══════════════════ ENVELOPE ═══════════════════ */
        <div className={isExiting ? "envelope-exit" : "envelope-wrapper"}
          onClick={isExiting ? undefined : handleOpen}
          style={{ width:"min(340px,90vw)", aspectRatio:"340/420", position:"relative" }}>
          <div style={{
            width:"140%", height:"140%",
            background:`linear-gradient(150deg, #1a1208, ${EMERALD}cc, #120e05)`,
            borderRadius:"12px", border:`2px solid ${GOLD}60`,
            display:"flex", flexDirection:"column", alignItems:"center",
            justifyContent:"center", gap:"clamp(12px,3.5vw,22px)",
            boxShadow:`0 25px 70px rgba(0,0,0,0.7), 0 0 0 1px ${GOLD}18, inset 0 1px 0 ${GOLD}30`,
            position:"relative", overflow:"hidden",
          }}>
            <svg style={{ position:"absolute", inset:"12px", width:"calc(100% - 24px)", height:"calc(100% - 24px)" }}>
              <rect x="0" y="0" width="100%" height="100%" rx="6"
                fill="none" stroke={GOLD} strokeWidth="0.6" opacity="0.35" strokeDasharray="8,4"/>
            </svg>
            {[{top:"18px",left:"18px"},{top:"18px",right:"18px"},
              {bottom:"18px",left:"18px"},{bottom:"18px",right:"18px"}].map((pos,i)=>(
              <div key={i} className="star-spin" style={{ position:"absolute",...pos, opacity:0.4 }}>
                <StarAccent size={13}/>
              </div>
            ))}

            {/* Top floral arc */}
            <div style={{ position:"absolute", top:"26px", left:"50%", transform:"translateX(-50%)",
                          animation:"fadeIn 1.5s ease-out 0.5s both" }}>
              <svg width="110" height="28" viewBox="0 0 110 28" style={{ opacity:0.45 }}>
                <path d="M 10,22 Q 30,10 55,14 Q 80,10 100,22"
                  stroke={GOLD} strokeWidth="0.85" fill="none" strokeLinecap="round"/>
                <g transform="translate(55,14)">
                  {[0,72,144,216,288].map(a=>(
                    <path key={a} transform={`rotate(${a})`}
                      d="M 0,0.5 C 2,-2 2,-6 0,-8.5 C -2,-6 -2,-2 0,0.5 Z" fill={GOLD} opacity="0.85"/>
                  ))}
                  <circle cx="0" cy="0" r="2" fill={GOLD_LIGHT} opacity="0.9"/>
                </g>
              </svg>
            </div>

            {/* Thumbnail preview of image */}
            <div style={{
              width:"min(130px,38vw)", height:"min(100px,29vw)",
              borderRadius:"8px", overflow:"hidden",
              border:`1.5px solid ${GOLD}55`,
              boxShadow:`0 4px 20px rgba(0,0,0,0.5), 0 0 0 1px ${GOLD}20`,
              animation:"fadeSlideDown 1s ease-out both", marginTop:"14px",
            }}>
              <img src={coupleImage} alt="Couple"
                style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }}/>
            </div>

            <div style={{ textAlign:"center", animation:"fadeSlideUp 1s ease-out 0.3s both", padding:"0 18px" }}>
              <p style={{ fontFamily:"'Amiri',serif", fontSize:"clamp(18px,6vw,26px)",
                          color:GOLD, margin:"0 0 4px 0", direction:"rtl" }}>
                بِسْمِ ٱللّٰهِ ٱلرَّحْمٰنِ ٱلرَّحِيمِ
              </p>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(9px,2.5vw,11px)",
                          color:GOLD_LIGHT, margin:0, letterSpacing:"2px", textTransform:"uppercase", opacity:0.65 }}>
                In the name of Allah, the Most Gracious, the Most Merciful
              </p>
            </div>

            <div style={{ textAlign:"center", animation:"fadeSlideUp 1s ease-out 0.6s both" }}>
              <p style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(10px,3vw,14px)",
                          color:GOLD_LIGHT, letterSpacing:"5px", textTransform:"uppercase",
                          margin:"0 0 8px 0", opacity:0.8 }}>
                Nikkah Invitation
              </p>
              <p style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(20px,7vw,28px)", fontWeight:"700",
                          background:`linear-gradient(90deg, ${GOLD_DARK}, ${GOLD_RICH}, ${GOLD_LIGHT}, ${GOLD_RICH}, ${GOLD_DARK})`,
                          backgroundSize:"200% auto",
                          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                          animation:"shimmer 3s linear infinite", margin:0 }}>
                <p style={{ color:GOLD, fontSize:"clamp(20px,7vw,28px)", margin:"0 0 4px 0" }}>Hafiza Zainab Akram</p> & <p style={{ color:GOLD, fontSize:"clamp(20px,7vw,28px)", margin:"0 0 4px 0" }}>Adeel Asghar</p>
              </p>
            </div>

            <div style={{ display:"flex", alignItems:"center", gap:"8px",
                          animation:"fadeSlideUp 1s ease-out 0.9s both" }}>
              <div style={{ width:"36px", height:"1px", background:`linear-gradient(to right, transparent, ${GOLD})` }}/>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(10px,3vw,13px)",
                             color:GOLD, letterSpacing:"3px", textTransform:"uppercase" }}>
                Open to View
              </span>
              <div style={{ width:"36px", height:"1px", background:`linear-gradient(to left, transparent, ${GOLD})` }}/>
            </div>

            <div style={{ position:"absolute", bottom:"clamp(14px,3.5vw,24px)", animation:"pulse 1.5s ease-in-out infinite",     bottom: "13px" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 3v14m0 0l-5-5m5 5l5-5" stroke={GOLD} strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
              </svg>
            </div>
          </div>
        </div>

      ) : (
        /* ═══════════════════ INVITATION CARD ═══════════════════ */
        <div className="invitation-card" style={{
          width:"100%", maxWidth:"520px",
          background: CARD_BG,
          borderRadius:"16px",
          border:`2px solid ${GOLD}65`,
          position:"relative", overflow:"hidden",
          padding:0,
        }}>

          {/* ── Arabesque watermark ── */}
          <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%",
                        pointerEvents:"none", opacity:0.04, zIndex:0 }}>
            <defs>
              <pattern id="arabesque" x="0" y="0" width="70" height="70" patternUnits="userSpaceOnUse">
                <polygon points={STAR8} fill="none" stroke={GOLD} strokeWidth="0.7"/>
                <circle cx="35" cy="35" r="12" fill="none" stroke={GOLD} strokeWidth="0.5"/>
                <circle cx="35" cy="35" r="4"  fill={GOLD} opacity="0.6"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#arabesque)"/>
          </svg>

          {/* ── Animated scrolling inner border ── */}
          <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%",
                        pointerEvents:"none", zIndex:1 }}
               preserveAspectRatio="none" viewBox="0 0 100 100">
            <rect x="1.2" y="0.7" width="97.6" height="98.6" rx="2.5"
              fill="none" stroke={GOLD} strokeWidth="0.28" opacity="0.32"
              strokeDasharray="5 3.5"
              style={{ animation:"borderScroll 22s linear infinite" }}
              vectorEffect="non-scaling-stroke"/>
            <rect x="2.8" y="1.6" width="94.4" height="96.8" rx="2"
              fill="none" stroke={GOLD} strokeWidth="0.15" opacity="0.18"
              strokeDasharray="3 7"
              style={{ animation:"borderScroll 35s linear infinite reverse" }}
              vectorEffect="non-scaling-stroke"/>
          </svg>

          {/* ── Corner ornaments ── */}
          {[{top:0,left:0,sx:1,sy:1},{top:0,right:0,sx:-1,sy:1},
            {bottom:0,left:0,sx:1,sy:-1},{bottom:0,right:0,sx:-1,sy:-1}].map((pos,i)=>{
            const {sx,sy,...placement}=pos;
            return (
              <svg key={i} width="72" height="72" viewBox="0 0 72 72" style={{
                position:"absolute",...placement,
                transform:`scaleX(${sx}) scaleY(${sy})`, opacity:0.55, zIndex:2,
              }}>
                <path d="M 0,0 Q 36,5 68,0 Q 63,36 68,68" fill="none" stroke={GOLD} strokeWidth="1"/>
                <path d="M 0,0 Q 25,8 50,4 Q 45,25 50,50"  fill="none" stroke={GOLD} strokeWidth="0.55"/>
                <circle cx="7" cy="7" r="3" fill={GOLD} opacity="0.65"/>
                <g transform="translate(7,7)" opacity="0.65">
                  {[0,120,240].map(a=>(
                    <path key={a} transform={`rotate(${a})`}
                      d="M 0,0.5 C 1.1,-1 1.1,-3.2 0,-4.5 C -1.1,-3.2 -1.1,-1 0,0.5 Z" fill={GOLD}/>
                  ))}
                </g>
              </svg>
            );
          })}

          {/* Spinning corner stars */}
          {[{top:"20px",left:"20px"},{top:"20px",right:"20px"},
            {bottom:"20px",left:"20px"},{bottom:"20px",right:"20px"}].map((pos,i)=>(
            <div key={i} className="star-spin"
              style={{ position:"absolute",...pos, opacity:0.3, zIndex:3,
                       animationDuration:`${20+i*4}s` }}>
              <StarAccent size={11}/>
            </div>
          ))}

          {/* ══════════════ HERO IMAGE ══════════════ */}
          <div className="hero-image" style={{
            position:"relative", zIndex:2,
            borderRadius:"14px 14px 0 0", overflow:"hidden",
          }}>
            <img src={coupleImage} alt="Nikkah Invitation"
              style={{
                width:"100%",
                display:"block",
                maxHeight:"clamp(320px,80vw,480px)",
                objectFit:"cover",
                objectPosition:"center top",
              }}/>
            {/* Gradient fade from image into card below */}
            <div style={{
              position:"absolute", bottom:0, left:0, right:0,
              height:"80px",
              background:`linear-gradient(to bottom, transparent 0%, ${CREAM}cc 60%, ${SOFT_WHITE} 100%)`,
              pointerEvents:"none",
            }}/>
            {/* Gold shimmer bar */}
            <div style={{
              position:"absolute", bottom:"0", left:0, right:0, height:"2px",
              background:`linear-gradient(to right, transparent, ${GOLD}90, ${GOLD_LIGHT}, ${GOLD}90, transparent)`,
            }}/>
          </div>

          {/* ══════════════ INVITATION CONTENT ══════════════ */}
          {showContent && (
            <div className="card-content" style={{ position:"relative", zIndex:4 }}>

              {/* Warm glow behind names */}
              <div style={{
                position:"absolute", top:"35%", left:"50%",
                width:"340px", height:"240px",
                background:`radial-gradient(ellipse, ${GOLD}0f 0%, transparent 68%)`,
                pointerEvents:"none", zIndex:0,
                animation:"glowFloat 6s ease-in-out infinite",
                transform:"translate(-50%,-50%)",
              }}/>

              {/* Bismillah */}
              <div className="bismillah" style={{ textAlign:"center", marginBottom:"20px", position:"relative", zIndex:1 }}>
                <p style={{ fontFamily:"'Amiri',serif", fontSize:"clamp(22px,6vw,30px)",
                            color:GOLD_RICH, margin:"0 0 5px 0", direction:"rtl", lineHeight:1.6 }}>
                  بِسْمِ ٱللّٰهِ ٱلرَّحْمٰنِ ٱلرَّحِيمِ
                </p>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(10px,2.5vw,12px)",
                            color:TEXT_MID, letterSpacing:"2px", margin:0, opacity:0.85, textTransform:"uppercase" }}>
                  In the name of Allah, the Most Gracious, the Most Merciful
                </p>
              </div>

              <OrnamentalDivider width={280}/>

              {/* Quranic verse */}
              <div style={{ textAlign:"center", margin:"20px 0", animation:"fadeSlideUp 0.8s ease-out 0.5s both" }}>
                <p style={{ fontFamily:"'Amiri',serif", fontSize:"clamp(14px,4vw,19px)",
                            color:GOLD_DARK, direction:"rtl", margin:"0 0 8px 0", lineHeight:1.9 }}>
                  وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
                </p>
                <p style={{ fontFamily:"'Amiri',serif",
                            fontSize:"clamp(12px,3.2vw,15px)", color:TEXT_DARK,
                            margin:0, lineHeight:2, opacity:0.85, padding:"0 8px",
                            direction:"rtl" }}>
                  "اور اس کی نشانیوں میں سے ہے کہ اس نے تمہارے لیے تم ہی میں سے جوڑے بنائے تاکہ تم ان سے سکون پاؤ اور اس نے تمہارے درمیان محبت اور رحمت رکھ دی۔"
                  <span style={{ color:TEXT_MID, fontSize:"clamp(10px,2.5vw,12px)", display:"block",
                                 direction:"rtl", marginTop:"4px" }}> — سورۃ الروم (٣٠:٢١)</span>
                </p>
              </div>

              <OrnamentalDivider width={200}/>

              {/* Subtitle */}
              <div style={{ textAlign:"center", margin:"18px 0 6px", animation:"letterSpaceIn 1s ease-out 0.7s both" }}>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(10px,2.5vw,12px)",
                            color:TEXT_MID, letterSpacing:"5px", textTransform:"uppercase", margin:0 }}>
                  Together with the blessings of Allah
                </p>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(10px,2.5vw,12px)",
                            color:TEXT_MID, letterSpacing:"3px", textTransform:"uppercase",
                            margin:"4px 0 0", opacity:0.8 }}>
                  We request the honour of your presence at the Nikkah of
                </p>
              </div>

              {/* ── Names ── */}
              <div style={{ textAlign:"center", margin:"22px 0" }}>
                <div className="rose-branch-top" style={{ marginBottom:"14px" }}><RoseBranch/></div>

                <AnimatedName name="Hafiza Zainab Akram" entryDelay={1.0} />

                <div className="ampersand" style={{ display:"inline-block", margin:"10px 0" }}>
                  <span style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic",
                                 fontSize:"clamp(28px,8vw,38px)", color:GOLD, opacity:0.85 }}>with
                  </span>
                </div>

                <AnimatedName name="Adeel Asghar" entryDelay={1.7} />

                <div className="rose-branch-bot" style={{ marginTop:"14px" }}><RoseBranch flip/></div>

                {/* Animated heart */}
                <div style={{ marginTop:"14px", animation:"heartbeat 3s ease-in-out 2.5s infinite" }}>
                  <svg width="30" height="28" viewBox="0 0 30 28" fill="none">
                    <path d="M15 25 C15 25 2 16 2 8.5 C2 5 4.5 2.5 8 2.5 C10.5 2.5 13.5 4 15 6.5 C16.5 4 19.5 2.5 22 2.5 C25.5 2.5 28 5 28 8.5 C28 16 15 25 15 25Z"
                      fill={GOLD} opacity="0.75"/>
                    <path d="M15 23 C15 23 4.5 15 4.5 8.5 C4.5 6 6 4.5 8 4.5 C10 4.5 12.5 5.5 15 8.5 C17.5 5.5 20 4.5 22 4.5 C24 4.5 25.5 6 25.5 8.5 C25.5 15 15 23 15 23Z"
                      fill={GOLD_LIGHT} opacity="0.45"/>
                  </svg>
                </div>
              </div>

              <OrnamentalDivider width={240}/>

              {/* Date & Venue */}
              <div style={{ textAlign:"center", margin:"24px 0", animation:"fadeSlideUp 0.8s ease-out 1.2s both" }}>
                <div style={{ marginBottom:"18px" }}>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(10px,2.5vw,12px)",
                              color:TEXT_MID, letterSpacing:"5px", textTransform:"uppercase", margin:"0 0 4px 0" }}>
                    Tuesday
                  </p>
                  <p style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(16px,5vw,21px)",
                              color:GOLD_DARK, letterSpacing:"3px", margin:"0 0 4px 0", fontWeight:"600" }}>
                    10th March, 2026
                  </p>
                  <p style={{ fontFamily:"'Amiri',serif", fontSize:"clamp(13px,3.5vw,16px)",
                              color:TEXT_MID, margin:0, opacity:0.7, direction:"rtl" }}>
                    ١٤ شعبان ١٤٤٧ هـ
                  </p>
                </div>

                <div style={{ margin:"16px 0" }}><MosqueIcon/></div>

                <div>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(10px,2.5vw,12px)",
                              color:TEXT_MID, letterSpacing:"5px", textTransform:"uppercase", margin:"0 0 6px 0" }}>
                    Venue
                  </p>
                  <p className="venue-text"
                    style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(18px,6vw,26px)",
                             fontWeight:"700", color:GOLD_DARK, margin:"0 0 3px 0",
                             transition:"all 0.3s ease", cursor:"default" }}>
                    Masjid ul Nabi (S.A.W)
                  </p>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic",
                              fontSize:"clamp(13px,4vw,16px)", color:TEXT_DARK, margin:0, opacity:0.8 }}>
                    Al Madinah Al-Munawwarah
                  </p>
                  <p style={{ fontFamily:"'Amiri',serif", fontSize:"clamp(14px,4vw,18px)",
                              color:GOLD, margin:"5px 0 0", opacity:0.6, direction:"rtl" }}>
                    الْمَسْجِدُ النَّبَوِيُّ ، الْمَدِينَةُ الْمُنَوَّرَةُ
                  </p>
                </div>
              </div>

              <OrnamentalDivider width={180}/>

              {/* Countdown */}
              <div style={{ textAlign:"center", margin:"24px 0", animation:"fadeSlideUp 0.8s ease-out 1.5s both" }}>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(10px,2.5vw,12px)",
                            color:TEXT_MID, letterSpacing:"4px", textTransform:"uppercase", margin:"0 0 14px 0" }}>
                  Counting Down To The Blessed Day
                </p>
                <CountdownTimer targetDate="2026-03-10T00:00:00"/>
              </div>

              <OrnamentalDivider width={160}/>

              {/* Dua */}
              <div style={{ textAlign:"center", margin:"24px 0 8px",
                            animation:"fadeSlideUp 0.8s ease-out 2s both" }}>
                <p style={{ fontFamily:"'Amiri',serif", fontSize:"clamp(15px,4.5vw,20px)",
                            color:GOLD_DARK, direction:"rtl", margin:"0 0 10px 0", lineHeight:1.9 }}>
                  بَارَكَ ٱللّٰهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
                </p>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic",
                            fontSize:"clamp(11px,3vw,13px)", color:TEXT_DARK,
                            margin:0, lineHeight:1.7, opacity:0.85 }}>
                  "May Allah bless you, shower His blessings upon you,
                  <br/>and unite you both in goodness."
                </p>
              </div>

              {/* Footer */}
              <div style={{ textAlign:"center", marginTop:"28px",
                            animation:"fadeSlideUp 0.8s ease-out 2.2s both" }}>
                <div style={{ display:"flex", justifyContent:"center", alignItems:"center",
                              gap:"12px", marginBottom:"10px" }}>
                  <div style={{ width:"44px", height:"1px",
                                background:`linear-gradient(to right, transparent, ${GOLD}80)` }}/>
                  <StarAccent size={12} style={{ animation:"starSpin 12s linear infinite", opacity:0.55 }}/>
                  <svg width="22" height="22" viewBox="-11 -11 22 22">
                    {[0,72,144,216,288].map(a=>(
                      <path key={a} transform={`rotate(${a})`}
                        d="M 0,0.5 C 2,-2 2,-6.5 0,-9 C -2,-6.5 -2,-2 0,0.5 Z" fill={GOLD} opacity="0.85"/>
                    ))}
                    <circle cx="0" cy="0" r="2.2" fill={GOLD_LIGHT}/>
                  </svg>
                  <StarAccent size={12} style={{ animation:"starSpin 12s linear infinite reverse", opacity:0.55 }}/>
                  <div style={{ width:"44px", height:"1px",
                                background:`linear-gradient(to left, transparent, ${GOLD}80)` }}/>
                </div>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(10px,2.5vw,12px)",
                            color:TEXT_MID, letterSpacing:"2px", margin:"0 50px", textAlign:"center",
                            textTransform:"uppercase", opacity:0.7 }}>
                  Your presence &amp; prayers are humbly requested
                </p>
              </div>

            </div>
          )}
        </div>
      )}
    </div>
  );
}
