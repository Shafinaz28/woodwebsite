import { Link } from "react-router";
import {
  Leaf,
  Hammer,
  Gem,
  Shield,
  Headphones,
} from "lucide-react";

const reasons = [
  {
    icon: Leaf,
    title: "Premium Materials",
    text: "Seasoned solid wood chosen for grain, strength and lasting beauty.",
  },
  {
    icon: Hammer,
    title: "Expert Craftsmanship",
    text: "Hand-fitted joints and careful finishing by skilled artisans.",
  },
  {
    icon: Gem,
    title: "Timeless Design",
    text: "Quiet forms made for Indian homes — not trends that fade.",
  },
  {
    icon: Shield,
    title: "Built to Last",
    text: "Furniture meant to age with you and stay part of the house.",
  },
  {
    icon: Headphones,
    title: "Personal Support",
    text: "Help choosing the right piece for your space, every step.",
  },
];

const teamCaptions = [
  "Design. Craft. Deliver.",
  "Finished with care.",
  "Made for living.",
];

function About() {
    return (
    <div className="bg-[#f5f3f0] text-[#2b1d0e]">
      {/* Hero — centered text over full background image */}
      <section className="relative min-h-[380px] md:min-h-[420px] lg:min-h-[460px] overflow-hidden bg-[#2d1f16]">
        <img
          src="/images/about/hero-dining.avif"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#2d1f16]/70" />
        <div className="relative z-10 flex min-h-[380px] md:min-h-[420px] lg:min-h-[460px] items-center justify-center px-6 sm:px-10 py-12 md:py-14">
          <div className="max-w-2xl text-center text-white">
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/80 mb-4">
              About Us
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-[1.12] text-white">
              Crafted with Passion.
              <br />
              Made for Life.
            </h1>
            <p className="mt-4 text-sm sm:text-[15px] leading-7 text-white/90 mx-auto max-w-lg">
              At Arileon, we believe furniture is more than decor — it&apos;s part
              of your story. Our pieces are rooted in timeless design, honest
              timber, and exceptional craftsmanship.
            </p>
            <a
              href="#our-story"
              className="inline-flex mt-7 px-8 py-3.5 bg-[#434f23] text-white text-[11px] uppercase tracking-[0.18em] font-bold hover:bg-[#363f1c] transition"
            >
              Our Story
            </a>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="our-story" className="bg-[#f5f3f0]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Story collage */}
            <div className="overflow-hidden bg-[#ebe4da] h-[420px] sm:h-[480px] lg:h-[520px]">
              <img
                src="/images/about/story-collage.avif"
                alt="Handcrafting wood, precise joinery, and finished Arileon furniture"
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="text-left max-w-lg lg:max-w-none lg:pl-2">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#6B4423] mb-4">
          Our Story
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-[1.15]">
                From a Small Workshop to Homes You Love
              </h2>
              <p className="mt-6 text-sm md:text-[15px] text-[#3a2a1c]/80 leading-7">
                Arileon began with a simple idea: furniture should feel like
                wood, not like a photograph of wood. We work with seasoned
                timber, skilled joiners and finishes that let the grain stay
                visible.
              </p>
              <p className="mt-4 text-sm md:text-[15px] text-[#3a2a1c]/80 leading-7">
                Every bed, dining set and living piece is made for daily life —
                meals, guests, quiet evenings — and to look better as the years
                add their own mark.
              </p>
              <p className="mt-8 font-display text-2xl italic text-[#6B4423]">
                — Arileon Team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us — centered header, equal columns */}
      <section className="bg-white border-y border-[#eadfd3]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#6B4423] mb-3">
              Why Choose Us
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold">
              Built on Quality. Driven by Values.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6">
            {reasons.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                data-gsap-item
                className="flex flex-col items-center text-center px-2"
              >
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center text-[#6B4423]">
                  <Icon size={26} strokeWidth={1.35} />
                </span>
                <h3 className="font-display text-base md:text-lg font-semibold text-[#2b1d0e]">
                  {title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-[#3a2a1c]/70 max-w-[180px]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship — equal height split */}
      <section className="grid lg:grid-cols-2 min-h-[520px]">
        <div className="bg-[#efe9e0] flex items-center">
          <div className="w-full max-w-xl px-8 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-20 text-left">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#6B4423] mb-4">
              Craftsmanship
            </p>
            <h2 className="font-display text-3xl md:text-4xl xl:text-[2.75rem] font-semibold leading-[1.12]">
              Made with Heart.
              <br />
              Finished with Pride.
            </h2>
            <p className="mt-6 text-sm md:text-[15px] text-[#3a2a1c]/80 leading-7 max-w-md">
              From selecting timber to the final oil, each piece passes through
              careful hands. Mortise, tenon and honest sanding — not shortcuts —
              so the furniture you bring home stays true for years.
            </p>
            <Link
              to="/shop"
              className="inline-flex mt-9 px-8 py-3.5 bg-[#5d3a26] text-white text-[11px] uppercase tracking-[0.18em] font-bold hover:bg-[#4b2c20] transition"
            >
              Shop Our Collection
            </Link>
          </div>
        </div>
        <div className="relative min-h-[360px] lg:min-h-full overflow-hidden">
          <img
            src="/images/about/craftsmanship.avif"
            alt="Hands carving solid wood with a chisel"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
      </section>

      {/* Sustainability — single aligned row */}
      <section className="bg-[#ebe4da] border-y border-[#eadfd3]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-8 md:py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-[#6B4423]">
                <Leaf size={22} strokeWidth={1.5} />
              </span>
              <div className="min-w-0 text-left">
                <h2 className="font-display text-xl sm:text-2xl md:text-[1.65rem] font-semibold leading-snug">
                  Better for Your Home. Better for Our Planet.
                </h2>
                <p className="mt-1 text-sm text-[#3a2a1c]/70 leading-6">
                  Durable solid wood and finishes that age gracefully — pieces
                  you keep, not replace.
                </p>
              </div>
            </div>
            <Link
              to="/shop"
              className="shrink-0 self-start md:self-center inline-flex items-center justify-center px-7 py-3 border border-[#2b1d0e] text-[#2b1d0e] text-[11px] uppercase tracking-[0.18em] font-bold hover:bg-[#2b1d0e] hover:text-white transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Meet the team — text + craft collage */}
      <section className="bg-white">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-24">
          <div className="grid lg:grid-cols-4 gap-10 lg:gap-8 items-start">
            <div className="text-left lg:pr-4">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#6B4423] mb-4">
                Meet the Team
              </p>
              <h2 className="font-display text-3xl md:text-[2.1rem] font-semibold leading-[1.15]">
                The People Behind Arileon
              </h2>
              <p className="mt-5 text-sm text-[#3a2a1c]/80 leading-7">
                Designers, joiners and finishers working together so every piece
                feels intentional — from first sketch to delivery.
              </p>
              <Link
                to="/contact"
                className="inline-flex mt-8 px-7 py-3.5 bg-[#5d3a26] text-white text-[11px] uppercase tracking-[0.18em] font-bold hover:bg-[#4b2c20] transition"
              >
                Join Us
              </Link>
            </div>

            <div className="lg:col-span-3">
              <div className="overflow-hidden bg-[#f5f3f0]">
                <img
                  src="/images/about/team-collage.avif"
                  alt="Crafting, finishing, and living with Arileon furniture"
                  className="w-full h-auto object-cover object-center"
                />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {teamCaptions.map((caption) => (
                  <p
                    key={caption}
                    className="text-center text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#6B4423]"
                  >
                    {caption}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
