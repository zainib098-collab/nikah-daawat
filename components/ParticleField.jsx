import { GOLD, GOLD_LIGHT } from "../constants";

// Deterministic seeded values — no re-render randomness
const d = (i, mod) => ((i * 6271 + 17) % mod);

const TOTAL = 32;

const ParticleField = () => {
  const particles = Array.from({ length: TOTAL }, (_, i) => ({
    id: i,
    left:     d(i * 3, 100),
    top:      d(i * 7, 100),
    size:     1 + d(i * 11, 4),         // 1 – 4 px
    delay:    d(i * 5, 60) / 10,        // 0 – 6 s
    duration: 4 + d(i * 9, 50) / 10,   // 4 – 9 s
    type:     i % 3,                    // 0=circle, 1=4-star, 2=diamond
    color:    i % 6 === 0 ? GOLD_LIGHT : GOLD,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {particles.map(p => {
        const s = p.size;
        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.left}%`,
              top: `${p.top}%`,
              opacity: 0,
              animation: `particleGlow ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          >
            {p.type === 0 && (
              // Circle
              <div style={{ width: `${s}px`, height: `${s}px`, borderRadius: "50%", background: p.color }} />
            )}
            {p.type === 1 && (
              // 4-pointed star
              <svg width={s * 3} height={s * 3} viewBox="-6 -6 12 12" overflow="visible">
                <path d="M 0,-5 L 1.2,-1.2 L 5,0 L 1.2,1.2 L 0,5 L -1.2,1.2 L -5,0 L -1.2,-1.2 Z"
                  fill={p.color} />
              </svg>
            )}
            {p.type === 2 && (
              // Tiny diamond
              <svg width={s * 2.5} height={s * 2.5} viewBox="-4 -4 8 8" overflow="visible">
                <polygon points="0,-4 3,0 0,4 -3,0" fill={p.color} />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ParticleField;
