import { useEffect, useState } from "react";

const BAR_HEIGHTS = [38, 72, 52, 88, 70, 44];

function LoadingScreen({ onDone }) {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const hideTimer = setTimeout(() => setHiding(true), 2200);
    const doneTimer = setTimeout(() => onDone?.(), 2700);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      className={`crt-screen fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        hiding ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-busy="true"
      aria-live="polite"
    >
      <div className="relative z-20 flex flex-col items-center justify-center">
        <div className="eq-bars" aria-hidden>
          {BAR_HEIGHTS.map((height, index) => (
            <span
              key={index}
              className="eq-bar"
              style={{
                height: `${height}px`,
                animationDelay: `${index * 0.12}s`,
              }}
            />
          ))}
        </div>
        <p className="eq-text">LOADING</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
