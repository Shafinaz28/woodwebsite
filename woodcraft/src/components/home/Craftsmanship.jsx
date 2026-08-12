import { Link } from "react-router";

function Craftsmanship() {
  return (
    <section className="bg-[#F2F0E9]">
      <div className="grid lg:grid-cols-2 min-h-[520px] lg:min-h-[640px]">

        {/* Left — full-bleed image */}
        <div className="relative min-h-[320px] sm:min-h-[400px] lg:min-h-full overflow-hidden">
          <img
            src="/images/story/craftsmanship.jpg"
            alt="Handmade craft and materials"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right — editorial copy */}
        <div className="flex items-center px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 py-16 lg:py-20">
          <div className="max-w-md">
            <p className="text-[11px] uppercase tracking-[0.28em] text-wood-soft mb-6">
              Our Story <span className="ml-1 opacity-50">&gt;</span>
            </p>

            <h2 className="font-display text-3xl md:text-4xl xl:text-5xl font-semibold leading-[1.12] text-wood-deep">
              Made with intention.
              <br />
              Built to last.
            </h2>

            <p className="mt-7 text-sm md:text-[15px] text-wood-muted leading-7">
              Every piece begins with thoughtful design and carefully selected
              materials. Our furniture brings together skilled craftsmanship,
              natural textures and timeless forms for spaces that feel truly
              personal.
            </p>

            <Link
              to="/about"
              className="inline-block mt-10 text-[11px] uppercase tracking-[0.22em] text-wood-deep border-b border-wood-deep pb-1 hover:opacity-70 transition"
            >
              Discover Who We Are
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Craftsmanship;
