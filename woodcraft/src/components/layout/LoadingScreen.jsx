import { useEffect, useState } from "react";
import Logo from "./Logo";

function LoadingScreen({ onDone }) {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const hideTimer = setTimeout(() => setHiding(true), 1600);
    const doneTimer = setTimeout(() => onDone?.(), 2100);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#2d1f16] transition-opacity duration-500 ${
        hiding ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-busy="true"
      aria-live="polite"
    >
      <Logo
        to={null}
        size="lg"
        invert
        className="animate-[loader-rise_0.7s_ease-out]"
      />
      <div className="mt-10 h-8 w-8 rounded-full border-2 border-[#f0e6d8]/25 border-t-[#434f23] animate-spin" />
      <p className="mt-5 text-[10px] uppercase tracking-[0.28em] text-white/50 animate-[loader-rise_0.7s_ease-out_0.2s_both]">
        Loading
      </p>
    </div>
  );
}

export default LoadingScreen;
