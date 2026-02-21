import { useState, useEffect } from "react";
import { GOLD, GOLD_LIGHT } from "../constants";

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const calculate = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };
    setTimeLeft(calculate());
    const timer = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
      {units.map((unit, i) => (
        <div
          key={unit.label}
          style={{
            textAlign: "center",
            animation: `fadeSlideUp 0.8s ease-out ${1.8 + i * 0.15}s both`,
          }}
        >
          <div
            className="countdown-circle"
            style={{
              width: "68px",
              height: "68px",
              borderRadius: "50%",
              border: `1.5px solid ${GOLD}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `radial-gradient(circle, ${GOLD}08, transparent)`,
              backdropFilter: "blur(4px)",
            }}
          >
            <span
              className="countdown-value"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "22px",
                color: GOLD,
                fontWeight: "700",
              }}
            >
              {String(unit.value || 0).padStart(2, "0")}
            </span>
          </div>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "11px",
              color: GOLD_LIGHT,
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginTop: "6px",
              display: "block",
            }}
          >
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
