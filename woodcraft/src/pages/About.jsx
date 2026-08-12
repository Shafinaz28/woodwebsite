import { Link } from "react-router";

function About() {
  const values = [
    {
      title: "Materials first",
      text: "We choose solid woods and honest finishes that age with character, not shortcuts that fade in a season.",
    },
    {
      title: "Quiet design",
      text: "Forms stay timeless — warm, proportioned, and calm enough to live with for years, not just a trend cycle.",
    },
    {
      title: "Made to last",
      text: "Joinery, comfort, and finishing are considered together so every piece feels considered in daily use.",
    },
  ];

  return (
    <div className="bg-[#F7F3EC]">

      {/* Hero */}
      <section className="relative min-h-[70vh] md:min-h-[78vh] overflow-hidden bg-[#1a1510]">
        <img
          src="/images/products/dining/dining1.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-[hero-zoom_30s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/25" />

        <div className="relative z-10 max-w-[1500px] mx-auto px-5 md:px-10 min-h-[70vh] md:min-h-[78vh] flex items-end pb-14 md:pb-20">
          <div className="max-w-xl text-white animate-[hero-rise_1s_ease-out]">
            <p className="font-display text-3xl md:text-4xl font-medium tracking-wide text-white mb-4">
              Arileon
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.08] text-white">
              Furniture shaped by patience and place.
            </h1>
            <p className="mt-5 text-sm md:text-base text-white/80 leading-7 max-w-md">
              Our story is simple: design with intention, craft with care, and
              furnish homes that feel quietly personal.
            </p>
            <Link
              to="/shop"
              className="inline-flex mt-8 text-[11px] uppercase tracking-[0.22em] text-white border-b border-white/80 pb-1 hover:opacity-80 transition"
            >
              Explore the Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Origin */}
      <section className="max-w-[900px] mx-auto px-5 md:px-10 py-16 md:py-24 text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-wood-soft mb-5">
          Who we are
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-medium text-wood-deep leading-[1.15]">
          Built for modern homes that still want warmth.
        </h2>
        <p className="mt-7 text-sm md:text-base text-wood-muted leading-8">
          Arileon began with a belief that furniture should feel grounded —
          natural materials, considered proportions, and finishes that invite
          touch. We design pieces for living rooms, dining spaces, bedrooms,
          and work corners that need calm rather than clutter.
        </p>
      </section>

      {/* Split — intention */}
      <section className="bg-[#EFE9E0]">
        <div className="grid lg:grid-cols-2 min-h-[520px] lg:min-h-[620px]">
          <div className="relative min-h-[320px] lg:min-h-full overflow-hidden">
            <img
              src="/images/products/living-room/living5.png"
              alt="Living room furniture by Arileon"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center px-8 sm:px-12 md:px-16 lg:px-20 py-16 lg:py-20">
            <div className="max-w-md">
              <p className="text-[11px] uppercase tracking-[0.28em] text-wood-soft mb-6">
                Our craft
              </p>
              <h2 className="font-display text-3xl md:text-4xl xl:text-5xl font-semibold leading-[1.12] text-wood-deep">
                Made with intention.
                <br />
                Built to last.
              </h2>
              <p className="mt-7 text-sm md:text-[15px] text-wood-muted leading-7">
                Every piece starts with thoughtful design and carefully chosen
                materials. Skilled craftsmanship, natural textures, and
                timeless forms come together for spaces that feel truly yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-[1500px] mx-auto px-5 md:px-10 py-16 md:py-24">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="text-[11px] uppercase tracking-[0.28em] text-wood-soft mb-4">
            What guides us
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-wood-deep">
            Three promises in every piece.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-12 border-t border-wood-deep/10 pt-10">
          {values.map((item, i) => (
            <div key={item.title}>
              <p className="text-[11px] tracking-[0.2em] text-wood-soft mb-3">
                0{i + 1}
              </p>
              <h3 className="font-display text-2xl font-medium text-wood-deep mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-wood-muted leading-7">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-wood-deep/10">
        <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-16 md:py-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-lg">
            <h2 className="font-display text-3xl md:text-4xl font-medium text-wood-deep leading-tight">
              Ready to furnish a space that feels like home?
            </h2>
            <p className="mt-4 text-sm text-wood-muted leading-7">
              Browse collections for every room, or reach out — we&apos;re happy
              to help you find the right pieces.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-wood-deep text-white text-[11px] uppercase tracking-[0.2em] hover:bg-wood transition"
            >
              Shop Furniture
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-wood-deep/25 text-wood-deep text-[11px] uppercase tracking-[0.2em] hover:border-wood-deep transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;
