import { Link } from "react-router";
import { Play } from "lucide-react";

function LifestyleBanner() {
  return (
    <section className="relative min-h-[420px] sm:min-h-[520px] md:min-h-[620px] overflow-hidden bg-[#1a1510]">

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
        poster="/images/story/craftsmanship.avif"
      >
        <source src="/videos/products-living.mp4" type="video/mp4" />
      </video>

      <img
        src="/images/story/craftsmanship.avif"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 min-h-[420px] sm:min-h-[520px] md:min-h-[620px] flex flex-col items-center justify-center px-5 text-center text-white">
        <p className="text-xs uppercase tracking-[0.3em] mb-4 text-white/90">
          Our Products
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.15] text-white max-w-3xl">
          Watch Products Designed For Modern Living
        </h2>

        <Link
          to="/shop"
          className="
            mt-10
            w-20
            h-20
            rounded-full
            border
            border-dashed
            border-white/80
            flex
            items-center
            justify-center
            hover:bg-white/10
            transition
          "
          aria-label="Watch products"
        >
          <Play size={28} fill="white" className="ml-1" />
        </Link>
      </div>
    </section>
  );
}

export default LifestyleBanner;
