import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

function PromoBanners() {
  const banners = [
    {
      eyebrow: "Weekly Sale",
      title: "Limited Time Flash Sale",
      image: "/images/products/living-room/living5.png",
      link: "/shop",
    },
    {
      eyebrow: "New Arrivals",
      title: "Modern Furniture Collection",
      image: "/images/products/office/office1.png",
      link: "/shop",
    },
  ];

  return (
    <section className="bg-white pb-14 md:pb-20">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-5 md:px-10">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-7">
          {banners.map((banner) => (
            <Link
              key={banner.title}
              to={banner.link}
              className="group relative min-h-[240px] sm:min-h-[300px] md:min-h-[380px] overflow-hidden rounded-2xl sm:rounded-3xl"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-10 text-white">
                <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-white/85 mb-2">
                  {banner.eyebrow}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-white leading-tight">
                  {banner.title}
                </h3>
                <span className="inline-flex items-center gap-2 mt-5 text-xs uppercase tracking-[0.18em]">
                  Shop Now
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PromoBanners;
