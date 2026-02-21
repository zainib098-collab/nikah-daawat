import { GOLD, GOLD_LIGHT } from "../constants";

const OrnamentalDivider = ({ width = 300, color = GOLD }) => (
  <svg width={width} height="30" viewBox={`0 0 ${width} 30`} style={{ overflow: "visible", maxWidth: "100%", display: "block", margin: "0 auto" }}>
    <defs>
      <linearGradient id="divGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor={color} stopOpacity="0" />
        <stop offset="30%" stopColor={color} stopOpacity="1" />
        <stop offset="50%" stopColor={GOLD_LIGHT} stopOpacity="1" />
        <stop offset="70%" stopColor={color} stopOpacity="1" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </linearGradient>
    </defs>
    <line x1="0" y1="15" x2={width} y2="15" stroke="url(#divGrad)" strokeWidth="1" />
    <circle cx={width / 2} cy="15" r="4" fill={color} />
    <circle cx={width / 2 - 20} cy="15" r="2" fill={color} opacity="0.6" />
    <circle cx={width / 2 + 20} cy="15" r="2" fill={color} opacity="0.6" />
    <path
      d={`M${width / 2 - 35} 15 Q${width / 2 - 25} 5 ${width / 2 - 15} 15`}
      fill="none"
      stroke={color}
      strokeWidth="1"
      opacity="0.5"
    />
    <path
      d={`M${width / 2 + 15} 15 Q${width / 2 + 25} 5 ${width / 2 + 35} 15`}
      fill="none"
      stroke={color}
      strokeWidth="1"
      opacity="0.5"
    />
  </svg>
);

export default OrnamentalDivider;
