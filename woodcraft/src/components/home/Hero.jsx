import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/images/products/living-room/living8.png",
    title: "Authentic Wood.\nTimeless Comfort.",
    text: "Crafted with passion, designed for life. Bring home the warmth of solid wood and timeless beauty.",
  },
  {
    image: "/images/products/living-room/living9.png",
    title: "Warm Interiors\nMade for Living.",
    text: "Living room collections in solid wood, shaped for comfort, gathering and everyday beauty.",
  },
  {
    image: "/images/products/dining/dining8.png",
    title: "Dining Built\nfor Connection.",
    text: "Tables and chairs made for long meals, shared stories and furniture that feels like home.",
  },
];

function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  function goPrev() {
    setIndex((current) => (current - 1 + slides.length) % slides.length);
  }

  function goNext() {
    setIndex((current) => (current + 1) % slides.length);
  }

  const slide = slides[index];

  return (
    <section className="relative w-full overflow-hidden bg-[#1a120c]">
      <div className="relative w-full h-[420px] sm:h-[480px] md:h-[560px] overflow-hidden">
        {slides.map((item, i) => (
          <img
            key={item.image}
            src={item.image}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== index}
          />
        ))}

        <div className="absolute inset-0 z-10 bg-gradient-to-r from-white/55 via-white/20 to-transparent pointer-events-none" />

        <div className="absolute inset-0 z-20 flex items-center">
          <div className="w-full max-w-[1500px] mx-auto pl-16 sm:pl-24 md:pl-32 lg:pl-40 pr-5 sm:pr-8 md:pr-12 lg:pr-16">
            <div
              key={index}
              className="max-w-lg animate-[hero-rise_0.7s_ease-out_both]"
            >
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.12]">
                {slide.title.split("\n").map((line, lineIndex) => (
                  <span
                    key={line}
                    className={`block ${
                      lineIndex === 0 ? "text-[#2b1d0e]" : "text-[#704214]"
                    }`}
                  >
                    {line}
                  </span>
                ))}
              </h1>
              <p className="mt-4 text-sm text-black leading-7 max-w-md">
                {slide.text}
              </p>
              <Link
                to="/shop"
                className="inline-flex mt-6 px-7 py-3 rounded-[4px] bg-[#5d3a26] text-white text-[11px] uppercase tracking-[0.18em] font-semibold hover:bg-[#4b2c20] transition"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/55 transition"
        >
          <ChevronLeft size={20} strokeWidth={1.75} />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next slide"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/55 transition"
        >
          <ChevronRight size={20} strokeWidth={1.75} />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition-all ${
                i === index ? "bg-white scale-110" : "bg-white/45"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
