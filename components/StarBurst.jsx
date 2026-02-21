import { GOLD, GOLD_LIGHT } from "../constants";

const StarBurst = ({ cx, cy, r, delay }) => (
  <g style={{ animation: `twinkle 3s ease-in-out ${delay}s infinite` }}>
    <circle cx={cx} cy={cy} r={r} fill={GOLD} opacity="0.6" />
    <circle cx={cx} cy={cy} r={r * 0.5} fill={GOLD_LIGHT} opacity="0.9" />
  </g>
);

export default StarBurst;
