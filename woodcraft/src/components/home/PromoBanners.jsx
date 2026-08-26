import { Link } from "react-router";

const banners = [
  {
    title: "Upto 20% Off\nOn First Order",
    text: "Use Code: WELCOME20",
    cta: "Shop Now",
    to: "/shop",
    image: "/images/products/living-room/living12.png",
    overlay: "from-[#3f5a45] via-[#3f5a45]/90 to-transparent",
    tone: "text-[#e8d5b5]",
    bg: "bg-[#3f5a45]",
  },
  {
    title: "Handcrafted\nWith Love",
    text: "Each piece is crafted by skilled artisans with attention to detail.",
    cta: "Explore Collection",
    to: "/shop",
    image: "/images/products/dining/dining11.png",
    overlay: "from-[#d8c4a4] via-[#d8c4a4]/90 to-transparent",
    tone: "text-[#4a2c18]",
    bg: "bg-[#d8c4a4]",
  },
  {
    title: "Solid Wood\nBuilt To Last",
    text: "Furniture that stays with you for generations.",
    cta: "Learn More",
    to: "/about",
    image: "/images/products/tables/tablee6.png",
    overlay: "from-[#b05a3a] via-[#b05a3a]/90 to-transparent",
    tone: "text-[#f4eadc]",
    bg: "bg-[#b05a3a]",
  },
];

function PromoBanners() {
  return (
    <section className="bg-background py-6 md:py-8">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-5 md:px-10">
        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {banners.map((banner) => (
            <div
              key={banner.cta}
              className={`relative min-h-[240px] sm:min-h-[270px] rounded-2xl overflow-hidden ${banner.bg}`}
            >
              <img
                src={banner.image}
                alt=""
                className="absolute right-0 top-0 h-full w-[58%] object-cover object-center"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-r ${banner.overlay}`}
              />

              <div className={`relative z-10 h-full min-h-[240px] sm:min-h-[270px] px-6 py-8 md:px-7 md:py-9 flex flex-col justify-end items-start text-left ${banner.tone}`}>
                <h3 className="font-display text-xl sm:text-2xl font-bold leading-snug uppercase tracking-wide whitespace-pre-line">
                  {banner.title}
                </h3>
                <p className="mt-2 text-sm leading-6 max-w-[220px]">
                  {banner.text}
                </p>
                <Link
                  to={banner.to}
                  className="mt-5 inline-flex px-5 py-2.5 rounded-md bg-[#4a3728] text-white text-[11px] uppercase tracking-[0.14em] font-bold hover:bg-[#3a2a1c] transition"
                >
                  {banner.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PromoBanners;
