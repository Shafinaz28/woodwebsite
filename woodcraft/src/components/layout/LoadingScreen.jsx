import { useEffect, useState } from "react";

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
      <div className="crt-scanlines" />
      <div className="crt-glow" />

      <div className="crt-content relative z-20 flex flex-col items-center justify-center text-center">
        <p className="crt-loading-text">loading...</p>

        <div className="crt-loader" aria-label="Loading">
          <div className="crt-loader-fill">
            <span className="crt-loader-shine" />
          </div>
        </div>
      </div>

      <div className="crt-shine" />
    </div>
  );
}

export default LoadingScreen;