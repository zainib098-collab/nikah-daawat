import { useMemo } from "react";
import { GOLD, GOLD_LIGHT } from "../constants";

// Deterministic values so they stay stable on re-renders
const det = (i, mod) => ((i * 7919 + 31) % mod);

const FallingPetals = () => {
  const petals = useMemo(() =>
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      x: det(i, 100),                        // 0-99 % across screen
      size: 0.45 + det(i * 3, 6) * 0.09,     // 0.45 – 0.90
      duration: 14 + det(i * 5, 10) * 2,     // 14 – 32 s
      delay: -(det(i * 7, 22)),               // already-in-flight start
      type: i % 3,                            // 0 = teardrop, 1 = 5-petal, 2 = 4-petal
      opacity: 0.22 + det(i * 2, 5) * 0.07,  // 0.22 – 0.50
      color: i % 5 === 0 ? GOLD_LIGHT : GOLD,
      swayDir: i % 2 === 0 ? 1 : -1,
    }))
  , []);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
      {petals.map(p => {
        const w = 24 * p.size;
        const h = 24 * p.size;
        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: 0,
              opacity: p.opacity,
              animation: `petalFall${p.swayDir > 0 ? "R" : "L"} ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          >
            <svg width={w} height={h} viewBox="-12 -22 24 26" fill={p.color}>
              {p.type === 0 && (
                // Elegant teardrop petal
                <path d="M 0,2 C 6,-4 8,-13 0,-20 C -8,-13 -6,-4 0,2 Z" />
              )}
              {p.type === 1 && (
                // 5-petal rose
                <>
                  {[0, 72, 144, 216, 288].map(a => (
                    <path key={a} transform={`rotate(${a})`}
                      d="M 0,1 C 3,-3 3,-9 0,-13 C -3,-9 -3,-3 0,1 Z" />
                  ))}
                  <circle cx="0" cy="0" r="2.5" fill={GOLD_LIGHT} opacity="0.9" />
                </>
              )}
              {p.type === 2 && (
                // 4-petal flower
                <>
                  {[0, 90, 180, 270].map(a => (
                    <path key={a} transform={`rotate(${a})`}
                      d="M 0,1 C 3,-3 3,-9 0,-13 C -3,-9 -3,-3 0,1 Z" />
                  ))}
                  <circle cx="0" cy="0" r="2" fill={GOLD_LIGHT} opacity="0.9" />
                </>
              )}
            </svg>
          </div>
        );
      })}
    </div>
  );
};

export default FallingPetals;
