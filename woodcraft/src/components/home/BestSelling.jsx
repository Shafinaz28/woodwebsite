import { Link } from "react-router";

function BestSelling() {
  const items = [
    {
      title: "Living Essentials",
      image: "/images/products/living-room/living.png",
      large: true,
    },
    {
      title: "Dining Spaces",
      image: "/images/products/dining/dining.jpg",
    },
    {
      title: "Bedroom Calm",
      image: "/images/products/bedroom/bead1.png",
    },
    {
      title: "Outdoor Living",
      image: "/images/products/outdoor/outdoor.png",
    },
    {
      title: "Studio Desk",
      image: "/images/products/office/office.jpg",
    },
  ];

  const large = items.find((item) => item.large);
  const small = items.filter((item) => !item.large);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1500px] mx-auto px-5 md:px-10">

        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.25em] mb-4">
            Curated Spaces
          </p>
          <h2 className="text-3xl md:text-5xl font-light">
            Best Selling Looks
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          <Link
            to="/shop"
            className="group relative min-h-[480px] lg:min-h-full overflow-hidden"
          >
            <img
              src={large.image}
              alt={large.title}
              className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h3 className="text-2xl md:text-3xl font-light text-white">
                {large.title}
              </h3>
              <span className="inline-block mt-3 text-xs uppercase tracking-[0.18em] border-b border-white pb-1">
                Shop Now
              </span>
            </div>
          </Link>

          <div className="grid grid-cols-2 gap-5">
            {small.map((item) => (
              <Link
                key={item.title}
                to="/shop"
                className="group relative aspect-square overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="text-base md:text-lg font-light text-white">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default BestSelling;
