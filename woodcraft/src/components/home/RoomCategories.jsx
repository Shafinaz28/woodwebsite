import { Link } from "react-router";

function RoomCategories() {
  const categories = [
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
      title: "Bedroom",
      image: "/images/categories/bedroom.jpg",
      link: "/shop",
    },
    {
      title: "Outdoor",
      image: "/images/categories/outdoor.jpg",
      link: "/shop",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#f7f5f0]">

      <div className="max-w-[1500px] mx-auto px-5 md:px-10">

        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">

          <p className="text-xs uppercase tracking-[0.25em] mb-4">
            Explore Our Collection
          </p>

          <h2 className="text-3xl md:text-5xl font-light">
            Designed For Every Space
          </h2>

        </div>


        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {categories.map((category) => (

            <Link
              key={category.title}
              to={category.link}
              className="group"
            >

              {/* Image */}
              <div className="relative overflow-hidden aspect-[3/4]">

                <img
                  src={category.image}
                  alt={category.title}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition
                    duration-700
                    group-hover:scale-105
                  "
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition"></div>

              </div>


              {/* Title */}
              <div className="pt-5 flex items-center justify-between">

                <h3 className="text-lg md:text-xl font-light">
                  {category.title}
                </h3>

                <span className="text-xs uppercase tracking-[0.15em] border-b border-black">
                  Explore
                </span>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}

export default RoomCategories;
