import { GOLD } from "../constants";

const IslamicPattern = ({ x, y, size, delay, rotation }) => (
  <g
    transform={`translate(${x}, ${y}) rotate(${rotation})`}
    style={{ animation: `floatIn 2s ease-out ${delay}s both, gentleFloat 6s ease-in-out ${delay}s infinite` }}
    opacity="0.15"
  >
    <polygon
      points={`0,${-size} ${size * 0.29},${-size * 0.4} ${size * 0.95},${-size * 0.31} ${size * 0.47},${size * 0.15} ${size * 0.59},${size * 0.81} 0,${size * 0.5} ${-size * 0.59},${size * 0.81} ${-size * 0.47},${size * 0.15} ${-size * 0.95},${-size * 0.31} ${-size * 0.29},${-size * 0.4}`}
      fill="none"
      stroke={GOLD}
      strokeWidth="1"
    />
    <circle cx="0" cy="0" r={size * 0.25} fill="none" stroke={GOLD} strokeWidth="0.5" />
  </g>
);

export default IslamicPattern;
