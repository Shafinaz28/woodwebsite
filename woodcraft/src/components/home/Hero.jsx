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

        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/55 via-black/25 to-transparent pointer-events-none" />

        <div className="absolute inset-0 z-20 flex items-center">
          <div className="w-full max-w-[1500px] mx-auto px-14 sm:pl-24 sm:pr-8 md:pl-32 md:pr-12 lg:pl-40 lg:pr-16">
            <div
              key={index}
              className="max-w-lg animate-[hero-rise_0.7s_ease-out_both]"
            >
              <h1
                className="font-display text-[1.65rem] sm:text-4xl md:text-5xl font-semibold leading-[1.15]"
                style={{ color: "#ffffff" }}
              >
                {slide.title.split("\n").map((line) => (
                  <span key={line} className="block" style={{ color: "#ffffff" }}>
                    {line}
                  </span>
                ))}
              </h1>
              <p
                className="mt-3 sm:mt-4 text-sm leading-6 sm:leading-7 max-w-md line-clamp-3 sm:line-clamp-none"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                {slide.text}
              </p>
              <Link
                to="/shop"
                className="inline-flex mt-5 sm:mt-6 px-6 sm:px-7 py-3 rounded-[4px] text-white text-[11px] uppercase tracking-[0.18em] font-semibold hover:opacity-90 transition"
                style={{ backgroundColor: "#454B1B" }}
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
          className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/55 transition"
        >
          <ChevronLeft size={18} strokeWidth={1.75} />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next slide"
          className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/55 transition"
        >
          <ChevronRight size={18} strokeWidth={1.75} />
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
