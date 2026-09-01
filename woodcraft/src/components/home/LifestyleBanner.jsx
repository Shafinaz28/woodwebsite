import { Link } from "react-router";
import { Play } from "lucide-react";

function LifestyleBanner() {
  return (
    <section className="relative min-h-[480px] overflow-hidden bg-[#1a1510] sm:min-h-[580px] md:min-h-[720px]">

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

      <div className="relative z-10 flex min-h-[480px] flex-col items-center justify-center px-6 py-20 text-center text-white sm:min-h-[580px] sm:px-10 sm:py-24 md:min-h-[720px] md:py-28">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-white/90">
          Our Products
        </p>
        <h2 className="font-display max-w-3xl text-3xl font-medium leading-[1.2] text-white sm:text-4xl md:text-5xl lg:text-6xl">
          Watch Products Designed For Modern Living
        </h2>

        <Link
          to="/shop"
          className="
            mt-16
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
