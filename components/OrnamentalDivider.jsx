import { GOLD, GOLD_LIGHT } from "../constants";

/* Each instance uses its own gradient ID derived from width to avoid SVG ID conflicts */
const OrnamentalDivider = ({ width = 300, color = GOLD }) => {
  const gid = `dg${width}`;
  const cx  = width / 2;

  return (
    <svg
      width={width} height="30" viewBox={`0 0 ${width} 30`}
      style={{ overflow:"visible", maxWidth:"100%", display:"block", margin:"0 auto" }}
    >
      <defs>
        <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={color}      stopOpacity="0" />
          <stop offset="30%"  stopColor={color}      stopOpacity="1" />
          <stop offset="50%"  stopColor={GOLD_LIGHT} stopOpacity="1" />
          <stop offset="70%"  stopColor={color}      stopOpacity="1" />
          <stop offset="100%" stopColor={color}      stopOpacity="0" />
        </linearGradient>
      </defs>

      <line x1="0" y1="15" x2={width} y2="15" stroke={`url(#${gid})`} strokeWidth="1" />
      <circle cx={cx}      cy="15" r="4" fill={color} />
      <circle cx={cx - 20} cy="15" r="2" fill={color} opacity="0.6" />
      <circle cx={cx + 20} cy="15" r="2" fill={color} opacity="0.6" />

      <path d={`M${cx-35} 15 Q${cx-25} 5 ${cx-15} 15`}
        fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d={`M${cx+15} 15 Q${cx+25} 5 ${cx+35} 15`}
        fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
};

export default OrnamentalDivider;
