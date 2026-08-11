import { Link } from "react-router";

function Hero() {
  return (
    <section className="relative h-[85vh] md:h-[92vh] min-h-[600px] overflow-hidden bg-[#1a1510]">

      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover scale-105 animate-[hero-zoom_28s_ease-in-out_infinite_alternate]"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero/hero-1.jpg"
      >
        <source src="/videos/hero-wood.mp4" type="video/mp4" />
      </video>

      {/* Fallback / atmosphere image layer (shows if video fails) */}
      <img
        src="/images/hero/hero-1.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      {/* Warm wood-toned overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/25" />
      <div className="absolute inset-0 bg-[#3b2a1a]/20 mix-blend-multiply" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-[1500px] mx-auto px-6 md:px-10 flex items-end">

        <div className="pb-16 md:pb-24 max-w-3xl text-white animate-[hero-rise_1.1s_ease-out_both]">

          <p className="text-xs md:text-sm uppercase tracking-[0.35em] mb-5 text-white/80">
            Arileon
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] text-white">
            Crafted for spaces that feel like home.
          </h1>

          <p className="mt-6 max-w-xl text-sm md:text-base leading-7 text-white/85">
            Discover thoughtfully designed furniture combining natural
            materials, craftsmanship and modern living.
          </p>

          <Link
            to="/shop"
            className="
              inline-block
              mt-8
              bg-white
              text-black
              px-7
              py-4
              text-xs
              uppercase
              tracking-[0.18em]
              hover:bg-[#2c2118]
              hover:text-white
              transition
              duration-300
            "
          >
            Explore Collection
          </Link>

        </div>

      </div>

    </section>
  );
}

export default Hero;
