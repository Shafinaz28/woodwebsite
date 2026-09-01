import { Link } from "react-router";

function Craftsmanship() {
  return (
    <section className="bg-[#F2F0E9] pl-6 sm:pl-10 lg:pl-16">
      <div className="grid lg:grid-cols-2 lg:min-h-[560px]">
        <div className="min-h-[420px] overflow-hidden lg:min-h-[560px]">
          <img
            src="/images/story/craftsmanship.avif"
            alt="Handmade craft and materials"
            className="h-full min-h-[420px] w-full object-cover lg:min-h-[560px]"
          />
        </div>

        <div className="flex items-center px-6 py-12 sm:px-10 md:px-12 lg:pl-10 lg:pr-12">
          <div className="max-w-lg">
            <p className="mb-6 text-[11px] uppercase tracking-[0.28em] text-wood-soft">
              Our Story <span className="ml-1 opacity-50">&gt;</span>
            </p>

            <h2 className="font-display text-3xl font-semibold leading-[1.12] text-wood-deep md:text-4xl xl:text-5xl">
              Made with intention.
              <br />
              Built to last.
            </h2>

            <p className="mt-6 text-sm leading-7 text-wood-muted md:text-[15px]">
              Every piece begins with thoughtful design and carefully selected
              materials. Our furniture brings together skilled craftsmanship,
              natural textures and timeless forms for spaces that feel truly
              personal.
            </p>

            <Link
              to="/about"
              className="mt-8 inline-block border-b border-wood-deep pb-1 text-[11px] uppercase tracking-[0.22em] text-wood-deep transition hover:opacity-70"
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
