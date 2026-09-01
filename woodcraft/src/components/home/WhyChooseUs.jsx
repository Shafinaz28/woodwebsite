function TreeIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 28V16" />
      <path d="M12 28h8" />
      <path d="M16 16c-4.2-1.2-7-4.2-7-8.2C9 4.6 12.1 2 16 2s7 2.6 7 5.8c0 4-2.8 7-7 8.2Z" />
      <path d="M10.5 12.5c-2.2.4-4 2.2-4 4.6 0 2.4 1.8 4.2 4.2 4.6" />
      <path d="M21.5 12.5c2.2.4 4 2.2 4 4.6 0 2.4-1.8 4.2-4.2 4.6" />
    </svg>
  );
}

function ChairIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 4h10c1.7 0 3 1.3 3 3v9H9V4Z" />
      <path d="M8 16h16v3H8z" />
      <path d="M10 19v8" />
      <path d="M22 19v8" />
      <path d="M8 16v11" />
    </svg>
  );
}

function DraftingIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 4v24" />
      <path d="M5 8h4" />
      <path d="M5 12h4" />
      <path d="M5 16h4" />
      <path d="M5 20h4" />
      <path d="M5 24h4" />
      <path d="M18 26a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
      <path d="M18 10v8l6 3.5" />
    </svg>
  );
}

function CraftsmanIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 20c2-4 5-6 8-6" />
      <path d="M8 20c0 2 1.5 4 4 4h4" />
      <path d="M16 14v4" />
      <path d="M20 8l2.5 8h-5L20 8Z" />
      <path d="M17.5 16h5" />
      <path d="M20 16v6" />
    </svg>
  );
}

function HeadsetIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 16a9 9 0 0 1 18 0" />
      <path d="M7 16v6a2 2 0 0 0 2 2h1v-8H9a2 2 0 0 0-2 2Z" />
      <path d="M25 16v6a2 2 0 0 1-2 2h-1v-8h1a2 2 0 0 1 2 2Z" />
      <path d="M23 24v1a3 3 0 0 1-3 3h-4" />
    </svg>
  );
}

const reasons = [
  {
    icon: TreeIcon,
    title: "Premium Quality Wood",
    text: "We use only the best quality wood.",
  },
  {
    icon: ChairIcon,
    title: "Timeless Designs",
    text: "Elegant designs that never go out of style.",
  },
  {
    icon: DraftingIcon,
    title: "Custom Solutions",
    text: "Custom sizes and finishes available.",
  },
  {
    icon: CraftsmanIcon,
    title: "Skilled Craftsmen",
    text: "Crafted by experienced artisans.",
  },
  {
    icon: HeadsetIcon,
    title: "Customer Support",
    text: "We are here to help you always.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-5 md:px-10">
        <div className="border border-[#eadfd3] rounded-md overflow-hidden bg-[#f9f7f2]">
          <div className="flex items-center gap-4 md:gap-6 px-6 pt-10 pb-8">
            <span className="flex-1 h-px bg-dark-brown/20" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[0.08em] text-[#4a3728] uppercase whitespace-nowrap text-center">
              Why Choose Arileon?
            </h2>
            <span className="flex-1 h-px bg-dark-brown/20" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 border-t border-[#eadfd3]">
            {reasons.map(({ icon: Icon, title, text }, index) => (
              <div
                key={title}
                data-gsap-item
                className={`flex items-center gap-3 px-6 py-8 border-[#eadfd3] border-b last:border-b-0 lg:border-b-0 ${
                  index !== reasons.length - 1 ? "lg:border-r" : ""
                } ${index % 2 === 0 ? "sm:border-r lg:border-r" : ""}`}
              >
                <span className="text-[#4a3728] shrink-0">
                  <Icon size={30} />
                </span>
                <div>
                  <h3 className="font-display text-sm font-bold text-[#4a3728] leading-snug">
                    {title}
                  </h3>
                  <p className="mt-1 font-display text-xs leading-5 text-[#4a3728]">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
