import { Link } from "react-router";

const stats = [
  { value: "12+", label: "Years of Craft" },
  { value: "40+", label: "Skilled Artisans" },
  { value: "100%", label: "Solid Wood" },
  { value: "6", label: "Room Collections" },
];

const steps = [
  {
    no: "01",
    title: "Select the timber",
    text: "We source seasoned sheesham, teak and oak, checking grain, moisture and strength before a piece is even drawn.",
  },
  {
    no: "02",
    title: "Shape by hand",
    text: "Joints are cut, fitted and finished by artisans — mortise, tenon and careful sanding, not shortcuts.",
  },
  {
    no: "03",
    title: "Finish for life",
    text: "Natural oils and stains protect the wood so colour deepens with years of use, not peels after a season.",
  },
];

const values = [
  {
    title: "Honest materials",
    text: "Solid wood you can see and feel. No veneer pretending to be timber, no finish that hides the grain.",
  },
  {
    title: "Timeless form",
    text: "Quiet proportions made for Indian homes — rooms you live in every day, not a showroom for one season.",
  },
  {
    title: "Built to stay",
    text: "Furniture meant to move with you, age with you, and remain part of the house for a generation.",
  },
];

function About() {
  return (
    <div className="bg-background">
      <section className="relative min-h-[520px] md:min-h-[620px] overflow-hidden bg-[#1a120c]">
        <img
          src="/images/products/living-room/living8.png"
          alt="Arileon living room furniture"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />

        <div className="relative z-10 max-w-[1500px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 min-h-[520px] md:min-h-[620px] flex items-center">
          <div className="max-w-xl pl-4 sm:pl-8">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/90 mb-4">
              Our Story
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.12] text-white">
              <span className="block">Authentic Wood.</span>
              <span className="block text-white/90">A Story of Craft.</span>
            </h1>
            <p className="mt-5 text-sm md:text-base text-white/90 leading-7 max-w-md">
              We design and make solid wood furniture in India — for homes that
              want warmth, strength and pieces that feel true to the timber they
              came from.
            </p>
            <Link
              to="/shop"
              className="inline-flex mt-7 px-7 py-3 rounded-[4px] text-white text-[11px] uppercase tracking-[0.18em] font-bold hover:opacity-90 transition"
              style={{ backgroundColor: "#454B1B" }}
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f9f7f2] border-b border-[#eadfd3]">
        <div className="max-w-[1500px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((item, index) => (
              <div
                key={item.label}
                className={`px-5 py-7 text-center border-[#eadfd3] ${
                  index !== stats.length - 1 ? "lg:border-r" : ""
                } ${index % 2 === 0 ? "border-r lg:border-r" : ""} ${
                  index < 2 ? "border-b lg:border-b-0" : ""
                }`}
              >
                <p className="font-display text-3xl md:text-4xl font-bold text-[#2b1d0e]">
                  {item.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#704214]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1500px] mx-auto px-5 md:px-10 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#704214] mb-4">
              Our story
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-[#2b1d0e] leading-[1.15]">
              From timber yard to your home.
            </h2>
            <p className="mt-5 text-sm md:text-base text-black leading-7">
              Arileon started with a simple idea: furniture should feel like
              wood, not like a photograph of wood. We work with seasoned timber,
              skilled joiners and finishes that let the grain stay visible.
            </p>
            <p className="mt-4 text-sm md:text-base text-black leading-7">
              Every sofa frame, dining table and bed is made to be used daily —
              meals, guests, quiet evenings — and to look better as the years
              add their own mark.
            </p>
          </div>
          <div className="relative min-h-[320px] md:min-h-[420px] overflow-hidden rounded-md">
            <img
              src="/images/story/craftsmanship.jpg"
              alt="Artisan crafting solid wood furniture"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#f9f7f2] border-y border-[#eadfd3]">
        <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-12 md:py-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#704214] mb-3">
              How we work
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2b1d0e]">
              Craft you can trust
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step) => (
              <article
                key={step.no}
                className="bg-white border border-[#eadfd3] px-6 py-8"
              >
                <p className="font-display text-2xl font-bold text-[#704214]">
                  {step.no}
                </p>
                <h3 className="font-display mt-3 text-xl font-bold text-[#2b1d0e]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-black leading-7">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-[340px] lg:min-h-[520px]">
          <img
            src="/images/products/dining/dining8.png"
            alt="Solid wood dining collection"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center bg-[#efe9e0] px-8 sm:px-12 md:px-16 py-14">
          <div className="max-w-md">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#704214] mb-4">
              Our promise
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2b1d0e] leading-tight">
              Made with intention.
              <br />
              Built to last.
            </h2>
            <p className="mt-5 text-sm md:text-base text-black leading-7">
              We furnish living rooms, dining spaces, bedrooms and work corners
              with the same standard: solid construction, calm design, and wood
              that still looks honest after years of family life.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-[1500px] mx-auto px-5 md:px-10 py-12 md:py-16">
        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#704214] mb-3">
            What we stand for
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2b1d0e]">
            Three promises in every piece
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((item, index) => (
            <div
              key={item.title}
              className="border border-[#eadfd3] bg-[#f9f7f2] px-6 py-8"
            >
              <p className="text-[11px] tracking-[0.2em] text-[#704214] mb-3">
                0{index + 1}
              </p>
              <h3 className="font-display text-2xl font-bold text-[#2b1d0e] mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-black leading-7">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f9f7f2] border-t border-[#eadfd3]">
        <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-12 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-lg">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2b1d0e] leading-tight">
              Ready to furnish a home that feels authentic?
            </h2>
            <p className="mt-4 text-sm text-black leading-7">
              Browse collections for every room, or write to us — we will help
              you choose pieces that belong in your space.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-[#5d3a26] text-white text-[11px] uppercase tracking-[0.18em] font-bold hover:bg-[#4b2c20] transition"
            >
              Shop Furniture
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-[#2b1d0e] text-[#2b1d0e] text-[11px] uppercase tracking-[0.18em] font-bold hover:bg-[#2b1d0e] hover:text-white transition"
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
