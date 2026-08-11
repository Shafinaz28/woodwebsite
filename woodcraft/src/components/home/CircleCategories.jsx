import { useState } from "react";
import { Link } from "react-router";

function CircleCategories() {
  const categories = [
    {
      title: "Bedroom",
      image: "/images/categories/bedroom.jpg",
      link: "/shop",
    },
    {
      title: "Living Room",
      image: "/images/categories/living.jpg",
      link: "/shop",
    },
    {
      title: "Dining",
      image: "/images/categories/dining.jpg",
      link: "/shop",
    },
    {
      title: "Outdoor",
      image: "/images/categories/outdoor.jpg",
      link: "/shop",
    },
    {
      title: "Office",
      image: "/images/products/table-1.jpg",
      link: "/shop",
    },
    {
      title: "Storage",
      image: "/images/products/side-table.jpg",
      link: "/shop",
    },
  ];

  const [active, setActive] = useState(0);

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5 md:px-10">

        <div className="text-center mb-10 md:mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-wood-soft mb-3">
            Top Categories
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-medium text-wood-deep">
            Explore Furniture Categories
          </h2>
        </div>

        {/* Mobile: horizontal scroll carousel */}
        <div
          className="
            flex
            md:hidden
            gap-6
            overflow-x-auto
            pb-4
            snap-x
            snap-mandatory
            scrollbar-none
            -mx-4
            px-4
          "
          onScroll={(e) => {
            const el = e.currentTarget;
            const index = Math.round(el.scrollLeft / (el.scrollWidth / categories.length));
            setActive(Math.min(index, categories.length - 1));
          }}
        >
          {categories.map((category) => (
            <Link
              key={category.title}
              to={category.link}
              className="snap-center shrink-0 flex flex-col items-center gap-3 w-[42%]"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden ring-1 ring-black/10">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm text-wood text-center">{category.title}</span>
            </Link>
          ))}
        </div>

        {/* Mobile dots */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-4">
          {categories.map((_, index) => (
            <span
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                active === index
                  ? "w-6 bg-[#b58e58]"
                  : "w-1.5 bg-black/20"
              }`}
            />
          ))}
        </div>

        {/* Desktop wrap */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-10 lg:gap-14">
          {categories.map((category) => (
            <Link
              key={category.title}
              to={category.link}
              className="group flex flex-col items-center gap-4"
            >
              <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden ring-1 ring-black/10 group-hover:ring-[#b58e58] transition duration-300">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
              </div>
              <span className="text-sm tracking-wide text-wood">
                {category.title}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

export default CircleCategories;
