import { Star } from "lucide-react";

function Testimonials() {
  return (
    <section className="bg-[#F9F6F1] overflow-hidden">
      <div className="max-w-[1500px] mx-auto grid lg:grid-cols-2 items-center gap-10 lg:gap-6 px-5 md:px-10 lg:px-16 py-16 md:py-24">

        {/* Left — furniture image */}
        <div className="relative w-full min-h-[280px] sm:min-h-[360px] lg:min-h-[480px] overflow-hidden rounded-sm bg-[#EFE9E0]">
          <img
            src="/images/products/living-room/living5.png"
            alt="Living room furniture vignette"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right — review content */}
        <div className="relative flex flex-col justify-center max-w-xl lg:pl-8 xl:pl-14">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-black/15 bg-white/60 px-3.5 py-1.5 text-[11px] tracking-wide text-wood-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C4A484]" />
            Happy Customer
          </span>

          <h2 className="font-display mt-6 text-3xl md:text-4xl xl:text-[2.75rem] font-semibold leading-[1.15] text-wood-deep">
            Beautiful Furniture Trusted By Modern Families
          </h2>

          <div className="mt-5 flex items-center gap-1" aria-label="5 star rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={18}
                className="fill-[#C4A484] text-[#C4A484]"
                strokeWidth={0}
              />
            ))}
          </div>

          <p className="font-display mt-6 text-base md:text-lg leading-8 text-wood-muted italic">
            Premium craftsmanship, timeless designs, and outstanding customer
            service made this one of the best furniture purchases we&apos;ve ever
            made for our home interiors.
          </p>

          <div className="mt-8 border-t border-black/10 pt-6 flex items-center gap-4 relative">
            <div
              className="h-12 w-12 shrink-0 rounded-full bg-[#D4C4B0] text-wood-deep flex items-center justify-center text-sm font-semibold tracking-wide"
              aria-hidden
            >
              OB
            </div>
            <div>
              <p className="text-sm font-semibold text-wood-deep">Olivia Bennett</p>
              <p className="text-xs text-wood-soft mt-0.5">Homeowner</p>
            </div>

            <span
              aria-hidden
              className="pointer-events-none absolute right-0 -bottom-4 font-display text-[8rem] leading-none text-black/[0.07] select-none"
            >
              &ldquo;
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Testimonials;
