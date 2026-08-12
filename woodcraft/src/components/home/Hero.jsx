import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

function Hero() {
  return (
    <section className="relative w-full h-[100svh] min-h-[560px] overflow-hidden bg-[#1a1510]">

      {/* Full-bleed video cover */}
      <video
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-full
          h-full
          min-w-full
          min-h-full
          object-cover
        "
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero/hero-1.jpg"
      >
        <source src="/videos/hero-wood.mp4?v=2" type="video/mp4" />
      </video>

      <img
        src="/images/hero/hero-1.jpg"
        alt=""
        aria-hidden="true"
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-full
          h-full
          min-w-full
          min-h-full
          object-cover
          -z-10
        "
      />

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/30" />

      <div className="relative z-10 h-full flex items-center justify-center px-5 sm:px-6">
        <div className="max-w-3xl text-center text-white animate-[hero-rise_1.1s_ease-out_both]">

          <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] mb-5 text-white/90">
            Collection — 2026
          </p>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] text-white">
            Crafted Furniture For Every Beautiful Home
          </h1>

          <Link
            to="/shop"
            className="
              inline-flex
              items-center
              gap-3
              mt-8
              sm:mt-10
              rounded-full
              bg-[#b58e58]
              text-white
              pl-7
              pr-2
              py-2
              text-xs
              uppercase
              tracking-[0.18em]
              hover:bg-[#9a7548]
              transition
              duration-300
            "
          >
            Shop Now
            <span className="w-10 h-10 rounded-full bg-white text-[#2c2118] flex items-center justify-center">
              <ArrowRight size={16} />
            </span>
          </Link>

        </div>
      </div>

    </section>
  );
}

export default Hero;
