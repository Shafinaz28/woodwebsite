import { useEffect, useState } from "react";
import Logo from "./Logo";

function LoadingScreen({ onDone }) {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const hideTimer = setTimeout(() => setHiding(true), 1800);
    const doneTimer = setTimeout(() => onDone?.(), 2300);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ${
        hiding ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(ellipse at 50% 35%, #3d2a1c 0%, #1a120e 70%)",
      }}
      aria-busy="true"
      aria-live="polite"
    >
      {/* soft wood grain wash */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 3px, #c4a574 3px, #c4a574 4px)",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center px-6">
        <div className="animate-[loader-rise_0.6s_ease-out,loader-breathe_2.2s_ease-in-out_0.6s_infinite]">
          <Logo to={null} size="lg" invert />
        </div>

        <p className="mt-8 text-[10px] uppercase tracking-[0.28em] text-[#f0e6d8]/55 animate-[loader-fade-up_0.8s_ease-out_0.25s_both]">
          Crafting your space
        </p>

        {/* progress bar */}
        <div className="mt-8 h-[2px] w-40 overflow-hidden rounded-full bg-[#f0e6d8]/15 sm:w-48">
          <div
            className="h-full origin-left rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #6b4423, #c4a574, #434f23, #c4a574)",
              backgroundSize: "200% 100%",
              animation:
                "loader-bar 1.7s cubic-bezier(0.4, 0, 0.2, 1) forwards, loader-grain 1.4s linear infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
