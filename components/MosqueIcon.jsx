import { GOLD, GOLD_LIGHT } from "../constants";

/**
 * Detailed architectural mosque illustration —
 * central dome with crescent, two tall minarets, two side domes,
 * arched entrance, side arched windows, decorative band.
 */
const MosqueIcon = ({ width = 130, height = 96 }) => (
  <svg width={width} height={height} viewBox="0 0 130 96" fill="none">

    {/* ── Ground line ── */}
    <line x1="4" y1="88" x2="126" y2="88" stroke={GOLD} strokeWidth="1" opacity="0.55" />
    <line x1="0" y1="90" x2="130" y2="90" stroke={GOLD} strokeWidth="0.4" opacity="0.25" />

    {/* ══════ LEFT MINARET ══════ */}
    {/* Shaft */}
    <rect x="11" y="32" width="11" height="56" rx="1"
      fill={GOLD} fillOpacity="0.10" stroke={GOLD} strokeWidth="0.8" />
    {/* Horizontal bands on shaft */}
    <line x1="11" y1="48" x2="22" y2="48" stroke={GOLD} strokeWidth="0.4" opacity="0.5" />
    <line x1="11" y1="64" x2="22" y2="64" stroke={GOLD} strokeWidth="0.4" opacity="0.5" />
    {/* Balcony */}
    <rect x="8" y="44" width="17" height="3.5" rx="0.5"
      fill={GOLD} fillOpacity="0.22" stroke={GOLD} strokeWidth="0.6" />
    {/* Minaret bulb dome */}
    <ellipse cx="16.5" cy="29" rx="7" ry="5"
      fill={GOLD} fillOpacity="0.18" stroke={GOLD} strokeWidth="0.8" />
    {/* Cap spire */}
    <path d="M 14,29 Q 16.5,22 19,29" fill={GOLD} fillOpacity="0.3" stroke={GOLD} strokeWidth="0.6" />
    <line x1="16.5" y1="22" x2="16.5" y2="13" stroke={GOLD} strokeWidth="0.9" />
    {/* Crescent + dot finial */}
    <path d="M 14.5,11 Q 15.5,8 18,8 Q 16,11 16.5,13"
      stroke={GOLD} strokeWidth="0.85" fill="none" strokeLinecap="round" />
    <circle cx="16.5" cy="8" r="1.4" fill={GOLD} opacity="0.9" />

    {/* ══════ RIGHT MINARET ══════ */}
    <rect x="108" y="32" width="11" height="56" rx="1"
      fill={GOLD} fillOpacity="0.10" stroke={GOLD} strokeWidth="0.8" />
    <line x1="108" y1="48" x2="119" y2="48" stroke={GOLD} strokeWidth="0.4" opacity="0.5" />
    <line x1="108" y1="64" x2="119" y2="64" stroke={GOLD} strokeWidth="0.4" opacity="0.5" />
    <rect x="105" y="44" width="17" height="3.5" rx="0.5"
      fill={GOLD} fillOpacity="0.22" stroke={GOLD} strokeWidth="0.6" />
    <ellipse cx="113.5" cy="29" rx="7" ry="5"
      fill={GOLD} fillOpacity="0.18" stroke={GOLD} strokeWidth="0.8" />
    <path d="M 111,29 Q 113.5,22 116,29" fill={GOLD} fillOpacity="0.3" stroke={GOLD} strokeWidth="0.6" />
    <line x1="113.5" y1="22" x2="113.5" y2="13" stroke={GOLD} strokeWidth="0.9" />
    <path d="M 111.5,11 Q 112.5,8 115,8 Q 113,11 113.5,13"
      stroke={GOLD} strokeWidth="0.85" fill="none" strokeLinecap="round" />
    <circle cx="113.5" cy="8" r="1.4" fill={GOLD} opacity="0.9" />

    {/* ══════ MAIN BODY WALL ══════ */}
    <rect x="24" y="52" width="82" height="36" rx="1"
      fill={GOLD} fillOpacity="0.07" stroke={GOLD} strokeWidth="0.8" />

    {/* ══════ LEFT SIDE DOME ══════ */}
    <path d="M 26,52 Q 26,38 36,35 Q 46,38 46,52"
      fill={GOLD} fillOpacity="0.12" stroke={GOLD} strokeWidth="0.8" />
    <line x1="36" y1="35" x2="36" y2="28" stroke={GOLD} strokeWidth="0.7" />
    <circle cx="36" cy="27" r="1.3" fill={GOLD} opacity="0.85" />

    {/* ══════ RIGHT SIDE DOME ══════ */}
    <path d="M 84,52 Q 84,38 94,35 Q 104,38 104,52"
      fill={GOLD} fillOpacity="0.12" stroke={GOLD} strokeWidth="0.8" />
    <line x1="94" y1="35" x2="94" y2="28" stroke={GOLD} strokeWidth="0.7" />
    <circle cx="94" cy="27" r="1.3" fill={GOLD} opacity="0.85" />

    {/* ══════ CENTRAL MAIN DOME ══════ */}
    {/* Outer silhouette */}
    <path d="M 40,52 Q 40,18 65,14 Q 90,18 90,52"
      fill={GOLD} fillOpacity="0.16" stroke={GOLD} strokeWidth="1.2" />
    {/* Inner highlight arc */}
    <path d="M 48,52 Q 48,26 65,23 Q 82,26 82,52"
      fill={GOLD} fillOpacity="0.07" stroke={GOLD} strokeWidth="0.5" opacity="0.7" />
    {/* Drum band */}
    <line x1="40" y1="52" x2="90" y2="52" stroke={GOLD} strokeWidth="0.5" opacity="0.4" />
    {/* Dome spire */}
    <line x1="65" y1="14" x2="65" y2="5" stroke={GOLD} strokeWidth="1.1" />
    {/* Crescent */}
    <path d="M 62.5,3 Q 63.5,-1 67.5,-1 Q 64.5,3 65,5"
      stroke={GOLD} strokeWidth="1" fill="none" strokeLinecap="round" />
    <circle cx="65" cy="1.5" r="1.8" fill={GOLD} opacity="0.9" />

    {/* ══════ MAIN ARCHED ENTRANCE ══════ */}
    <path d="M 53,88 L 53,68 Q 65,58 77,68 L 77,88"
      fill={GOLD} fillOpacity="0.12" stroke={GOLD} strokeWidth="1" />
    {/* Door detail */}
    <line x1="65" y1="58" x2="65" y2="88" stroke={GOLD} strokeWidth="0.4" opacity="0.4" />

    {/* ══════ SIDE ARCHED WINDOWS ══════ */}
    {/* Left pair */}
    <path d="M 28,82 L 28,68 Q 33,63 38,68 L 38,82" fill="none" stroke={GOLD} strokeWidth="0.65" opacity="0.7" />
    <path d="M 40,82 L 40,68 Q 45,63 50,68 L 50,82" fill="none" stroke={GOLD} strokeWidth="0.65" opacity="0.7" />
    {/* Right pair */}
    <path d="M 80,82 L 80,68 Q 85,63 90,68 L 90,82" fill="none" stroke={GOLD} strokeWidth="0.65" opacity="0.7" />
    <path d="M 92,82 L 92,68 Q 97,63 102,68 L 102,82" fill="none" stroke={GOLD} strokeWidth="0.65" opacity="0.7" />

    {/* ══════ DECORATIVE DETAILS ══════ */}
    {/* Arched frieze band */}
    <path d="M 24,56 Q 29,52 34,56 Q 39,52 44,56 Q 49,52 54,56 Q 59,52 64,56 Q 69,52 74,56 Q 79,52 84,56 Q 89,52 94,56 Q 99,52 104,56 Q 109,52 106,56"
      fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.4" />
    {/* Star rosettes above door */}
    <g transform="translate(65,64)" opacity="0.5">
      {[0,60,120,180,240,300].map(a => (
        <path key={a} transform={`rotate(${a})`}
          d="M 0,0 C 1,-1.5 1,-4 0,-5.5 C -1,-4 -1,-1.5 0,0 Z"
          fill={GOLD} />
      ))}
      <circle cx="0" cy="0" r="1.2" fill={GOLD_LIGHT} />
    </g>
  </svg>
);

export default MosqueIcon;
